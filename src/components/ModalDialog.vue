<template>
  <div v-if="props.isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-header" v-if="slots.header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body" v-if="slots.content">
          <slot name="content"></slot>
        </div>
        <div class="modal-footer" v-if="slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useSlots } from 'vue'
const slots = useSlots()

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['modal-close'])

const target = ref(null)
onClickOutside(target, () => emit('modal-close'))
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  width: 500px;
  margin: 150px auto;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  cursor: default;
}

.modal-header {
  text-align: center;
  font-weight: bold;
  font-size: large;
  margin-bottom: 10px;
}

@media only screen and (max-width: 768px) {
  .modal-container {
    width: 100%;
  }
}
</style>
