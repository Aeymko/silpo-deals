<script setup lang="ts">
import { Monitor, Moon, Sun } from '@lucide/vue'
import { GLASS_MENU } from '@/shared/lib/glass'
import { colorMode } from '@/shared/lib/theme'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

const { store } = colorMode
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="rounded-full hover:bg-(--glass-field)" aria-label="Тема">
        <Sun class="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon class="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" :class="GLASS_MENU">
      <DropdownMenuRadioGroup v-model="store">
        <DropdownMenuRadioItem value="light"><Sun />Світла</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark"><Moon />Темна</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="auto"><Monitor />Як у системі</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
