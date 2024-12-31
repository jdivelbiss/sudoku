<script lang="ts" src="./MainBoard.ts"></script>
<style scoped src="./MainBoard.css"></style>

<template>
  <div class="main-board">
    <div
      :class="getRowClass(rIndex)"
      v-for="(rows, rIndex) in puzzle"
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
        {{ getCellDisplayValue(rIndex, cIndex) }}
      </div>
    </div>
  </div>
</template>
