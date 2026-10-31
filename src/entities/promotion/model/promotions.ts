import { ref } from 'vue'
import { type FilterDto, getPromotionFilters } from '@/shared/api/silpo'

export interface PromotionFacet {
  code: string
  title: string
  /** Promo products in the branch, or `null` when unknown. */
  total: number | null
}

export const promotionFacets = ref<PromotionFacet[]>([])
/** Accumulates titles across branches; product cards also carry promotions missing from the facet list. */
export const promotionTitles = ref<Record<string, string>>({ 'national-cashback': 'Нацкешбек' })

export function toPromotionFacets(filters: readonly FilterDto[]): PromotionFacet[] {
  const facet = filters.find((f) => f.code === 'promotion')
  return (facet?.values ?? []).map((v) => ({
    code: v.code,
    title: v.info?.title ?? v.code,
    total: v.products?.total ?? 0,
  }))
}

let latestRequest = 0

export async function loadPromotionFacets(branchId: string) {
  const request = ++latestRequest
  const page = await getPromotionFilters(branchId)
  if (request !== latestRequest) return
  promotionFacets.value = toPromotionFacets(page.items)
  for (const f of promotionFacets.value) promotionTitles.value[f.code] = f.title
}
