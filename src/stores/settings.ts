import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const showIncorrect = ref(false)
  const showCorrect = ref(false)

  return {
    showIncorrect,
    showCorrect,
  }
})
