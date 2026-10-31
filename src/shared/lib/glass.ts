import { useWindowScroll } from '@vueuse/core'
import { watchEffect } from 'vue'

/** Capsule field (input, select, picker button) that sits inside a glass panel. */
export const GLASS_FIELD =
  'rounded-full border-(--glass-edge) bg-(--glass-field) dark:bg-(--glass-field) shadow-[inset_0_1px_2px_oklch(0_0_0/0.06)] hover:bg-(--glass-field)'

/** Floating menu surface; the explicit shadow replaces the component's own `shadow-md`. */
export const GLASS_MENU =
  'glass bg-glass-strong rounded-2xl shadow-[inset_0_1px_0_var(--glass-highlight),0_18px_40px_-12px_var(--glass-shadow)]'

/** Publishes scroll progress over the first `distance` px as `--scroll-depth` for `glass-floating`. */
export function useGlassScrollDepth(distance = 70) {
  const { y } = useWindowScroll()
  watchEffect(() => {
    const depth = Math.min(Math.max(y.value / distance, 0), 1)
    document.documentElement.style.setProperty('--scroll-depth', depth.toFixed(3))
  })
}
