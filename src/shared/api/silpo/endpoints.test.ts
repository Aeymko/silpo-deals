import { describe, expect, it } from 'vitest'
import { DEFAULT_BRANCH_ID, ONLINE_BRANCH_ID } from '@/shared/config'
import { deliveryTypeFor, productsUrl } from './endpoints'

describe('productsUrl', () => {
  it('queries a store with pickup stock, promotions and the in-stock flag', () => {
    const url = new URL(
      productsUrl(
        { branchId: DEFAULT_BRANCH_ID, promotions: ['cinotyzhyky', 'additional'], inStock: true },
        200,
      ),
    )

    expect(url.pathname).toBe(`/v1/uk/branches/${DEFAULT_BRANCH_ID}/products`)
    expect(url.searchParams.get('deliveryType')).toBe('SelfPickup')
    expect(url.searchParams.get('filters[promotion]')).toBe('cinotyzhyky,additional')
    expect(url.searchParams.get('inStock')).toBe('true')
    expect(url.searchParams.get('offset')).toBe('200')
    expect(url.searchParams.get('limit')).toBe('100')
  })

  it('omits optional filters when they are not requested', () => {
    const url = new URL(productsUrl({ branchId: ONLINE_BRANCH_ID, promotions: [], inStock: false }, 0))

    expect(url.searchParams.get('deliveryType')).toBe('DeliveryHome')
    expect(url.searchParams.has('filters[promotion]')).toBe(false)
    expect(url.searchParams.has('inStock')).toBe(false)
  })
})

describe('deliveryTypeFor', () => {
  it('uses home delivery only for the online warehouse', () => {
    expect(deliveryTypeFor(ONLINE_BRANCH_ID)).toBe('DeliveryHome')
    expect(deliveryTypeFor(DEFAULT_BRANCH_ID)).toBe('SelfPickup')
  })
})
