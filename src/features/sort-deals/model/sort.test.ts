import { describe, expect, it } from 'vitest'
import { type Deal, toDeal } from '@/entities/product'
import { compareDeals } from './sort'

const deal = (id: string, price: number, oldPrice: number, rating: number | null = null): Deal =>
  toDeal({
    id,
    title: id,
    brand: '',
    icon: '',
    slug: id,
    section: '',
    price,
    oldPrice,
    unit: '',
    promotions: [],
    rating,
    ratingCount: 0,
  })

const order = (deals: Deal[], key: string) => [...deals].sort(compareDeals(key)).map((d) => d.id)

describe('compareDeals', () => {
  // 60% off 10 грн, 40% off 1000 грн, 50% off 200 грн.
  const deals = [deal('cheap', 4, 10, 4.1), deal('pricey', 600, 1000, 4.9), deal('mid', 100, 200)]

  it('puts the biggest percentage first by default', () => {
    expect(order(deals, 'discount')).toEqual(['cheap', 'mid', 'pricey'])
  })

  it('breaks percentage ties by the bigger saving', () => {
    const tie = [deal('small', 5, 10), deal('large', 500, 1000)]
    expect(order(tie, 'discount')).toEqual(['large', 'small'])
  })

  it('sorts by saving, price and rating', () => {
    expect(order(deals, 'saving')).toEqual(['pricey', 'mid', 'cheap'])
    expect(order(deals, 'priceAsc')).toEqual(['cheap', 'mid', 'pricey'])
    expect(order(deals, 'priceDesc')).toEqual(['pricey', 'mid', 'cheap'])
    expect(order(deals, 'rating')).toEqual(['pricey', 'cheap', 'mid'])
  })

  it('falls back to the discount order for an unknown key', () => {
    expect(order(deals, 'bogus')).toEqual(order(deals, 'discount'))
  })
})
