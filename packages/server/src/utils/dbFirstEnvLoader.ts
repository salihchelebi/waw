import { Client } from 'pg'
import logger from './logger'

const RUNTIME_ALLOWLIST = new Set([
    'HOST',
    'PORT',
    'DATABASE_PATH',
    'SECRETKEY_PATH',
    'APIKEY_PATH',
    'LOG_PATH',
    'FLOWISE_FILE_STORAGE_PATH',
    'DATABASE_URL',
    'DATABASE_TYPE',
    'DATABASE_HOST',
    'DATABASE_PORT',
    'DATABASE_USER',
    'DATABASE_PASSWORD',
    'DATABASE_NAME',
    'DATABASE_SSL',
    'DATABASE_REJECT_UNAUTHORIZED',
    'SECRETKEY_STORAGE_TYPE'
])

const OPS_BLOCKLIST = new Set(['RENDER_API_KEY', 'DEPLOY_HOOK', 'RENDER_SERVICE_ID', 'RENDER_DASHBOARD_URL', 'OWNER_ID'])
const CRITICAL_KEYS = new Set(['DATABASE_URL', 'DATABASE_TYPE'])

type ConfigRow = { key: string; value: string }

export type DbFirstLoaderSummary = {
    source: 'db-first' | 'env-only'
    loadedFromDb: string[]
    fallbackToEnv: string[]
    missingCritical: string[]
    discoveredTables: string[]
}

const mask = (value: string): string => {
    if (value.length <= 6) return '***'
    return `${value.slice(0, 2)}***${value.slice(-2)}`
}

const queryColumns = async (client: Client, tableName: string): Promise<string[]> => {
    const res = await client.query(
        `SELECT column_name
         FROM information_schema.columns
         WHERE table_schema = 'public' AND table_name = $1`,
        [tableName]
    )
    return res.rows.map((r) => r.column_name as string)
}

const pickCol = (cols: string[], candidates: string[]): string | null => {
    return candidates.find((c) => cols.includes(c)) ?? null
}

const discoverConfigTables = async (client: Client): Promise<string[]> => {
    const res = await client.query(
        `SELECT table_name
         FROM information_schema.tables
         WHERE table_schema = 'public'
           AND table_type = 'BASE TABLE'
           AND (
                table_name ILIKE '%config%'
             OR table_name ILIKE '%setting%'
             OR table_name ILIKE '%env%'
             OR table_name ILIKE '%variable%'
           )
         ORDER BY table_name`
    )
    return res.rows.map((r) => r.table_name as string)
}

const readGenericKeyValue = async (client: Client, tableName: string): Promise<ConfigRow[]> => {
    const columns = await queryColumns(client, tableName)
    const keyCol = pickCol(columns, ['key', 'name', 'env_key', 'variable_key'])
    const valueCol = pickCol(columns, ['value', 'env_value', 'config_value'])
    if (!keyCol || !valueCol) return []

    const where: string[] = []
    if (columns.includes('type')) where.push(`(type IS NULL OR type = 'runtime')`)
    if (columns.includes('is_active')) where.push(`is_active = true`)

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : ''
    const res = await client.query(`SELECT ${keyCol}::text AS key, ${valueCol}::text AS value FROM ${tableName} ${whereClause}`)

    return res.rows
        .map((r) => ({ key: String(r.key || '').trim(), value: String(r.value || '') }))
        .filter((r) => Boolean(r.key) && r.value !== '')
}

const readConfigSetChain = async (client: Client): Promise<{ rows: ConfigRow[]; activeSet?: string }> => {
    const required = ['app_bootstrap_state', 'app_config_sets', 'app_config_entries']
    const existing = await client.query(
        `SELECT table_name
         FROM information_schema.tables
         WHERE table_schema = 'public' AND table_name = ANY($1)`,
        [required]
    )

    const tableSet = new Set(existing.rows.map((r) => r.table_name as string))
    if (!required.every((t) => tableSet.has(t))) return { rows: [] }

    const bootstrapCols = await queryColumns(client, 'app_bootstrap_state')
    const setCols = await queryColumns(client, 'app_config_sets')
    const entryCols = await queryColumns(client, 'app_config_entries')

    const activeSetIdCol = pickCol(bootstrapCols, ['active_config_set_id', 'active_set_id', 'active_app_config_set_id'])
    const setIdCol = pickCol(setCols, ['id', 'set_id'])
    const setNameCol = pickCol(setCols, ['name', 'set_name'])
    const entrySetIdCol = pickCol(entryCols, ['set_id', 'config_set_id', 'app_config_set_id'])
    const entryKeyCol = pickCol(entryCols, ['key', 'name', 'env_key'])
    const entryValueCol = pickCol(entryCols, ['value', 'env_value', 'config_value'])

    if (!activeSetIdCol || !setIdCol || !setNameCol || !entrySetIdCol || !entryKeyCol || !entryValueCol) return { rows: [] }

    const activeRes = await client.query(
        `SELECT s.${setIdCol}::text AS id, s.${setNameCol}::text AS name
         FROM app_bootstrap_state b
         JOIN app_config_sets s ON s.${setIdCol}::text = b.${activeSetIdCol}::text
         LIMIT 1`
    )
    if (!activeRes.rows.length) return { rows: [] }

    const activeSetId = activeRes.rows[0].id as string
    const activeSetName = activeRes.rows[0].name as string

    const entryRes = await client.query(
        `SELECT ${entryKeyCol}::text AS key, ${entryValueCol}::text AS value
         FROM app_config_entries
         WHERE ${entrySetIdCol}::text = $1`,
        [activeSetId]
    )

    const rows = entryRes.rows
        .map((r) => ({ key: String(r.key || '').trim(), value: String(r.value || '') }))
        .filter((r) => Boolean(r.key) && r.value !== '')

    return { rows, activeSet: activeSetName }
}

