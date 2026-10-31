import { useStorage } from '@vueuse/core'
import { STORAGE_PREFIX } from '@/shared/config'
import { normalizeText } from '@/shared/lib/format'

export const searchQuery = useStorage(`${STORAGE_PREFIX}search`, '')

export const searchTerms = (query: string) => normalizeText(query).split(/\s+/).filter(Boolean)

/** Every term must appear in the title or brand. */
export function matchesSearch(item: { title: string; brand: string }, terms: readonly string[]) {
  if (!terms.length) return true
  const haystack = normalizeText(`${item.title} ${item.brand}`)
  return terms.every((term) => haystack.includes(term))
}
