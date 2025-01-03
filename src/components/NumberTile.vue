<template>
  <div class="number-tile">{{ props.number }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  given: {
    type: Boolean,
    default: false,
  },
  number: {
    type: String,
  },
})
</script>

<style scoped>
.number-tile {
  font-size: 24px;
  font-weight: bold;
  color: #000;
}
</style>