const applyDefaults = (): void => {
    if (!process.env.DATABASE_SSL) process.env.DATABASE_SSL = 'false'
    if (!process.env.DATABASE_REJECT_UNAUTHORIZED) process.env.DATABASE_REJECT_UNAUTHORIZED = 'false'
}

export const loadConfigFromDbFirst = async (): Promise<DbFirstLoaderSummary> => {
    const discoveredTables: string[] = []
    const loadedFromDb: string[] = []
    const fallbackToEnv: string[] = []
    const missingCritical: string[] = []

    const bootstrapDbUrl = process.env.DATABASE_URL
    if (!bootstrapDbUrl) {
        for (const key of RUNTIME_ALLOWLIST) if (process.env[key]) fallbackToEnv.push(key)
        for (const key of CRITICAL_KEYS) if (!process.env[key]) missingCritical.push(key)
        applyDefaults()
        logger.warn(
            `[db-first-loader] bootstrap DATABASE_URL missing; source=env-only fallback=${fallbackToEnv.length} criticalMissing=${
                missingCritical.join(',') || 'none'
            }`
        )
        return { source: 'env-only', loadedFromDb, fallbackToEnv, missingCritical, discoveredTables }
    }

    const client = new Client({ connectionString: bootstrapDbUrl })
    try {
        await client.connect()

        const chain = await readConfigSetChain(client)
        let rows: ConfigRow[] = chain.rows
        if (rows.length) discoveredTables.push('app_bootstrap_state', 'app_config_sets', 'app_config_entries')

        if (!rows.length) {
            const tables = await discoverConfigTables(client)
            discoveredTables.push(...tables)
            for (const table of tables) {
                const tableRows = await readGenericKeyValue(client, table)
                if (tableRows.length) {
                    rows = tableRows
                    break
                }
            }
        }

        const dbMap = new Map<string, string>()
        for (const row of rows) {
            const key = row.key.toUpperCase()
            if (OPS_BLOCKLIST.has(key)) continue
            if (!RUNTIME_ALLOWLIST.has(key)) continue
            dbMap.set(key, row.value)
        }

        for (const key of RUNTIME_ALLOWLIST) {
            if (dbMap.has(key)) {
                process.env[key] = dbMap.get(key)
                loadedFromDb.push(key)
            } else if (process.env[key]) {
                fallbackToEnv.push(key)
            }

            if (CRITICAL_KEYS.has(key) && !dbMap.has(key) && !process.env[key]) {
                missingCritical.push(key)
            }
        }

        applyDefaults()

        logger.info(
            `[db-first-loader] source=db-first tables=${discoveredTables.length} db=${loadedFromDb.length} envFallback=${
                fallbackToEnv.length
            } activeSet=${chain.activeSet ?? 'n/a'}`
        )
        if (process.env.DATABASE_URL) logger.info(`[db-first-loader] DATABASE_URL=present(${mask(process.env.DATABASE_URL)})`)
        if (process.env.DATABASE_PASSWORD) {
            logger.info(`[db-first-loader] DATABASE_PASSWORD=present(${mask(process.env.DATABASE_PASSWORD)})`)
        }
        if (missingCritical.length) logger.warn(`[db-first-loader] critical missing keys: ${missingCritical.join(', ')}`)

        return { source: 'db-first', loadedFromDb, fallbackToEnv, missingCritical, discoveredTables }
    } catch (e) {
        logger.warn(`[db-first-loader] bootstrap/read failed: ${(e as Error).message}`)
        for (const key of RUNTIME_ALLOWLIST) if (process.env[key]) fallbackToEnv.push(key)
        for (const key of CRITICAL_KEYS) if (!process.env[key]) missingCritical.push(key)
        applyDefaults()
        return { source: 'env-only', loadedFromDb, fallbackToEnv, missingCritical, discoveredTables }
    } finally {
        await client.end().catch(() => undefined)
    }
}
