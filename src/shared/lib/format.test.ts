import { describe, expect, it } from 'vitest'
import { normalizeText, pluralUk } from './format'

describe('pluralUk', () => {
  const forms = ['товар', 'товари', 'товарів'] as const

  it.each([
    [1, 'товар'],
    [21, 'товар'],
    [2, 'товари'],
    [34, 'товари'],
    [5, 'товарів'],
    [11, 'товарів'],
    [12, 'товарів'],
    [111, 'товарів'],
    [0, 'товарів'],
  ])('%i → %s', (n, expected) => {
    expect(pluralUk(n, forms)).toBe(expected)
  })
})

describe('normalizeText', () => {
  it('lower-cases and unifies apostrophes', () => {
    expect(normalizeText('М’ЯСО')).toBe("м'ясо")
    expect(normalizeText('Мʼясо')).toBe("м'ясо")
  })
})
