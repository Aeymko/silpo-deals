import { computed, ref, shallowRef } from 'vue'
import type { ProductsQuery } from '@/shared/api/silpo'
import { readCache, writeCache } from '@/shared/lib/cache'
import { fetchAllProducts } from '../api/fetch-products'
import { type Deal, type Product, toDeal } from '../lib/deal'

const CACHE_KEY = 'catalog'
const TTL_MS = 30 * 60 * 1000

interface CatalogCache {
  query: string
  items: Product[]
}

export const deals = shallowRef<Deal[]>([])
export const loadedAt = ref<number | null>(null)
/** Download progress 0…1, or `null` when idle. */
export const progress = ref<number | null>(null)
export const loadError = ref<string | null>(null)
export const loading = computed(() => progress.value !== null)

let controller: AbortController | null = null

function apply(items: Product[], ts: number) {
  deals.value = items.map(toDeal)
  loadedAt.value = ts
}

export async function loadCatalog(query: ProductsQuery, { force = false } = {}) {
  controller?.abort()
  const ctrl = new AbortController()
  controller = ctrl
  const key = JSON.stringify(query)

  const cached = force ? null : readCache<CatalogCache>(CACHE_KEY, TTL_MS)
  if (cached?.value.query === key) {
    progress.value = null
    loadError.value = null
    apply(cached.value.items, cached.ts)
    return
  }

  progress.value = 0
  loadError.value = null
  try {
    const items = await fetchAllProducts(query, ctrl.signal, (ratio) => {
      if (controller === ctrl) progress.value = ratio
    })
    const ts = Date.now()
    writeCache(CACHE_KEY, { query: key, items } satisfies CatalogCache, ts)
    apply(items, ts)
  } catch (error) {
    if (controller !== ctrl) return
    ctrl.abort()
    loadError.value = error instanceof Error ? error.message : String(error)
  } finally {
    if (controller === ctrl) progress.value = null
  }
}
