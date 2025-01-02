<script lang="ts" src="./NumberPanel.ts"></script>
<style scoped src="./NumberPanel.css"></style>

<template>
  <div class="number-panel">
    <div
      v-for="item in numbers"
      v-bind:key="item.value"
      :class="item.class"
      @click="handleClick(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>
