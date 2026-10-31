import { refDebounced } from '@vueuse/core'
import { computed } from 'vue'
import { categoryOf } from '@/entities/category'
import { type Deal, deals } from '@/entities/product'
import { selectedCategory } from '@/features/filter-category'
import { minDiscount } from '@/features/filter-discount'
import { matchesSearch, searchQuery, searchTerms } from '@/features/search-deals'
import { compareDeals, sortKey } from '@/features/sort-deals'

export interface VisibleDealsOptions {
  search: string
  minDiscount: number
  category: string
  categoryOf: (sectionSlug: string) => string
  sortKey: string
}

export function selectVisibleDeals(list: readonly Deal[], options: VisibleDealsOptions): Deal[] {
  const terms = searchTerms(options.search)
  return list
    .filter(
      (deal) =>
        deal.discount >= options.minDiscount &&
        (!options.category || options.categoryOf(deal.section) === options.category) &&
        matchesSearch(deal, terms),
    )
    .sort(compareDeals(options.sortKey))
}

export function useVisibleDeals() {
  const search = refDebounced(searchQuery, 150)
  return computed(() =>
    selectVisibleDeals(deals.value, {
      search: search.value ?? '',
      minDiscount: minDiscount.value,
      category: selectedCategory.value,
      categoryOf,
      sortKey: sortKey.value,
    }),
  )
}
