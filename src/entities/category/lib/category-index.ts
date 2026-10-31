import type { CategoryDto } from '@/shared/api/silpo'

export const OTHER_CATEGORY = 'Інше'

export interface RootCategory {
  title: string
  color: string
}

export interface CategoryIndex {
  /** Product `sectionSlug` → title of its top-level category. */
  sectionRoot: Record<string, string>
  /** Top-level categories in catalogue order. */
  roots: RootCategory[]
}

export function buildCategoryIndex(items: readonly CategoryDto[]): CategoryIndex {
  const byId = new Map(items.map((c) => [c.id, c]))
  const sectionRoot: Record<string, string> = {}
  for (const category of items) {
    let root = category
    for (let depth = 0; root.parentId && byId.has(root.parentId) && depth < 20; depth++) {
      root = byId.get(root.parentId) as CategoryDto
    }
    sectionRoot[category.slug] = root.title
  }
  const roots = items
    .filter((c) => !c.parentId || !byId.has(c.parentId))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((c) => ({ title: c.title, color: c.media?.bgColor ?? '' }))
  return { sectionRoot, roots }
}
