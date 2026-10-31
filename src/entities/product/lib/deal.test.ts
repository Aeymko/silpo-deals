import { describe, expect, it } from 'vitest'
import type { ProductDto } from '@/shared/api/silpo'
import { discountTone, toDeal, toProduct } from './deal'

const dto = (overrides: Partial<ProductDto> = {}): ProductDto => ({
  id: 'p1',
  title: 'Рулет Темна вишня',
  icon: 'icon.png',
  slug: 'rulet-1',
  sectionSlug: 'rulety-1',
  price: 79.99,
  oldPrice: 159,
  ...overrides,
})

describe('toDeal', () => {
  it('computes the discount percentage and saving against the old price', () => {
    const deal = toDeal(toProduct(dto()))

    expect(deal.saving).toBe(79.01)
    expect(deal.discount).toBeCloseTo(49.69, 2)
  })

  it('treats a missing or lower old price as no discount', () => {
    expect(toDeal(toProduct(dto({ oldPrice: null }))).discount).toBe(0)
    expect(toDeal(toProduct(dto({ oldPrice: 50 }))).saving).toBe(0)
  })

  it('prefers display prices, which are what the shelf label shows', () => {
    const product = toProduct(dto({ price: 10, oldPrice: 20, displayPrice: 99.9, displayOldPrice: 199.9 }))

    expect(product.price).toBe(99.9)
    expect(product.oldPrice).toBe(199.9)
  })
})

describe('discountTone', () => {
  it.each([
    [60, 'bg-discount-hot'],
    [45, 'bg-discount-hot'],
    [30, 'bg-discount-warm'],
    [10, 'bg-discount-mild'],
  ])('%i%% → %s', (discount, tone) => {
    expect(discountTone(discount)).toBe(tone)
  })
})
