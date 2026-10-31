<script setup lang="ts">
import { computed } from 'vue'
import { type PromotionFacet, promotionFacets, promotionTitles } from '@/entities/promotion'
import { TogglePill } from '@/shared/ui/toggle-pill'
import { selectedPromotions, togglePromotion } from '../model/selected-promotions'

const chips = computed<PromotionFacet[]>(() =>
  promotionFacets.value.length
    ? promotionFacets.value
    : selectedPromotions.value.map((code) => ({
        code,
        title: promotionTitles.value[code] ?? code,
        total: null,
      })),
)
</script>

<template>
  <fieldset class="flex flex-wrap gap-2">
    <legend class="sr-only">Акції</legend>
    <TogglePill
      v-for="chip in chips"
      :key="chip.code"
      variant="solid"
      :pressed="selectedPromotions.includes(chip.code)"
      :count="chip.total"
      @click="togglePromotion(chip.code)"
    >
      {{ chip.title }}
    </TogglePill>
  </fieldset>
</template>
