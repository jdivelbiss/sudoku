<template>
  <div v-if="props.isOpen" class="modal-mask">
    <div id="test" class="modal-wrapper">
      <div class="modal-container" ref="target">
        <canvas id="canvas"></canvas>
        <!-- <div class="modal-header" v-if="slots.header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body" v-if="slots.content">
          <slot name="content"></slot>
        </div>
        <div class="modal-footer" v-if="slots.footer">
          <slot name="footer"></slot>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useSlots } from 'vue'
import JSConfetti from 'js-confetti'
const slots = useSlots()

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['modal-close'])

const target = ref(null)
onClickOutside(target, () => emit('modal-close'))


onMounted(() => {
  console.log("OnMounted")
})

watch(() => props.isOpen, async (first, second) => {

  if (first === true) {
    await nextTick()
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    if(canvas) {
      const jsConfetti = new JSConfetti({ canvas })
      jsConfetti.addConfetti().then(() => jsConfetti.addConfetti())
      jsConfetti.addConfetti().then(() => jsConfetti.addConfetti())
    }
  }

  console.log(
    "Watch props.isOpen function called with args:",
    first,
    second
  );
});

</script>

<style scoped>
#canvas {
  background-color: white;
  width: 100%;
  height: 100%;
  border: 1px solid blue;
}

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
  width: 800px;
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
