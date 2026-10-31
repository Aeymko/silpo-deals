import { STORAGE_PREFIX } from '@/shared/config'

export interface Cached<T> {
  ts: number
  value: T
}

export function readCache<T>(key: string, ttlMs: number): Cached<T> | null {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_PREFIX + key)
    if (!raw) return null
    const entry = JSON.parse(raw) as Cached<T>
    return Date.now() - entry.ts < ttlMs ? entry : null
  } catch {
    return null
  }
}

export function writeCache<T>(key: string, value: T, ts = Date.now()) {
  try {
    globalThis.localStorage?.setItem(STORAGE_PREFIX + key, JSON.stringify({ ts, value } satisfies Cached<T>))
  } catch {
    // Quota exceeded: the cache is an optimisation, the app works without it.
  }
}
