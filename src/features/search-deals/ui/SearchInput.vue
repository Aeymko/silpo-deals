<script setup lang="ts">
import { Search } from '@lucide/vue'
import { GLASS_FIELD } from '@/shared/lib/glass'
import { cn } from '@/shared/lib/utils'
import { Input } from '@/shared/ui/input'
import { searchQuery } from '../model/search'
</script>

<template>
  <div class="relative">
    <Search
      class="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
    />
    <Input
      v-model="searchQuery"
      type="search"
      placeholder="Я шукаю…"
      autocomplete="off"
      aria-label="Пошук товарів"
      :class="cn(GLASS_FIELD, 'h-10 pl-10')"
    />
  </div>
</template>
