<script setup lang="ts">
import { Check } from '@lucide/vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/shared/lib/utils'

const props = withDefaults(
  defineProps<{
    pressed: boolean
    count?: number | null
    variant?: 'soft' | 'solid'
    class?: HTMLAttributes['class']
  }>(),
  { count: null, variant: 'soft', class: undefined },
)
</script>

<template>
  <button
    type="button"
    :aria-pressed="pressed"
    :class="
      cn(
        'focus-visible:ring-ring/50 ease-spring inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium whitespace-nowrap outline-none transition-[transform,background-color] duration-300 focus-visible:ring-3 active:scale-[0.96]',
        props.variant === 'soft' && 'glass-surface bg-glass hover:bg-glass-strong',
        props.variant === 'solid' && 'bg-glass hover:bg-glass-strong border border-(--glass-edge)',
        pressed && props.variant === 'soft' && 'bg-foreground text-background hover:bg-foreground/90 border-foreground',
        pressed && props.variant === 'solid' && 'bg-primary text-primary-foreground hover:bg-primary/90 border-primary',
        props.class,
      )
    "
  >
    <Check v-if="pressed && props.variant === 'solid'" class="-ml-0.5 size-3.5" />
    <slot />
    <span v-if="count !== null" class="text-xs tabular-nums opacity-60">{{ count }}</span>
  </button>
</template>
