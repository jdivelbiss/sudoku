<template>
  <div :class="getTileClass()">{{ getDisplayNumber() }}</div>
</template>

<script setup lang="ts">
import type { BoardCell } from '@/stores/sudoku'
import type { PropType } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()

const props = defineProps({
  number: {
    type: String,
  },
  cell: {
    type: Object as PropType<BoardCell>,
  },
})

function getTileClass() {
  const classNames: string[] = ['number-tile']
  if (props.cell?.given) return classNames[0]

  if (props.cell?.guess) {
    classNames.push(...getGuessClass())
  }

  return classNames.join(' ')
}

function getGuessClass(): string[] {
  const classes: string[] = []

  if (settings.showIncorrect && !props.cell?.isCorrect) {
    classes.push('number-tile-incorrect')
  }

  if (settings.showCorrect && props.cell?.isCorrect) {
    classes.push('number-tile-correct')
  }

  return classes
}

function getDisplayNumber() {
  if (props.cell?.given) return props.cell?.answer

  return props.cell?.guess
}
</script>

<style scoped>
.number-tile {
  font-size: 24px;
  font-weight: bold;
  color: #000;
  position: relative;
}

.number-tile-incorrect:after {
  content: '';
  position: absolute;
  width: 71px;
  height: 1px;
  background-color: red;
  left: -11px;
  top: 50%;
  transform: rotate(45deg);
}

.number-tile-correct {
  color: blue;
  font-weight: bolder;
}

@media only screen and (max-width: 768px) {
  .number-tile-incorrect:after {
    width: 62px;
    transform: rotate(48deg);
  }
}
</style>
