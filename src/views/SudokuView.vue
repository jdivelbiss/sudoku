<script setup lang="ts">
import { ref } from 'vue'

import NumberPanel from '../components/NumberPanel/NumberPanel.vue'
import MainBoard from '../components/MainBoard/MainBoard.vue'
import CandidateMode from '../components/CandidateMode.vue'
import AutoCandidate from '../components/AutoCandidate/AutoCandidate.vue'
import TimerPanel from '../components/TimerPanel/TimerPanel.vue'

const selectedNumber = ref(0)
function numberClicked(value: number) {
  selectedNumber.value = value
}

const candidateMode = ref(false)
function candidateModeClicked(mode: boolean) {
  candidateMode.value = mode
}
</script>

<template>
  <header>
    <h1>Sudoku - My Take</h1>
    <TimerPanel />
  </header>

  <div class="game-area">
    <div class="game-board">
      <MainBoard :selected-number="selectedNumber" />
    </div>
    <div class="game-controls">
      <CandidateMode :candidate-mode="candidateMode" @mode-changed="candidateModeClicked" />
      <NumberPanel @number-clicked="numberClicked" />
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
