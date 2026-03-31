import { DataSource } from 'typeorm'
import logger from './logger'

type RenderoEntry = { k: string; v: string; isSecret?: boolean }

/**
 * Bootstraps a small key/value table named `rendero` inside the SAME database Flowise is using.
 * - Idempotent: CREATE TABLE IF NOT EXISTS + UPSERT
 * - No hardcoded secrets: secret values are taken from env at runtime.
 * - Keys are NOT prefixed with RENDERO__ (Flowise/global-env friendly).
 */
export async function bootstrapRendero(appDataSource: DataSource): Promise<void> {
    try {
        if (!appDataSource?.isInitialized) {
            // caller should initialize, but be defensive
            await appDataSource.initialize()
        }

        const dbType = String((appDataSource.options as any)?.type ?? '')
        const isPostgres = dbType === 'postgres'
        const nowExpr = isPostgres ? 'now()' : "datetime('now')"
        const updatedAtType = isPostgres ? 'timestamptz' : 'text'

        const createTableSql = `
create table if not exists rendero (
  k text primary key,
  v text,
  is_secret boolean not null default false,
  updated_at ${updatedAtType} not null default ${nowExpr}
);
create index if not exists rendero_is_secret_idx on rendero (is_secret);
`.trim()

        const deployHook = process.env.DEPLOY_HOOK_URL || process.env.DEPLOY_HOOK || ''

        // Known safe defaults (non-secret) from the saved Render state in the Rendero skill.
        const defaults = {
            // Render service
            APP_URL: 'https://wixo.onrender.com',
            HEALTHCHECK_URL: 'https://wixo.onrender.com/api/v1/ping',
            RENDER_SERVICE_ID: 'srv-d75ce8ea2pns73dm2h60',
            SERVICE_DASHBOARD: 'https://dashboard.render.com/web/srv-d75ce8ea2pns73dm2h60',
            SERVICE_LOGS: 'https://dashboard.render.com/web/srv-d75ce8ea2pns73dm2h60/logs',
            SERVICE_DEPLOYS: 'https://dashboard.render.com/web/srv-d75ce8ea2pns73dm2h60/deploys',
            REPOSITORY_URL: 'https://github.com/salihchelebi/waw',
            // Render database
            DATABASE_SERVICE_ID: 'dpg-d763u6ruibrs73em9og0-a',
            DATABASE_DASHBOARD: 'https://dashboard.render.com/d/dpg-d763u6ruibrs73em9og0-a'
        }

        const envSnapshot: Record<string, string> = {
            HOST: process.env.HOST || '',
            PORT: process.env.PORT || '',
            DATABASE_PATH: process.env.DATABASE_PATH || '',
            SECRETKEY_PATH: process.env.SECRETKEY_PATH || '',
            APIKEY_PATH: process.env.APIKEY_PATH || '',
            LOG_PATH: process.env.LOG_PATH || '',
            BLOB_STORAGE_PATH: process.env.BLOB_STORAGE_PATH || '',
            RENDER_API_KEY: process.env.RENDER_API_KEY || '',
            GITHUB_OWNER: process.env.GITHUB_OWNER || '',
            GITHUB_REPO: process.env.GITHUB_REPO || '',
            GITHUB_BRANCH: process.env.GITHUB_BRANCH || '',
            DEPLOY_HOOK: deployHook,
            RENDER_SERVICE_ID: process.env.RENDER_SERVICE_ID || defaults.RENDER_SERVICE_ID,
            DATABASE_URL: process.env.DATABASE_URL || ''
        }

        const fullState = {
            env: { ...envSnapshot, RENDER_API_KEY: envSnapshot.RENDER_API_KEY ? '***set***' : '' },
            render: {
                service: {
                    id: envSnapshot.RENDER_SERVICE_ID,
                    appUrl: defaults.APP_URL,
                    healthcheckUrl: defaults.HEALTHCHECK_URL,
                    dashboard: {
                        service: defaults.SERVICE_DASHBOARD,
                        logs: defaults.SERVICE_LOGS,
                        deploys: defaults.SERVICE_DEPLOYS
                    },
                    repo: {
                        url: defaults.REPOSITORY_URL,
                        owner: envSnapshot.GITHUB_OWNER || 'salihchelebi',
                        repo: envSnapshot.GITHUB_REPO || 'waw',
                        branch: envSnapshot.GITHUB_BRANCH || 'main'
                    },
                    deployHookSet: Boolean(deployHook)
                },
                database: {
                    id: defaults.DATABASE_SERVICE_ID,
                    dashboard: defaults.DATABASE_DASHBOARD,
                    databaseUrlSet: Boolean(envSnapshot.DATABASE_URL)
                }
            }
        }

        // NOTE: we intentionally store secrets in DB if present, but we never hardcode them in repo.
        const entries: RenderoEntry[] = [
            // Env/global keys (Flowise-friendly, no prefix)
            { k: 'HOST', v: envSnapshot.HOST },
            { k: 'PORT', v: envSnapshot.PORT },
            { k: 'DATABASE_PATH', v: envSnapshot.DATABASE_PATH },
            { k: 'SECRETKEY_PATH', v: envSnapshot.SECRETKEY_PATH },
            { k: 'APIKEY_PATH', v: envSnapshot.APIKEY_PATH },
            { k: 'LOG_PATH', v: envSnapshot.LOG_PATH },
            { k: 'BLOB_STORAGE_PATH', v: envSnapshot.BLOB_STORAGE_PATH },

            { k: 'GITHUB_OWNER', v: envSnapshot.GITHUB_OWNER || 'salihchelebi' },
            { k: 'GITHUB_REPO', v: envSnapshot.GITHUB_REPO || 'waw' },
            { k: 'GITHUB_BRANCH', v: envSnapshot.GITHUB_BRANCH || 'main' },

            { k: 'RENDER_SERVICE_ID', v: envSnapshot.RENDER_SERVICE_ID },
            { k: 'APP_URL', v: defaults.APP_URL },
            { k: 'HEALTHCHECK_URL', v: defaults.HEALTHCHECK_URL },
            { k: 'SERVICE_DASHBOARD', v: defaults.SERVICE_DASHBOARD },
            { k: 'SERVICE_LOGS', v: defaults.SERVICE_LOGS },
            { k: 'SERVICE_DEPLOYS', v: defaults.SERVICE_DEPLOYS },
            { k: 'REPOSITORY_URL', v: defaults.REPOSITORY_URL },

            { k: 'DATABASE_SERVICE_ID', v: defaults.DATABASE_SERVICE_ID },
            { k: 'DATABASE_DASHBOARD', v: defaults.DATABASE_DASHBOARD },

            // Secrets (from env only)
            { k: 'RENDER_API_KEY', v: envSnapshot.RENDER_API_KEY, isSecret: true },
            { k: 'DEPLOY_HOOK', v: envSnapshot.DEPLOY_HOOK, isSecret: true },
            { k: 'DATABASE_URL', v: envSnapshot.DATABASE_URL, isSecret: true },

            // Docs-ish / state payloads (no secrets inside)
            { k: 'rendero.full_state_json', v: JSON.stringify(fullState, null, 2) }
        ]

        // keys-only helper for Codex (values not needed)
        const keysOnly = entries.map((e) => e.k).sort().join('\n') + '\n'
        entries.push({ k: 'rendero.keys_only', v: keysOnly })

        const missingSecrets: string[] = []
        if (!envSnapshot.RENDER_API_KEY) missingSecrets.push('RENDER_API_KEY')
        if (!envSnapshot.DEPLOY_HOOK) missingSecrets.push('DEPLOY_HOOK / DEPLOY_HOOK_URL')
        if (!envSnapshot.DATABASE_URL) missingSecrets.push('DATABASE_URL')
        entries.push({ k: 'rendero.missing_secrets', v: missingSecrets.join('\n') + '\n' })

        const queryRunner = appDataSource.createQueryRunner()
        await queryRunner.connect()

        try {
            await queryRunner.startTransaction()
            await queryRunner.query(createTableSql)

            // placeholder style differs by driver
            const ph = (i: number) => (isPostgres ? `$${i}` : '?')
            const upsertSql = `
insert into rendero (k, v, is_secret, updated_at)
values (${ph(1)}, ${ph(2)}, ${ph(3)}, ${nowExpr})
on conflict (k) do update
set v = excluded.v,
    is_secret = excluded.is_secret,
    updated_at = ${nowExpr};
`.trim()

            for (const e of entries) {
                await queryRunner.query(upsertSql, [e.k, e.v ?? '', Boolean(e.isSecret)])
            }

            await queryRunner.commitTransaction()
            logger.info(`🧰 [rendero]: bootstrapped ${entries.length} keys`)
        } catch (err) {
            await queryRunner.rollbackTransaction()
            logger.error('❌ [rendero]: bootstrap failed (rolled back)', err)
        } finally {
            await queryRunner.release()
        }
    } catch (err) {
        logger.error('❌ [rendero]: bootstrap failed (outer)', err)
    }
}
