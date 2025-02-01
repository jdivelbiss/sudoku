<template>
  <div class="candidate-mode">
    <div ref="normalMode" class="normal" @click="handleClick(false)">Normal</div>
    <div ref="candidateMode" class="candidate" @click="handleClick(true)">Candidate</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

export interface ModeChangedArgs {
  candidateMode: boolean
}

const normalMode = ref()
const candidateMode = ref()

const props = defineProps({
  candidateMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  changed: [args: ModeChangedArgs]
}>()

function toggleActive() {
  if (props.candidateMode !== true) {
    normalMode.value.classList.add('active')
    candidateMode.value.classList.remove('active')
  } else {
    normalMode.value.classList.remove('active')
    candidateMode.value.classList.add('active')
  }
}

function handleClick(candidateMode: boolean) {
  emit('changed', {candidateMode: candidateMode})
}

onMounted(() => {
  watch(() => props.candidateMode, () => {
    toggleActive();
  }, {immediate: true});
})
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
