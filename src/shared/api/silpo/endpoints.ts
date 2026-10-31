import { ONLINE_BRANCH_ID } from '@/shared/config'
import { fetchJson } from './http'
import type { BranchDto, CategoryDto, FilterDto, Page, ProductDto } from './types'

const API_ROOT = 'https://sf-ecom-api.silpo.ua/v1/uk'
const IMAGE_ROOT = 'https://images.silpo.ua/products/300x300/webp/'
const SITE_PRODUCT_ROOT = 'https://silpo.ua/product/'

/** The API silently caps `limit` at 100. */
export const PAGE_SIZE = 100

export interface ProductsQuery {
  branchId: string
  promotions: string[]
  inStock: boolean
}

const branchUrl = (branchId: string) => `${API_ROOT}/branches/${encodeURIComponent(branchId)}`

/** Stores report shelf stock under SelfPickup; the online warehouse only under DeliveryHome. */
export const deliveryTypeFor = (branchId: string) =>
  branchId === ONLINE_BRANCH_ID ? 'DeliveryHome' : 'SelfPickup'

export function productsUrl({ branchId, promotions, inStock }: ProductsQuery, offset: number) {
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    offset: String(offset),
    deliveryType: deliveryTypeFor(branchId),
    includeChildCategories: 'true',
    sortBy: 'popularity',
    sortDirection: 'desc',
    mustHavePromotion: 'true',
  })
  if (promotions.length) params.set('filters[promotion]', promotions.join(','))
  if (inStock) params.set('inStock', 'true')
  return `${branchUrl(branchId)}/products?${params}`
}

export const getProductsPage = (query: ProductsQuery, offset: number, signal?: AbortSignal) =>
  fetchJson<Page<ProductDto>>(productsUrl(query, offset), signal)

export const getBranches = () => fetchJson<Page<BranchDto>>(`${API_ROOT}/branches`)

export const getCategories = () =>
  fetchJson<Page<CategoryDto>>(`${branchUrl(ONLINE_BRANCH_ID)}/categories?deliveryType=DeliveryHome`)

export const getPromotionFilters = (branchId: string) =>
  fetchJson<Page<FilterDto>>(
    `${branchUrl(branchId)}/filters?deliveryType=${deliveryTypeFor(branchId)}&mustHavePromotion=true`,
  )

export const productImageUrl = (icon: string) => IMAGE_ROOT + encodeURIComponent(icon)
export const productPageUrl = (slug: string) => SITE_PRODUCT_ROOT + encodeURIComponent(slug)
