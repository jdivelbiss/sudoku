<template>
  <div class="auto-candidate">
    <input type="checkbox" id="auto-candidate-checkbox" v-model="checked"  @change="handleChange()"/>
    <span>Auto Candidate</span>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted,watch } from 'vue'

export interface AutoCandidateChangedArgs {
  autoCandidate: boolean
}

const checked = ref(false)
defineExpose({ checked })

const props = defineProps({
  autoCandidate: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  changed: [args: AutoCandidateChangedArgs]
}>()

function handleChange() {
  emit('changed', {autoCandidate: checked.value})
}

onMounted(() => {
  watch(() => props.autoCandidate, () => {
    checked.value = props.autoCandidate
  }, {immediate: true});
})
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
