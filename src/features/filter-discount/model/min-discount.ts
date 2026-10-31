import { useStorage } from '@vueuse/core'
import { STORAGE_PREFIX } from '@/shared/config'

export const minDiscount = useStorage(`${STORAGE_PREFIX}min-discount`, 0)
