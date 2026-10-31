<script setup lang="ts">
import { Label } from '@/shared/ui/label'
import { Switch } from '@/shared/ui/switch'
import { inStockOnly } from '../model/in-stock'
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <Switch id="in-stock-only" v-model="inStockOnly" />
    <Label for="in-stock-only" class="text-muted-foreground font-normal">Лише в наявності</Label>
  </div>
</template>
