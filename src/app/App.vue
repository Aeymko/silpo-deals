<script setup lang="ts">
import { DealsPage } from '@/pages/deals'
import { useGlassScrollDepth } from '@/shared/lib/glass'
import { isDark } from '@/shared/lib/theme'
import { Toaster } from '@/shared/ui/sonner'

useGlassScrollDepth(70)
</script>

<template>
  <DealsPage />
  <Toaster :theme="isDark ? 'dark' : 'light'" position="bottom-left" rich-colors close-button />
</template>
