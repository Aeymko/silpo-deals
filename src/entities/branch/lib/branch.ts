import type { BranchDto } from '@/shared/api/silpo'
import { normalizeText } from '@/shared/lib/format'

export interface Branch {
  id: string
  city: string
  address: string
  number: string
}

export interface CityGroup {
  city: string
  branches: Branch[]
}

export const toBranch = (dto: BranchDto): Branch => ({
  id: dto.branchId,
  city: dto.cityFull ?? '',
  address: dto.addressFull ?? '',
  number: dto.externalId ?? '',
})

export const branchLabel = (branch: Branch) => `${branch.address} · №${branch.number}`

export function matchesBranch(branch: Branch, query: string) {
  const haystack = normalizeText(`${branch.city} ${branch.address} ${branch.number}`)
  return normalizeText(query)
    .split(/\s+/)
    .every((term) => haystack.includes(term))
}

/** Groups by city with `firstCity` on top, then alphabetically; addresses use natural order. */
export function groupByCity(branches: readonly Branch[], firstCity = 'Київ'): CityGroup[] {
  const byCity = new Map<string, Branch[]>()
  for (const branch of branches) {
    const list = byCity.get(branch.city) ?? []
    list.push(branch)
    byCity.set(branch.city, list)
  }
  return [...byCity]
    .sort(([a], [b]) => Number(b === firstCity) - Number(a === firstCity) || a.localeCompare(b, 'uk'))
    .map(([city, list]) => ({
      city: city || 'Інше',
      branches: list.sort((a, b) => a.address.localeCompare(b.address, 'uk', { numeric: true })),
    }))
}
