import { describe, expect, it } from 'vitest'
import type { CategoryDto } from '@/shared/api/silpo'
import { buildCategoryIndex } from './category-index'

const category = (id: string, parentId: string | null, order = 0): CategoryDto => ({
  id,
  parentId,
  slug: `slug-${id}`,
  title: `Title ${id}`,
  order,
  media: { bgColor: `#${id}` },
})

describe('buildCategoryIndex', () => {
  const index = buildCategoryIndex([
    category('leaf', 'mid'),
    category('mid', 'drinks'),
    category('drinks', null, 2),
    category('fruit', null, 1),
  ])

  it('maps every section, however deep, to its top-level category', () => {
    expect(index.sectionRoot['slug-leaf']).toBe('Title drinks')
    expect(index.sectionRoot['slug-mid']).toBe('Title drinks')
    expect(index.sectionRoot['slug-fruit']).toBe('Title fruit')
  })

  it('lists top-level categories in catalogue order with their colour', () => {
    expect(index.roots).toEqual([
      { title: 'Title fruit', color: '#fruit' },
      { title: 'Title drinks', color: '#drinks' },
    ])
  })
})
