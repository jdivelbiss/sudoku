<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

import NumberPanel from '../components/NumberPanel.vue'
import MainBoard from '../components/MainBoard.vue'
import CandidateMode from '../components/CandidateMode.vue'
import AutoCandidate from '../components/AutoCandidate.vue'
import TimerPanel from '../components/TimerPanel.vue'

const mainBoardRef = useTemplateRef('MainBoard')

const selectedNumber = ref(0)
function numberClicked(value: number) {
  // selectedNumber.value = value
  mainBoardRef.value?.setCellValue(value)
}

const candidateMode = ref(false)
function candidateModeClicked(mode: boolean) {
  candidateMode.value = mode
}

function cellSelected(cell: { row: number; col: number; value: string }) {
  if (/^\d+$/.test(cell.value)) {
    selectedNumber.value = Number(cell.value)
  } else {
    selectedNumber.value = 0
  }
}
</script>

<template>
  <header>
    <h1>Sudoku - My Take</h1>
    <TimerPanel />
  </header>

  <div class="game-area">
    <div class="game-board">
      <MainBoard
        ref="MainBoard"
        :selected-number="selectedNumber"
        @selected="cellSelected"
        :candidate-mode="candidateMode"
      />
    </div>
    <div class="game-controls">
      <CandidateMode :candidate-mode="candidateMode" @changed="candidateModeClicked" />
      <NumberPanel @clicked="numberClicked" />
      <AutoCandidate />
    </div>
  </div>

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
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  .game-area {
    flex-direction: column;
  }

  .game-board {
    width: 100%;
  }
  .game-board {
    padding: 0px 5px;
  }

  .game-controls {
    width: 100%;
    margin-left: 0px;
    margin-top: 30px;
  }
}
</style>
