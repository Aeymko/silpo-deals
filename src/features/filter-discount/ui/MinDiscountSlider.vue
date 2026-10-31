<script setup lang="ts">
import { Slider } from '@/shared/ui/slider'
import { minDiscount } from '../model/min-discount'

function update(value: number[] | undefined) {
  minDiscount.value = value?.[0] ?? 0
}
</script>

<template>
  <div class="text-muted-foreground inline-flex items-center gap-3 text-sm whitespace-nowrap">
    <span id="min-discount-label">Знижка від</span>
    <Slider
      :model-value="[minDiscount]"
      :min="0"
      :max="90"
      :step="5"
      class="w-36"
      aria-labelledby="min-discount-label"
      @update:model-value="update"
    />
    <span class="text-foreground w-10 font-bold tabular-nums">{{ minDiscount }}%</span>
  </div>
</template>
