import { useStorage } from '@vueuse/core'
import { DEFAULT_BRANCH_ID, STORAGE_PREFIX } from '@/shared/config'

export const selectedBranchId = useStorage(`${STORAGE_PREFIX}branch`, DEFAULT_BRANCH_ID)
