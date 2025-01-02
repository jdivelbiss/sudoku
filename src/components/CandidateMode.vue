<template>
  <div class="candidate-mode">
    <div id="normal-candidate-mode" class="normal" @click="handleClick(false)">Normal</div>
    <div id="candidate-candidate-mode" class="candidate" @click="handleClick(true)">Candidate</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue'

const emit = defineEmits<{
  changed: [candidateMode: boolean]
}>()

const props = defineProps({
  candidateMode: {
    type: Boolean,
    default: false,
  },
})

function setActiveMode(candidateMode: boolean) {
  const toggleActive: string =
    candidateMode === true ? 'candidate-candidate-mode' : 'normal-candidate-mode'
  const toggleInActive: string =
    candidateMode === true ? 'normal-candidate-mode' : 'candidate-candidate-mode'

  document.getElementById(toggleActive)?.classList.add('active')
  document.getElementById(toggleInActive)?.classList.remove('active')
}

function handleClick(candidateMode: boolean) {
  emit('changed', candidateMode)
}

onMounted(() => {
  setActiveMode(props.candidateMode)
})

watch(
  () => props.candidateMode,
  (newValue: boolean) => {
    setActiveMode(newValue)
  },
)
</script>

<style scoped>
.candidate-mode {
  display: flex;
  width: 100%;
  max-width: 200px;
  margin-bottom: 10px;
}

.candidate-mode div {
  font-size: 12px;
  flex-grow: 1;
  flex-basis: calc(100% / 2);
  text-align: center;
  cursor: pointer;
  font-weight: bold;
}

.normal {
  border: solid 1px lightgray;
}

.candidate {
  border: solid 1px lightgray;
}

.active {
  background-color: #000;
  border: solid 1px #000;
  color: #fff;
}
</style>
