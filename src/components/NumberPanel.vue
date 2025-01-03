<template>
  <div class="number-panel">
    <div
      v-for="item in numbers"
      v-bind:key="item.value"
      :class="item.class"
      @click="handleClick(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  clicked: [number: number]
}>()

const numbers: { label: string; value: number; class: string }[] = [
  { label: '1', value: 1, class: 'number-panel-option' },
  { label: '2', value: 2, class: 'number-panel-option' },
  { label: '3', value: 3, class: 'number-panel-option' },
  { label: '4', value: 4, class: 'number-panel-option' },
  { label: '5', value: 5, class: 'number-panel-option' },
  { label: '6', value: 6, class: 'number-panel-option' },
  { label: '7', value: 7, class: 'number-panel-option' },
  { label: '8', value: 8, class: 'number-panel-option' },
  { label: '9', value: 9, class: 'number-panel-option' },
  { label: 'X', value: 0, class: 'number-panel-option clear-option' },
]

function handleClick(value: number) {
  emit('clicked', value)
}
</script>

<style scoped>
.number-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 170px;
  flex-wrap: wrap;
}

.number-panel-option {
  width: 50px;
  height: 50px;
  font-size: 24px;
  align-content: center;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 2px;
  background-color: lightgrey;
  font-weight: bolder;
  color: #000;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.number-panel-option:hover {
  /* background-color: grey; */
  border: solid 1px #000;
  border-radius: 2px;
}
.number-panel-option:active {
  background-color: #000;
  border: solid 1px #000;
  border-radius: 2px;
}

.number-panel-option.clear-option {
  width: 100%;
  height: 40px;
  border-radius: 0%;
}

@media only screen and (max-width: 768px) {
  /* tablets and desktop */
  .number-panel {
    max-width: 290px;
  }

  .number-panel-option {
    height: 30px;
    font-size: 18px;
  }

  .number-panel-option.clear-option {
    width: 50px;
    border-radius: 2px;
    height: 30px;
  }
}
</style>
