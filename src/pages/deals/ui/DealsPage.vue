<script setup lang="ts">
import { watch } from 'vue'
import { selectedCategory } from '@/features/filter-category'
import { sortKey } from '@/features/sort-deals'
import { AppHeader } from '@/widgets/app-header'
import { DealsFilters } from '@/widgets/deals-filters'
import { DealsGrid } from '@/widgets/deals-grid'
import { useDealsSync } from '../model/sync'
import { useVisibleDeals } from '../model/visible'

const { refresh } = useDealsSync()
const visibleDeals = useVisibleDeals()

// After a deep scroll, a new category or order should start from the top of the list.
watch([selectedCategory, sortKey], () => {
  const grid = document.getElementById('deals')
  if (grid && grid.getBoundingClientRect().top < 0) grid.scrollIntoView({ block: 'start' })
})
</script>

<template>
  <AppHeader @refresh="refresh" />
  <main class="mx-auto w-full max-w-[1920px] px-3 pb-10 sm:px-6">
    <DealsFilters />
    <DealsGrid :items="visibleDeals" />
  </main>
</template>
