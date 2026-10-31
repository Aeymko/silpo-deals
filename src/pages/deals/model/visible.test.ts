import { describe, expect, it } from 'vitest'
import { type Deal, toDeal } from '@/entities/product'
import { selectVisibleDeals, type VisibleDealsOptions } from './visible'

const deal = (id: string, title: string, section: string, price: number, oldPrice: number): Deal =>
  toDeal({
    id,
    title,
    brand: '',
    icon: '',
    slug: id,
    section,
    price,
    oldPrice,
    unit: '',
    promotions: [],
    rating: null,
    ratingCount: 0,
  })

const deals = [
  deal('choc', 'Шоколад Milka', 'chocolate', 40, 100), // 60%
  deal('cake', 'Тістечко медове', 'cakes', 70, 100), // 30%
  deal('beer', 'Пиво Corona', 'beer', 90, 100), // 10%
]

const sections: Record<string, string> = { chocolate: 'Солодощі', cakes: 'Солодощі', beer: 'Алкоголь' }
const options = (overrides: Partial<VisibleDealsOptions> = {}): VisibleDealsOptions => ({
  search: '',
  minDiscount: 0,
  category: '',
  categoryOf: (section) => sections[section] ?? 'Інше',
  sortKey: 'discount',
  ...overrides,
})

const ids = (list: Deal[]) => list.map((d) => d.id)

describe('selectVisibleDeals', () => {
  it('shows the deepest discounts first by default', () => {
    expect(ids(selectVisibleDeals([...deals].reverse(), options()))).toEqual(['choc', 'cake', 'beer'])
  })

  it('combines category, minimum discount and search filters', () => {
    expect(ids(selectVisibleDeals(deals, options({ category: 'Солодощі' })))).toEqual(['choc', 'cake'])
    expect(ids(selectVisibleDeals(deals, options({ minDiscount: 30 })))).toEqual(['choc', 'cake'])
    expect(ids(selectVisibleDeals(deals, options({ category: 'Солодощі', search: 'медове' })))).toEqual([
      'cake',
    ])
  })

  it('does not mutate the source list', () => {
    const source = [...deals].reverse()
    selectVisibleDeals(source, options())
    expect(ids(source)).toEqual(['beer', 'cake', 'choc'])
  })
})
