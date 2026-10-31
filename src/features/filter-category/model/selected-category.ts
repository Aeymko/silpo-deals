import { useStorage } from '@vueuse/core'
import { STORAGE_PREFIX } from '@/shared/config'

/** Title of the selected top-level category; empty means all. */
export const selectedCategory = useStorage(`${STORAGE_PREFIX}category`, '')
