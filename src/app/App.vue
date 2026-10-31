<script setup lang="ts">
import { DealsPage } from '@/pages/deals'
import { isDark } from '@/shared/lib/theme'
import { Toaster } from '@/shared/ui/sonner'
</script>

<template>
  <DealsPage />
  <Toaster :theme="isDark ? 'dark' : 'light'" position="bottom-left" rich-colors close-button />
</template>
