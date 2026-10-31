<script setup lang="ts">
import { ArrowUp, SearchX } from '@lucide/vue'
import { useWindowScroll } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import {
  type Deal,
  deals,
  loadError,
  loadedAt,
  loading,
  ProductCard,
  ProductCardSkeleton,
} from '@/entities/product'
import { promotionTitles } from '@/entities/promotion'
import { MinDiscountSlider } from '@/features/filter-discount'
import { InStockSwitch } from '@/features/toggle-in-stock'
import { formatTime, pluralUk } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

const BATCH = 120

const props = defineProps<{
  /** Deals after filtering and sorting. */
  items: Deal[]
}>()

const limit = ref(BATCH)
const shown = computed(() => props.items.slice(0, limit.value))
const showSkeleton = computed(() => loading.value && !deals.value.length)

const status = computed(() => {
  if (loadError.value) return `Не вдалося завантажити дані: ${loadError.value}`
  if (loading.value) return 'Завантаження…'
  if (loadedAt.value === null) return ''
  const n = props.items.length
  const parts = [`${n} ${pluralUk(n, ['товар', 'товари', 'товарів'])}`]
  if (n !== deals.value.length) parts.push(`з ${deals.value.length}`)
  parts.push(`дані на ${formatTime(loadedAt.value)}`)
  return parts.join(' · ')
})

const labelsFor = (deal: Deal) =>
  deal.promotions
    .map((code) => promotionTitles.value[code])
    .filter((title): title is string => Boolean(title))
    .slice(0, 2)

const sentinel = useTemplateRef('sentinel')
let observer: IntersectionObserver | undefined

// Re-observing forces a fresh callback when the sentinel is still on screen after a render.
async function reobserve() {
  await nextTick()
  if (!observer || !sentinel.value) return
  observer.unobserve(sentinel.value)
  observer.observe(sentinel.value)
}

function showMore() {
  if (limit.value >= props.items.length) return
  limit.value += BATCH
  reobserve()
}

watch(
  () => props.items,
  () => {
    limit.value = BATCH
    reobserve()
  },
)

onMounted(() => {
  observer = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && showMore(), {
    rootMargin: '1200px 0px',
  })
  if (sentinel.value) observer.observe(sentinel.value)
})
onBeforeUnmount(() => observer?.disconnect())

const { y } = useWindowScroll()
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <section id="deals" class="scroll-mt-20">
    <div class="flex flex-wrap items-end gap-x-4 gap-y-3 pt-7 pb-4">
      <div class="flex flex-col gap-0.5">
        <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Акції</h2>
        <span
          :class="cn('min-h-5 text-sm', loadError ? 'text-destructive' : 'text-muted-foreground')"
          role="status"
        >
          {{ status }}
        </span>
      </div>
      <div class="flex-1" />
      <div class="glass bg-glass flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[1.75rem] px-5 py-2.5">
        <MinDiscountSlider />
        <InStockSwitch />
      </div>
    </div>

    <div
      class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
    >
      <template v-if="showSkeleton">
        <ProductCardSkeleton v-for="i in 18" :key="i" />
      </template>
      <template v-else>
        <ProductCard v-for="deal in shown" :key="deal.id" :deal="deal" :labels="labelsFor(deal)" />
        <div
          v-if="loadedAt !== null && !items.length"
          class="glass-surface bg-glass col-span-full flex flex-col items-center gap-2 rounded-[1.75rem] py-20 text-center"
        >
          <SearchX class="text-muted-foreground size-10" />
          <p class="font-medium">Нічого не знайдено</p>
          <p class="text-muted-foreground text-sm">Спробуй змінити фільтри або зменшити поріг знижки</p>
        </div>
      </template>
    </div>
    <div ref="sentinel" />
  </section>

  <Transition
    enter-active-class="ease-spring transition duration-300"
    leave-active-class="transition duration-200"
    enter-from-class="translate-y-3 scale-90 opacity-0"
    leave-to-class="translate-y-3 scale-90 opacity-0"
  >
    <Button
      v-if="y > 800"
      variant="ghost"
      size="icon-lg"
      class="glass-floating hover:bg-glass-strong fixed right-5 bottom-5 z-30 size-12 rounded-full"
      aria-label="Нагору"
      @click="scrollToTop"
    >
      <ArrowUp />
    </Button>
  </Transition>
</template>
