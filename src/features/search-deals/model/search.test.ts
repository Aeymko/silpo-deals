import { describe, expect, it } from 'vitest'
import { matchesSearch, searchTerms } from './search'

describe('matchesSearch', () => {
  const item = { title: 'Шоколад молочний з печивом Oreo', brand: 'Milka' }

  it('matches when every term is in the title or brand, in any order', () => {
    expect(matchesSearch(item, searchTerms('OREO milka'))).toBe(true)
    expect(matchesSearch(item, searchTerms('печивом шоколад'))).toBe(true)
  })

  it('rejects when any term is missing', () => {
    expect(matchesSearch(item, searchTerms('шоколад чорний'))).toBe(false)
  })

  it('matches everything for an empty query', () => {
    expect(searchTerms('   ')).toEqual([])
    expect(matchesSearch(item, [])).toBe(true)
  })
})
