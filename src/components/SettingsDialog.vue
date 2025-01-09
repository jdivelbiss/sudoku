<template>
  <fa-icon icon="fa-gear" class="settings-icon" @click="openModal" />

  <ModalDialog :isOpen="isModalOpened" @modal-close="closeModal" name="first-modal">
    <template #header>Game Settings</template>
    <template #content>
      <div class="setting-options">
        <div class="show-incorrect-option">
          <span>Show incorrect guess</span>
          <fa-icon
            :icon="['fas', showIncorrect()]"
            class="toggle-icon"
            @click="toggleIncorrect()"
          />
        </div>
        <div class="show-correct-option">
          <span>Show correct guess</span>
          <fa-icon :icon="['fas', showCorrect()]" class="toggle-icon" @click="toggleCorrect()" />
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalDialog from './ModalDialog.vue'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()

const isModalOpened = ref(false)
const openModal = () => {
  isModalOpened.value = true
}
const closeModal = () => {
  isModalOpened.value = false
}

function toggleIncorrect() {
  settings.showIncorrect = !settings.showIncorrect
}

function showIncorrect(): string {
  return settings.showIncorrect ? 'toggle-on' : 'toggle-off'
}

function toggleCorrect() {
  settings.showCorrect = !settings.showCorrect
}

function showCorrect(): string {
  return settings.showCorrect ? 'toggle-on' : 'toggle-off'
}
</script>

<style scoped>
.settings-icon {
  margin-right: 5px;
}
.show-incorrect-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.show-correct-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toggle-icon {
  font-size: 24px;
  cursor: pointer;
}
</style>
