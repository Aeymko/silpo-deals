<script setup lang="ts">
import { SearchX, Star } from '@lucide/vue'
import { ref } from 'vue'
import { productImageUrl, productPageUrl } from '@/shared/api/silpo'
import { formatMoney } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'
import { type Deal, discountTone } from '../lib/deal'

defineProps<{
  deal: Deal
  labels: string[]
}>()

const imageFailed = ref(false)
</script>

<template>
  <a
    :href="productPageUrl(deal.slug)"
    target="_blank"
    rel="noopener noreferrer"
    :title="deal.title"
    class="group glass-surface bg-glass text-card-foreground focus-visible:ring-ring/50 ease-spring flex flex-col rounded-[1.75rem] p-2 outline-none transition-transform duration-300 hover:-translate-y-1 hover:[--glass-shadow:oklch(0.35_0.05_260/0.3)] focus-visible:ring-3 active:scale-[0.98]"
  >
    <div
      class="relative aspect-square overflow-hidden rounded-[1.375rem] bg-white shadow-[inset_0_0_0_1px_oklch(0_0_0/0.04)]"
    >
      <img
        v-if="deal.icon && !imageFailed"
        :src="productImageUrl(deal.icon)"
        alt=""
        width="300"
        height="300"
        loading="lazy"
        decoding="async"
        class="ease-spring size-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        @error="imageFailed = true"
      >
      <SearchX v-else class="absolute inset-0 m-auto size-10 text-neutral-300" />

      <div v-if="labels.length" class="absolute top-2 left-2 flex max-w-[62%] flex-col items-start gap-1">
        <span
          v-for="(label, index) in labels"
          :key="label"
          :class="
            cn(
              'rounded-full px-2.5 py-0.5 text-[11px] leading-4 font-semibold shadow-[inset_0_1px_0_oklch(1_0_0/0.5)]',
              index === 0 ? 'bg-promo text-promo-foreground' : 'bg-blue-50 text-blue-700 ring-1 ring-blue-200/70',
            )
          "
        >
          {{ label }}
        </span>
      </div>
      <span
        v-if="deal.saving > 0"
        :class="
          cn(
            'absolute top-2 right-2 rounded-full px-2.5 py-1 text-sm leading-none font-bold text-white tabular-nums shadow-[inset_0_1px_0_oklch(1_0_0/0.45),0_6px_14px_-6px_oklch(0_0_0/0.45)]',
            discountTone(deal.discount),
          )
        "
      >
        −{{ Math.round(deal.discount) }}%
      </span>
    </div>

    <div class="flex flex-1 flex-col gap-1 px-2 pt-3 pb-1.5">
      <div class="flex flex-wrap items-baseline gap-x-2">
        <span class="text-xl font-bold tracking-tight tabular-nums">
          {{ formatMoney(deal.price) }}<span class="ml-1 text-sm font-semibold">грн</span>
        </span>
        <span v-if="deal.saving > 0" class="text-muted-foreground text-sm tabular-nums line-through">
          {{ formatMoney(deal.oldPrice) }}
        </span>
      </div>
      <span class="min-h-4 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <template v-if="deal.saving > 0">Економія {{ formatMoney(deal.saving) }} грн</template>
      </span>
      <h3 class="mt-1 line-clamp-2 min-h-10 text-sm leading-5">{{ deal.title }}</h3>
      <div class="text-muted-foreground mt-auto flex items-center justify-between gap-2 pt-1 text-xs">
        <span>{{ deal.unit }}</span>
        <span v-if="deal.rating" class="inline-flex items-center gap-1">
          <Star class="size-3.5 fill-amber-400 text-amber-400" />
          {{ deal.rating }}
        </span>
      </div>
    </div>
  </a>
</template>
