import { shallowRef } from 'vue'
import { getCategories } from '@/shared/api/silpo'
import { readCache, writeCache } from '@/shared/lib/cache'
import { buildCategoryIndex, type CategoryIndex, OTHER_CATEGORY } from '../lib/category-index'

const CACHE_KEY = 'categories'
const TTL_MS = 24 * 60 * 60 * 1000

export const categoryIndex = shallowRef<CategoryIndex>({ sectionRoot: {}, roots: [] })

export const categoryOf = (sectionSlug: string) =>
  categoryIndex.value.sectionRoot[sectionSlug] ?? OTHER_CATEGORY

export async function loadCategories() {
  const cached = readCache<CategoryIndex>(CACHE_KEY, TTL_MS)
  if (cached) {
    categoryIndex.value = cached.value
    return
  }
  const page = await getCategories()
  categoryIndex.value = buildCategoryIndex(page.items)
  writeCache(CACHE_KEY, categoryIndex.value)
}
