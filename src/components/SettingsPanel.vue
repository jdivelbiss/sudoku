<template>
  <div class="settings-panel">
    <TimerPanel />
    <SettingsDialog />
  </div>
</template>

<script setup lang="ts">
import TimerPanel from './TimerPanel.vue'
import SettingsDialog from './SettingsDialog.vue'
</script>

<style scoped>
.settings-panel {
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.settings-icon {
  margin-right: 10px;
}
</style>
