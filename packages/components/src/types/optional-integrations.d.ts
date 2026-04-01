// [TALİMAT NO: 4 | TALİMAT ADI: PACKAGES/COMPONENTS BUILD KIRIKLARINI HATA TOLERANSLI VE DAR KAPSAMLI ŞEKİLDE GEÇİR, HEDEF ARAYÜZÜ AYAĞA KALDIRMAK OLSUN] Bu açıklama, değişikliğin components build kırığını dar kapsamlı ve geri alınabilir biçimde geçmek için uygulandığını gösterir.

declare module 'mem0ai' {
    export interface MemoryOptions {
        user_id?: string
        run_id?: string
        agent_id?: string
        app_id?: string
        project_id?: string
        org_id?: string
        api_version?: string
        enable_graph?: boolean
        metadata?: Record<string, unknown>
        filters?: Record<string, unknown>
    }

    export interface SearchOptions {
        user_id?: string
        run_id?: string
        agent_id?: string
        app_id?: string
        project_id?: string
        org_id?: string
        metadata?: Record<string, unknown>
        filters?: Record<string, unknown>
    }
}

declare module 'uuid'
declare module 'fs'
declare module 'path'
declare module 'crypto'
declare module 'node:stream'
declare module 'node:stream/web'
declare module 'node-fetch'

declare const module: any
declare const require: any
declare const process: any
declare const Buffer: any
declare const __dirname: string
declare const performance: { now: () => number }
declare function setTimeout(handler: (...args: any[]) => void, timeout?: number, ...args: any[]): any
declare const console: any
declare class URL {
    constructor(input: string, base?: string)
    pathname: string
    search: string
    href: string
}
declare class AbortController {
    readonly signal: unknown
    abort(reason?: unknown): void
}
