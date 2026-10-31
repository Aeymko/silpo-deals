import { watchDebounced } from '@vueuse/core'
import { computed, onMounted, watch } from 'vue'
import { toast } from 'vue-sonner'
import { loadBranches } from '@/entities/branch'
import { loadCategories } from '@/entities/category'
import { loadCatalog, loadError } from '@/entities/product'
import { loadPromotionFacets } from '@/entities/promotion'
import { selectedPromotions } from '@/features/filter-promotion'
import { selectedBranchId } from '@/features/select-branch'
import { inStockOnly } from '@/features/toggle-in-stock'
import type { ProductsQuery } from '@/shared/api/silpo'

const describeError = (error: unknown) => (error instanceof Error ? error.message : String(error))

/** Keeps the catalogue in sync with the server-side filters: branch, promotions and stock. */
export function useDealsSync() {
  const query = computed<ProductsQuery>(() => ({
    branchId: selectedBranchId.value,
    promotions: [...selectedPromotions.value].sort(),
    inStock: inStockOnly.value,
  }))

  // Debounced so toggling several promotions in a row triggers a single download.
  watchDebounced(query, (q) => loadCatalog(q), { debounce: 500 })

  watch(
    selectedBranchId,
    (branchId) =>
      loadPromotionFacets(branchId).catch((error) =>
        toast.error('Не вдалося завантажити список акцій', { description: describeError(error) }),
      ),
    { immediate: true },
  )

  watch(loadError, (message) => {
    if (message) toast.error('Не вдалося завантажити товари', { description: message })
  })

  onMounted(() => {
    loadCatalog(query.value)
    loadCategories().catch((error) =>
      toast.error('Не вдалося завантажити категорії', { description: describeError(error) }),
    )
    loadBranches().catch((error) =>
      toast.error('Не вдалося завантажити магазини', { description: describeError(error) }),
    )
  })

  return { refresh: () => loadCatalog(query.value, { force: true }) }
}
