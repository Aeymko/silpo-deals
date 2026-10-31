import { useStorage } from '@vueuse/core'
import type { Deal } from '@/entities/product'
import { STORAGE_PREFIX } from '@/shared/config'

export type SortKey = 'discount' | 'saving' | 'priceAsc' | 'priceDesc' | 'rating'

type Comparator = (a: Deal, b: Deal) => number

const COMPARATORS: Record<SortKey, Comparator> = {
  discount: (a, b) => b.discount - a.discount || b.saving - a.saving,
  saving: (a, b) => b.saving - a.saving || b.discount - a.discount,
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || b.ratingCount - a.ratingCount,
}

export const SORT_OPTIONS: readonly { value: SortKey; label: string }[] = [
  { value: 'discount', label: 'Найбільша знижка, %' },
  { value: 'saving', label: 'Найбільша економія, грн' },
  { value: 'priceAsc', label: 'Ціна: від дешевих' },
  { value: 'priceDesc', label: 'Ціна: від дорогих' },
  { value: 'rating', label: 'Рейтинг' },
]

export const sortKey = useStorage<SortKey>(`${STORAGE_PREFIX}sort`, 'discount')

/** Unknown keys (e.g. stale localStorage) fall back to the biggest-discount order. */
export const compareDeals = (key: string): Comparator => COMPARATORS[key as SortKey] ?? COMPARATORS.discount
