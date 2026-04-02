import { Pool, PoolConfig } from 'pg'

export type RuntimeConfigValue = {
    key: string
    value: string
    source: 'db' | 'env'
    isSecret?: boolean
}

export type RuntimeConfigMap = Record<string, RuntimeConfigValue>

export type BootstrapOptions = {
    bootstrapDatabaseUrl?: string
    configSetName?: string
    env?: NodeJS.ProcessEnv
    poolConfig?: PoolConfig
}

const DEFAULT_CONFIG_SET = 'render-production'
let cachedConfig: RuntimeConfigMap | null = null
let cachedAt = 0
const CACHE_TTL_MS = 30_000

function resolveBootstrapDatabaseUrl(env: NodeJS.ProcessEnv, explicit?: string): string {
    return (
        explicit ||
        env.CONFIG_BOOTSTRAP_DATABASE_URL ||
        env.DATABASE_URL ||
        ''
    )
}

function normalizeEnvValue(value: string | undefined): string | undefined {
    if (value === undefined || value === null) return undefined
    const trimmed = String(value).trim()
    return trimmed.length ? trimmed : undefined
}

async function loadConfigFromDb(options: BootstrapOptions = {}): Promise<RuntimeConfigMap> {
    const env = options.env ?? process.env
    const databaseUrl = resolveBootstrapDatabaseUrl(env, options.bootstrapDatabaseUrl)
    if (!databaseUrl) {
        return {}
    }

    const pool = new Pool({
        connectionString: databaseUrl,
        max: 3,
        idleTimeoutMillis: 10_000,
        ...(options.poolConfig ?? {})
    })

    try {
        const configSetName = options.configSetName || env.APP_CONFIG_SET || DEFAULT_CONFIG_SET
        const result = await pool.query(
            `SELECT e.key,
                    COALESCE(e.value_text, e.value_encrypted) AS value,
                    e.is_secret
             FROM app_config_entries e
             JOIN app_config_sets s ON s.id = e.config_set_id
             WHERE s.name = $1
               AND s.is_active = TRUE
               AND e.is_active = TRUE`,
            [configSetName]
        )

        const map: RuntimeConfigMap = {}
        for (const row of result.rows) {
            if (!row?.key) continue
            map[row.key] = {
                key: row.key,
                value: String(row.value ?? ''),
                source: 'db',
                isSecret: Boolean(row.is_secret)
            }
        }
        return map
    } finally {
        await pool.end()
    }
}

export async function getRuntimeConfig(options: BootstrapOptions = {}): Promise<RuntimeConfigMap> {
    if (cachedConfig && Date.now() - cachedAt < CACHE_TTL_MS) {
        return cachedConfig
    }

    const env = options.env ?? process.env
    const dbMap = await loadConfigFromDb(options)
    const keys = new Set<string>([
        ...Object.keys(dbMap),
        ...Object.keys(env)
    ])

    const resolved: RuntimeConfigMap = {}
    for (const key of keys) {
        const dbValue = dbMap[key]?.value
        const envValue = normalizeEnvValue(env[key])
        if (dbValue !== undefined && dbValue !== '') {
            resolved[key] = dbMap[key]
            continue
        }
        if (envValue !== undefined) {
            resolved[key] = {
                key,
                value: envValue,
                source: 'env'
            }
        }
    }

    cachedConfig = resolved
    cachedAt = Date.now()
    return resolved
}

export async function getConfigValue(key: string, fallback?: string, options: BootstrapOptions = {}): Promise<string> {
    const config = await getRuntimeConfig(options)
    const value = config[key]?.value
    if (value !== undefined && value !== '') {
        return value
    }
    if (fallback !== undefined) {
        return fallback
    }
    throw new Error(`Config key bulunamadi: ${key}`)
}

export async function hydrateProcessEnv(options: BootstrapOptions = {}): Promise<void> {
    const config = await getRuntimeConfig(options)
    for (const [key, entry] of Object.entries(config)) {
        if (!process.env[key] || String(process.env[key]).trim() === '') {
            process.env[key] = entry.value
        }
    }
}

export async function buildDbFirstRuntimeSnapshot(options: BootstrapOptions = {}): Promise<Record<string, string>> {
    const config = await getRuntimeConfig(options)
    return Object.fromEntries(
        Object.entries(config).map(([key, entry]) => [key, entry.value])
    )
}

export async function createTypeOrmBootstrapOptions(options: BootstrapOptions = {}) {
    const databaseUrl = await getConfigValue('DATABASE_URL', undefined, options)
    const databaseType = await getConfigValue('DATABASE_TYPE', 'postgres', options)
    const rejectUnauthorized = await getConfigValue('DATABASE_REJECT_UNAUTHORIZED', 'false', options)

    return {
        type: databaseType as 'postgres',
        url: databaseUrl,
        ssl: rejectUnauthorized === 'true' ? { rejectUnauthorized: true } : false
    }
}

/*
Usage example:

import { hydrateProcessEnv, createTypeOrmBootstrapOptions } from './db_first_env_loader'

await hydrateProcessEnv()
const orm = await createTypeOrmBootstrapOptions()

Bootstrap exception:
- Uygulama config tablolarina ulasmak icin ilk baglantida env.CONFIG_BOOTSTRAP_DATABASE_URL
  veya env.DATABASE_URL gibi minimal bir bootstrap yoluna yine ihtiyac duyar.
- Sonraki tum key cozumleme DB first, env fallback mantigi ile calisir.
*/
