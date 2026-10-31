import { useStorage } from '@vueuse/core'
import { DEFAULT_PROMOTIONS, STORAGE_PREFIX } from '@/shared/config'

/** Promotion codes sent to the API; an empty list means every promotion. */
export const selectedPromotions = useStorage<string[]>(`${STORAGE_PREFIX}promotions`, DEFAULT_PROMOTIONS)

export function togglePromotion(code: string) {
  const list = selectedPromotions.value
  selectedPromotions.value = list.includes(code) ? list.filter((c) => c !== code) : [...list, code]
}
