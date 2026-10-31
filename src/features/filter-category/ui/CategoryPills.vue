<script setup lang="ts">
import { computed, watch } from 'vue'
import { categoryIndex, categoryOf } from '@/entities/category'
import { deals } from '@/entities/product'
import { TogglePill } from '@/shared/ui/toggle-pill'
import { selectedCategory } from '../model/selected-category'

const pills = computed(() => {
  const counts = new Map<string, number>()
  for (const deal of deals.value) {
    const title = categoryOf(deal.section)
    counts.set(title, (counts.get(title) ?? 0) + 1)
  }
  const known = categoryIndex.value.roots.filter((root) => counts.has(root.title))
  const unknown = [...counts.keys()]
    .filter((title) => !known.some((root) => root.title === title))
    .map((title) => ({ title, color: '' }))
  return [...known, ...unknown].map((c) => ({ ...c, count: counts.get(c.title) ?? 0 }))
})

watch(pills, (list) => {
  if (deals.value.length && selectedCategory.value && !list.some((p) => p.title === selectedCategory.value)) {
    selectedCategory.value = ''
  }
})
</script>

<template>
  <nav
    class="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    aria-label="Категорії"
  >
    <TogglePill :pressed="!selectedCategory" :count="deals.length" @click="selectedCategory = ''"
      >Всі</TogglePill
    >
    <TogglePill
      v-for="pill in pills"
      :key="pill.title"
      :pressed="selectedCategory === pill.title"
      :count="pill.count"
      @click="selectedCategory = pill.title"
    >
      <span
        class="bg-secondary size-4 rounded-full ring-1 ring-black/5"
        :style="pill.color ? { backgroundColor: pill.color } : undefined"
      />
      {{ pill.title }}
    </TogglePill>
  </nav>
</template>
