<template>
  <div class="candidate-tile">
    <div v-for="item in numbers" v-bind:key="item.value" class="candidate">
      {{ item.picked ? item.value : '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({
  candidates: {
    type: Array,
    required: true,
  },
})

const numbers = ref([
  { value: 1, picked: false },
  { value: 2, picked: false },
  { value: 3, picked: false },
  { value: 4, picked: false },
  { value: 5, picked: false },
  { value: 6, picked: false },
  { value: 7, picked: false },
  { value: 8, picked: false },
  { value: 9, picked: false },
])

watch(
  () => props.candidates,
  (newValue) => {
    for (const number of numbers.value) {
      if (newValue.indexOf(number.value) > -1) {
        number.picked = true
      } else {
        number.picked = false
      }
    }
  },
  { deep: true, immediate: true },
)
</script>

<style scoped>
.candidate-tile {
  display: grid;
  gap: 0px;
  grid-template-columns: repeat(3, 1fr);
  width: 45px;
  height: 45px;
}

.candidate {
  font-size: 12px;
  height: 15px;
  width: 15px;
  color: darkgray;
}

@media only screen and (max-width: 768px) {
  .candidate-tile {
    width: 100%;
  }

  .candidate {
    /* width: calc(100% / 3); */
    width: 12px;
  }
}
</style>
