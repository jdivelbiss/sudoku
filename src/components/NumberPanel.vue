<template>
  <div class="number-panel">
    <div
      v-for="item in numbers"
      v-bind:key="item.value"
      :class="getClassNames(item)"
      @click="handleClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSudokuStore } from '@/stores/sudoku'

const store = useSudokuStore()

const emit = defineEmits<{
  clicked: [number: number, resolve: ClickedResolve]
}>()

interface NumberPanel {
  label: string
  value: number
  class: string
  used?: boolean
}

const numbers = ref([
  { label: '1', value: 1, class: 'number-panel-option', used: false },
  { label: '2', value: 2, class: 'number-panel-option', used: false },
  { label: '3', value: 3, class: 'number-panel-option', used: false },
  { label: '4', value: 4, class: 'number-panel-option', used: false },
  { label: '5', value: 5, class: 'number-panel-option', used: false },
  { label: '6', value: 6, class: 'number-panel-option', used: false },
  { label: '7', value: 7, class: 'number-panel-option', used: false },
  { label: '8', value: 8, class: 'number-panel-option', used: false },
  { label: '9', value: 9, class: 'number-panel-option', used: false },
  { label: 'X', value: 0, class: 'number-panel-option clear-option' },
])

export type ClickedResolve = (value: number) => void
async function handleClick(item: NumberPanel) {
  if (item.used) return

  const cellValue: number = await new Promise((resolve: ClickedResolve) => {
    emit('clicked', item.value, resolve)
  })

  if (item.value > 0) {
    item.used = store.numberUsed(item.value)
  } else {
    // Cell was cleared, promise will return the value that was in it before it was cleared.
    // Need to recheck if that value has been used or not
    const panelItem: NumberPanel = getItemByValue(cellValue)
    panelItem.used = store.numberUsed(cellValue)
  }
}

function getItemByValue(value: number): NumberPanel {
  return numbers.value.find((number: NumberPanel) => {
    return number.value == value
  }) as NumberPanel
}

function getClassNames(item: NumberPanel): string {
  let classNames: string[] = item.class.split(' ')
  if (item.used) {
    classNames.push('used')
  } else {
    classNames = classNames.filter((c) => c !== 'used')
  }

  return classNames.join(' ')
}
</script>

<style scoped>
.number-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 170px;
  flex-wrap: wrap;
}

.number-panel-option {
  width: 50px;
  height: 50px;
  font-size: 24px;
  align-content: center;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 2px;
  background-color: lightgrey;
  font-weight: bolder;
  color: #000;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.number-panel-option:hover {
  /* background-color: grey; */
  border: solid 1px #000;
  border-radius: 2px;
}
.number-panel-option:active {
  background-color: #000;
  border: solid 1px #000;
  border-radius: 2px;
}

.number-panel-option.clear-option {
  width: 100%;
  height: 40px;
  border-radius: 0%;
}

.used {
  cursor: default;
  color: gray;
}

.used:hover {
  /* background-color: grey; */
  border: none;
}

.used:active {
  background-color: lightgray;
  border: none;
}

@media only screen and (max-width: 768px) {
  /* tablets and desktop */
  .number-panel {
    max-width: 290px;
  }

  .number-panel-option {
    height: 30px;
    font-size: 18px;
  }

  .number-panel-option.clear-option {
    width: 50px;
    border-radius: 2px;
    height: 30px;
  }
}
</style>
