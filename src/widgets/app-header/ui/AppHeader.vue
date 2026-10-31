<script setup lang="ts">
import { BadgePercent, RefreshCw } from '@lucide/vue'
import { loading, progress } from '@/entities/product'
import { SearchInput } from '@/features/search-deals'
import { BranchPicker } from '@/features/select-branch'
import { SortSelect } from '@/features/sort-deals'
import { ThemeToggle } from '@/features/toggle-theme'
import { Button } from '@/shared/ui/button'

defineEmits<{ refresh: [] }>()
</script>

<template>
  <div class="sticky top-0 z-20 px-3 pt-3 sm:px-6">
    <header class="glass bg-glass relative mx-auto w-full max-w-[1920px] overflow-hidden rounded-[1.75rem]">
      <div class="flex flex-wrap items-center gap-3 p-2.5 sm:px-3">
        <div class="flex items-center gap-2.5 pl-1">
          <span
            class="bg-primary text-primary-foreground grid size-9 place-items-center rounded-full shadow-[inset_0_1px_0_oklch(1_0_0/0.45),0_6px_14px_-6px_var(--color-primary)]"
          >
            <BadgePercent class="size-5" />
          </span>
          <h1 class="text-lg leading-tight font-bold tracking-tight whitespace-nowrap">
            Знижки <span class="text-primary">Сільпо</span>
          </h1>
        </div>
        <div class="w-full sm:w-80"><BranchPicker /></div>
        <SearchInput class="min-w-48 flex-1 basis-80" />
        <SortSelect />
        <div class="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            class="rounded-full hover:bg-(--glass-field)"
            aria-label="Оновити"
            title="Завантажити свіжі дані"
            :disabled="loading"
            @click="$emit('refresh')"
          >
            <RefreshCw :class="loading && 'animate-spin'" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <div class="absolute inset-x-0 bottom-0 h-0.5">
        <div
          v-if="progress !== null"
          class="from-primary/50 to-primary h-full rounded-r-full bg-linear-to-r transition-[width] duration-300"
          :style="{ width: `${Math.round(progress * 100)}%` }"
        />
      </div>
    </header>
  </div>
</template>
