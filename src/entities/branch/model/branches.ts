import { shallowRef } from 'vue'
import { getBranches } from '@/shared/api/silpo'
import { readCache, writeCache } from '@/shared/lib/cache'
import { type Branch, toBranch } from '../lib/branch'

const CACHE_KEY = 'branches'
const TTL_MS = 24 * 60 * 60 * 1000

export const branches = shallowRef<Branch[]>([])

export async function loadBranches() {
  const cached = readCache<Branch[]>(CACHE_KEY, TTL_MS)
  if (cached) {
    branches.value = cached.value
    return
  }
  const page = await getBranches()
  branches.value = page.items.map(toBranch)
  writeCache(CACHE_KEY, branches.value)
}
