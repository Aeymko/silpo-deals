import { useStorage } from '@vueuse/core'
import { STORAGE_PREFIX } from '@/shared/config'

export const inStockOnly = useStorage(`${STORAGE_PREFIX}in-stock`, true)
