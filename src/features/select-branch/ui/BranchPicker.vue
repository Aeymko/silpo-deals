<script setup lang="ts">
import { Check, ChevronsUpDown, Globe, MapPin } from '@lucide/vue'
import { computed, ref } from 'vue'
import { branches, branchLabel, groupByCity, matchesBranch } from '@/entities/branch'
import { DEFAULT_BRANCH_ID, ONLINE_BRANCH_ID } from '@/shared/config'
import { GLASS_FIELD, GLASS_MENU } from '@/shared/lib/glass'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { selectedBranchId } from '../model/selected-branch'

const ONLINE_LABEL = 'Онлайн-доставка'

const open = ref(false)
const filter = ref('')

const currentLabel = computed(() => {
  if (selectedBranchId.value === ONLINE_BRANCH_ID) return ONLINE_LABEL
  const branch = branches.value.find((b) => b.id === selectedBranchId.value)
  if (branch) return branchLabel(branch)
  return selectedBranchId.value === DEFAULT_BRANCH_ID
    ? 'просп. Берестейський, 94/1 · №3171'
    : 'Обраний магазин'
})

const groups = computed(() => groupByCity(branches.value.filter((b) => matchesBranch(b, filter.value))))

function select(id: string) {
  selectedBranchId.value = id
  open.value = false
  filter.value = ''
}

const optionClass = (id: string) =>
  cn(
    'hover:bg-foreground/6 flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left text-sm',
    id === selectedBranchId.value && 'font-semibold',
  )
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(GLASS_FIELD, 'h-10 w-full justify-start gap-2 px-3.5 font-normal')"
        title="Магазин"
      >
        <MapPin class="text-muted-foreground" />
        <span class="truncate">{{ currentLabel }}</span>
        <ChevronsUpDown class="ml-auto opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent
      align="start"
      :class="cn(GLASS_MENU, 'w-[min(26rem,calc(100vw-1.5rem))] rounded-3xl p-0')"
    >
      <div class="border-b border-(--glass-edge) p-2">
        <Input
          v-model="filter"
          type="search"
          placeholder="Місто, адреса або номер…"
          aria-label="Пошук магазину"
          :class="cn(GLASS_FIELD, 'h-9 px-3.5')"
        />
      </div>
      <div class="max-h-[min(24rem,60vh)] overflow-y-auto p-1.5">
        <button
          v-if="!filter"
          type="button"
          :class="optionClass(ONLINE_BRANCH_ID)"
          @click="select(ONLINE_BRANCH_ID)"
        >
          <Globe class="text-muted-foreground size-4" />
          {{ ONLINE_LABEL }}
          <Check v-if="selectedBranchId === ONLINE_BRANCH_ID" class="text-primary ml-auto size-4" />
        </button>
        <template v-for="group in groups" :key="group.city">
          <div class="text-muted-foreground px-2 pt-2.5 pb-1 text-xs font-semibold">{{ group.city }}</div>
          <button
            v-for="branch in group.branches"
            :key="branch.id"
            type="button"
            :class="optionClass(branch.id)"
            @click="select(branch.id)"
          >
            <span class="truncate">{{ branch.address }}</span>
            <span class="text-muted-foreground text-xs">№{{ branch.number }}</span>
            <Check v-if="branch.id === selectedBranchId" class="text-primary ml-auto size-4" />
          </button>
        </template>
        <p v-if="!groups.length" class="text-muted-foreground px-2 py-6 text-center text-sm">
          {{ branches.length ? 'Нічого не знайдено' : 'Завантаження магазинів…' }}
        </p>
      </div>
    </PopoverContent>
  </Popover>
</template>
