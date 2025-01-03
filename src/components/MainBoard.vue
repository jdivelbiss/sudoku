<template>
  <div class="main-board">
    <div
      :class="getRowClass(rIndex)"
      v-for="(rows, rIndex) in store.board"
      v-bind:key="rIndex"
      :id="'r' + (rIndex + 1)"
    >
      <div
        :class="getCellClass(rIndex, cIndex)"
        @click="handleClick($event, rIndex, cIndex)"
        v-for="(col, cIndex) in rows"
        v-bind:key="cIndex"
        :id="'r' + (rIndex + 1) + 'c' + (cIndex + 1)"
      >
        <CandidateTile
          v-if="displayCandidates(rIndex, cIndex)"
          :candidates="getCell(rIndex, cIndex).candidates"
        />
        <NumberTile
          v-show="!displayCandidates(rIndex, cIndex)"
          :number="getCellDisplayValue(rIndex, cIndex)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSudokuStore } from '@/stores/sudoku'
import NumberTile from './NumberTile.vue'
import CandidateTile from './CandidateTile.vue'

const store = useSudokuStore()
const selectedCell = ref([0, 0])

const emit = defineEmits<{
  selected: [cell: { row: number; col: number; value: string }]
}>()

function displayCandidates(row: number, col: number): boolean {
  const cell = store.board[row][col]
  if (cell.given || cell.guess) return false

  return cell.candidates.length > 0
}

function getCell(row: number, col: number) {
  return store.board[row][col]
}

function getCellDisplayValue(row: number, col: number): string {
  const cell = store.board[row][col]
  if (cell.given) return cell.answer
  return cell.guess
}

function getCellClass(row: number, col: number): string {
  const classNane: string = 'board-col'

  let cellSelected: string = ''
  const cellEl: HTMLElement | null = document.getElementById(`r${row + 1}c${col + 1}`)
  if (cellEl) {
    // Anytime store.board is updated this method will be called.  Initially, before the DOM is ready
    // cellEl will be null, so no need to worry about any existing classes.  However, once rendered,
    // we may need to keep/remove class names based on certain conditions
    cellSelected = cellEl.classList.contains('selected') ? 'selected' : ''
  }

  let cellType: string = 'blank'
  const cell = store.board[row][col]
  if (cell.given) {
    cellType = 'filled'
  }

  if (!cell.guess && cell.candidates.length > 0) {
    cellType = 'candidates'
  }

  let borderStyle: string = ''
  if (col + 1 !== 9 && (col + 1) % 3 === 0) {
    borderStyle = 'group-col-border'
  }

  return `${classNane} ${cellType} ${borderStyle} ${cellSelected}`.trim()
}

function getRowClass(row: number): string {
  const classNane: string = 'board-row'

  let borderStyle: string = ''
  if (row + 1 !== 9 && (row + 1) % 3 === 0) {
    borderStyle = 'group-row-border'
  }

  return `${classNane} ${borderStyle}`
}

function handleClick(event: MouseEvent, row: number, col: number) {
  const cells: HTMLElement[] = Array.from(document.querySelectorAll('.selected'))
  for (const cell of cells) {
    cell.classList.remove('selected')
  }

  const selectedRow: number = row + 1
  const selectedCol: number = col + 1

  selectedCell.value = [selectedRow, selectedCol]
  const divCell: HTMLElement = document.getElementById(
    `r${selectedRow}c${selectedCol}`,
  ) as HTMLElement
  divCell.classList.add('selected')

  const cellValue: string = store.board[row][col].given
    ? store.board[row][col].answer
    : store.board[row][col].guess

  emit('selected', { row: selectedRow, col: selectedCol, value: cellValue })
}

function setCellValue(value: number) {
  if (selectedCell.value[0] > 0 && selectedCell.value[1] > 0) {
    store.setCellValue(value, selectedCell.value[0], selectedCell.value[1])
  }
}

function setCellCandidate(value: number) {
  if (selectedCell.value[0] > 0 && selectedCell.value[1] > 0) {
    store.setCellCandidate(value, selectedCell.value[0], selectedCell.value[1])
  }
}

defineExpose({ setCellValue, setCellCandidate })
</script>

<style scoped>
.main-board {
  border: solid 2px #000;
}
.board-row {
  display: flex;
  width: 100%;
}

.board-col {
  width: 50px;
  height: 50px;
  border: solid 1px lightgrey;
  font-size: 24px;
  align-content: center;
  text-align: center;
  font-weight: bolder;
  color: #000;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.group-col-border {
  border-right: solid 2px #000;
}

.group-row-border {
  border-bottom: solid 2px #000;
}

.filled {
  background-color: #ececec;
}

.candidates {
  align-content: start;
}

.selected {
  background-color: #ffd700;
}
</style>
