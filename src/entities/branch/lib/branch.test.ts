import { describe, expect, it } from 'vitest'
import { type Branch, groupByCity, matchesBranch } from './branch'

const branch = (city: string, address: string, number = '1'): Branch => ({
  id: `${city}-${address}`,
  city,
  address,
  number,
})

describe('groupByCity', () => {
  it('puts Kyiv first, then other cities alphabetically, with natural address order', () => {
    const groups = groupByCity([
      branch('Львів', 'вул. Городоцька, 1'),
      branch('Київ', 'просп. Берестейський, 94/1'),
      branch('Дніпро', 'вул. Робоча, 2'),
      branch('Київ', 'просп. Берестейський, 9'),
    ])

    expect(groups.map((g) => g.city)).toEqual(['Київ', 'Дніпро', 'Львів'])
    expect(groups[0]?.branches.map((b) => b.address)).toEqual([
      'просп. Берестейський, 9',
      'просп. Берестейський, 94/1',
    ])
  })
})

describe('matchesBranch', () => {
  it('matches every search term against city, address and store number', () => {
    const store = branch('Київ', 'просп. Берестейський, 94/1', '3171')

    expect(matchesBranch(store, 'київ берест')).toBe(true)
    expect(matchesBranch(store, '3171')).toBe(true)
    expect(matchesBranch(store, 'львів берест')).toBe(false)
  })
})
