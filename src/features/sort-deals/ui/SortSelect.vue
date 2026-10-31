<script setup lang="ts">
import { ArrowDownWideNarrow } from '@lucide/vue'
import { GLASS_FIELD, GLASS_MENU } from '@/shared/lib/glass'
import { cn } from '@/shared/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { SORT_OPTIONS, sortKey } from '../model/sort'
</script>

<template>
  <Select v-model="sortKey">
    <SelectTrigger :class="cn(GLASS_FIELD, 'px-3.5 data-[size=default]:h-10')" aria-label="Сортування">
      <ArrowDownWideNarrow />
      <SelectValue />
    </SelectTrigger>
    <SelectContent :class="GLASS_MENU">
      <SelectItem v-for="option in SORT_OPTIONS" :key="option.value" :value="option.value">
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
