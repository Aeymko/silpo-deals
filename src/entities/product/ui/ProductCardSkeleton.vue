<script setup lang="ts">
import { Skeleton } from '@/shared/ui/skeleton'
</script>

<template>
  <div class="glass-surface bg-glass rounded-[1.75rem] p-2" aria-hidden="true">
    <Skeleton class="bg-foreground/8 aspect-square rounded-[1.375rem]" />
    <div class="flex flex-col gap-2 px-2 pt-3 pb-1.5">
      <Skeleton class="bg-foreground/8 h-6 w-3/5" />
      <Skeleton class="bg-foreground/8 h-3 w-2/5" />
      <Skeleton class="bg-foreground/8 h-4 w-full" />
      <Skeleton class="bg-foreground/8 h-4 w-4/5" />
    </div>
  </div>
</template>
