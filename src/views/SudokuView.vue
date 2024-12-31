<script setup lang="ts">
import NumberPanel from '../components/NumberPanel/NumberPanel.vue'
import MainBoard from '../components/MainBoard/MainBoard.vue'
import CandidateMode from '../components/CandidateMode/CandidateMode.vue'
import AutoCandidate from '../components/AutoCandidate/AutoCandidate.vue'
import TimerPanel from '../components/TimerPanel/TimerPanel.vue'
</script>

<template>
  <header>
    <h1>Sudoku - My Take</h1>
    <TimerPanel />
  </header>

  <div class="game-area">
    <div class="game-board">
      <MainBoard />
    </div>
    <div class="game-controls">
      <CandidateMode />
      <NumberPanel />
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
}

@media only screen and (max-width: 768px) {
  /* tablets and desktop */
  .game-area {
    flex-direction: column;
  }

  .game-board {
    width: 100%;
  }

  .game-controls {
    width: 100%;
  }
}
</style>
