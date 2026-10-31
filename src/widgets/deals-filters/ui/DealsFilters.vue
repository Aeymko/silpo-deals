<script setup lang="ts">
import { CategoryPills } from '@/features/filter-category'
import { PromotionChips } from '@/features/filter-promotion'
</script>

<template>
  <section class="flex flex-col gap-4 pt-5">
    <CategoryPills />
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span class="text-muted-foreground text-sm font-medium" aria-hidden="true">Типи акцій</span>
      <PromotionChips />
    </div>
  </section>
</template>
