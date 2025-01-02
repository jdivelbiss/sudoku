import { defineComponent, ref, watch } from 'vue'

interface MainBoardProps {
  selectedNumber: number
  candidateMode: boolean
}

export default defineComponent({
  props: {
    selectedNumber: {
      type: Number,
      default: 0,
    },
    candidateMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
  setup(props: MainBoardProps) {
    const puzzle: string[][] = [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ]

    const selectedCell = ref([0, 0])

    function getCellDisplayValue(row: number, col: number): string {
      if (puzzle[row][col] === '-') {
        return ''
      }

      return puzzle[row][col]
    }

    function getCellClass(row: number, col: number): string {
      const classNane: string = 'board-col'

      let cellType: string = 'blank'
      if (puzzle[row][col] !== '-') {
        cellType = 'filled'
      }

      let borderStyle: string = ''
      if (col + 1 !== 9 && (col + 1) % 3 === 0) {
        borderStyle = 'group-col-border'
      }

      return `${classNane} ${cellType} ${borderStyle}`
    }

    function getRowClass(row: number): string {
      const classNane: string = 'board-row'

      let borderStyle: string = ''
      if (row + 1 !== 9 && (row + 1) % 3 === 0) {
        borderStyle = 'group-row-border'
      }

      return `${classNane} ${borderStyle}`
    }

    function handleClick(event: MouseEvent, row: number, col: number) {
      const cells: HTMLElement[] = Array.from(document.querySelectorAll('.selected'))
      for (const cell of cells) {
        cell.classList.remove('selected')
      }

      const selectedRow: number = row + 1
      const selectedCol: number = col + 1

      selectedCell.value = [selectedRow, selectedCol]
      const divCell: HTMLElement = document.getElementById(
        `r${selectedRow}c${selectedCol}`,
      ) as HTMLElement
      divCell.classList.add('selected')
    }

    watch(
      () => props.selectedNumber,
      (newValue: number, oldValue: number) => {
        console.log('OLD: %s - NEW: %s', oldValue, newValue)
        console.log(props.candidateMode)
      },
    )

    return {
      getCellClass,
      getCellDisplayValue,
      getRowClass,
      handleClick,
      puzzle,
      selectedCell,
    }
  },
})
