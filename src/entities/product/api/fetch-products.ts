import { getProductsPage, PAGE_SIZE, type ProductDto, type ProductsQuery, runPool } from '@/shared/api/silpo'
import { type Product, toProduct } from '../lib/deal'

const CONCURRENCY = 6

/** Downloads every page of the query in parallel; `onProgress` receives 0…1. */
export async function fetchAllProducts(
  query: ProductsQuery,
  signal: AbortSignal,
  onProgress: (ratio: number) => void,
): Promise<Product[]> {
  const first = await getProductsPage(query, 0, signal)
  const pages: ProductDto[][] = [first.items]
  const offsets: number[] = []
  for (let offset = PAGE_SIZE; offset < first.total; offset += PAGE_SIZE) offsets.push(offset)

  const totalPages = offsets.length + 1
  let done = 1
  onProgress(done / totalPages)

  await runPool(offsets, CONCURRENCY, async (offset) => {
    const page = await getProductsPage(query, offset, signal)
    pages.push(page.items)
    onProgress(++done / totalPages)
  })

  // Popularity order shifts while paging, so the same product can arrive twice.
  const byId = new Map<string, Product>()
  for (const page of pages) {
    for (const dto of page) if (!byId.has(dto.id)) byId.set(dto.id, toProduct(dto))
  }
  return [...byId.values()]
}
