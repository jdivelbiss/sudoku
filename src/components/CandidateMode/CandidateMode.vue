<script lang="ts" src="./CandidateMode.ts"></script>
<style scoped src="./CandidateMode.css"></style>

<template>
  <div class="candidate-mode">
    <div id="normal-candidate-mode" class="normal" @click="handleClick(false)">Normal</div>
    <div id="candidate-candidate-mode" class="candidate" @click="handleClick(true)">Candidate</div>
  </div>
</template>
