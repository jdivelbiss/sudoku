import type { SetupContext } from 'vue'

export default {
  emits: ['number-clicked'],
  setup(props: object, ctx: SetupContext) {
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
      ctx.emit('number-clicked', value)
    }

    return {
      numbers,
      handleClick,
    }
  },
}
