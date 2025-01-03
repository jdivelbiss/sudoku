<template>
  <div class="auto-candidate">
    <input type="checkbox" id="auto-candidate-checkbox" v-model="checked" />
    <span>Auto Candidate</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<style scoped>
.auto-candidate {
  display: flex;
  width: 100%;
}

.auto-candidate span {
  padding-left: 4px;
  font-size: 12px;
}
</style>
