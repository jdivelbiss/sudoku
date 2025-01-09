<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useSudokuStore, type BoardCell } from '@/stores/sudoku'

import NumberPanel, { type ClickedResolve } from '../components/NumberPanel.vue'
import MainBoard from '../components/MainBoard.vue'
import CandidateMode from '../components/CandidateMode.vue'
import AutoCandidate from '../components/AutoCandidate.vue'
import SettingsPanel from '../components/SettingsPanel.vue'

const mainBoardRef = useTemplateRef('main-board')
const candidateModeRef = useTemplateRef('candidate-mode')

const store = useSudokuStore()
const selectedCell = ref({} as BoardCell)

function numberClicked(value: number, resolve: ClickedResolve) {
  const cellValue: number = Number(selectedCell.value.guess)

  if (candidateMode.value) {
    mainBoardRef.value?.setCellCandidate(value)
  } else {
    mainBoardRef.value?.setCellValue(value)
  }

  resolve(cellValue)
}

const candidateMode = ref(false)
function candidateModeClicked(mode: boolean) {
  candidateMode.value = mode
  candidateModeRef.value?.setActiveMode(mode)
}

function cellSelected(cell: BoardCell) {
  selectedCell.value = cell
}
</script>

<template>
  <header>
    <h1>Sudoku - My Take</h1>
  </header>
  <div class="game-area" v-if="!store.solved">
    <SettingsPanel />
    <div class="game-container">
      <div class="game-board">
        <MainBoard ref="main-board" @selected="cellSelected" />
      </div>
      <div class="game-controls">
        <CandidateMode ref="candidate-mode" @changed="candidateModeClicked" />
        <NumberPanel ref="number-panel" @clicked="numberClicked" />
        <AutoCandidate ref="auto-candidate" />
      </div>
    </div>
  </div>

  <div class="game-area" v-if="store.solved">YOU WON!!</div>

  <footer></footer>
</template>

<style>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

header h1 {
  flex: 1;
}

.game-area {
  max-width: 720px;
  margin: auto;
}

.game-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.game-board {
  width: 450px;
}

.game-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 100px;
}

@media only screen and (max-width: 768px) {
  /* tablets and desktop */
  .game-container {
    flex-direction: column;
  }

  .game-board {
    width: 100%;
  }
  .game-board {
    padding: 0px 2px;
  }

  .game-controls {
    width: 100%;
    margin-left: 0px;
    margin-top: 30px;
  }
}
</style>
