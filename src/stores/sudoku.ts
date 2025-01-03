import { ref } from 'vue'
import { defineStore } from 'pinia'

interface BoardCell {
  answer: string
  guess: string
  candidates: number[]
  given: boolean
}

export const useSudokuStore = defineStore('sudoku', () => {
  const board = ref([
    [
      { answer: '7', guess: '', candidates: [], given: false },
      { answer: '9', guess: '', candidates: [], given: true },
      { answer: '6', guess: '', candidates: [], given: false },
      { answer: '5', guess: '', candidates: [], given: true },
      { answer: '8', guess: '', candidates: [], given: true },
      { answer: '1', guess: '', candidates: [], given: true },
      { answer: '4', guess: '', candidates: [], given: true },
      { answer: '2', guess: '', candidates: [], given: false },
      { answer: '3', guess: '', candidates: [], given: false },
    ],
    [
      { answer: '2', guess: '', candidates: [], given: true },
      { answer: '4', guess: '', candidates: [], given: true },
      { answer: '1', guess: '', candidates: [], given: true },
      { answer: '9', guess: '', candidates: [], given: false },
      { answer: '3', guess: '', candidates: [], given: true },
      { answer: '7', guess: '', candidates: [], given: false },
      { answer: '5', guess: '', candidates: [], given: false },
      { answer: '6', guess: '', candidates: [], given: false },
      { answer: '8', guess: '', candidates: [], given: false },
    ],
    [
      { answer: '8', guess: '', candidates: [], given: false },
      { answer: '3', guess: '', candidates: [], given: false },
      { answer: '5', guess: '', candidates: [], given: false },
      { answer: '6', guess: '', candidates: [], given: false },
      { answer: '2', guess: '', candidates: [], given: false },
      { answer: '4', guess: '', candidates: [], given: false },
      { answer: '9', guess: '', candidates: [], given: true },
      { answer: '1', guess: '', candidates: [], given: true },
      { answer: '7', guess: '', candidates: [], given: true },
    ],
    [
      { answer: '6', guess: '', candidates: [], given: true },
      { answer: '8', guess: '', candidates: [], given: false },
      { answer: '7', guess: '', candidates: [], given: true },
      { answer: '3', guess: '', candidates: [], given: false },
      { answer: '5', guess: '', candidates: [], given: true },
      { answer: '2', guess: '', candidates: [], given: false },
      { answer: '1', guess: '', candidates: [], given: true },
      { answer: '4', guess: '', candidates: [], given: true },
      { answer: '9', guess: '', candidates: [], given: true },
    ],
    [
      { answer: '4', guess: '', candidates: [], given: true },
      { answer: '1', guess: '', candidates: [], given: false },
      { answer: '9', guess: '', candidates: [], given: false },
      { answer: '8', guess: '', candidates: [], given: true },
      { answer: '7', guess: '', candidates: [], given: false },
      { answer: '6', guess: '', candidates: [], given: true },
      { answer: '3', guess: '', candidates: [], given: false },
      { answer: '5', guess: '', candidates: [], given: true },
      { answer: '2', guess: '', candidates: [], given: false },
    ],
    [
      { answer: '3', guess: '', candidates: [], given: true },
      { answer: '5', guess: '', candidates: [], given: false },
      { answer: '2', guess: '', candidates: [], given: true },
      { answer: '4', guess: '', candidates: [], given: false },
      { answer: '1', guess: '', candidates: [], given: false },
      { answer: '9', guess: '', candidates: [], given: false },
      { answer: '7', guess: '', candidates: [], given: true },
      { answer: '8', guess: '', candidates: [], given: false },
      { answer: '6', guess: '', candidates: [], given: true },
    ],
    [
      { answer: '1', guess: '', candidates: [], given: true },
      { answer: '7', guess: '', candidates: [], given: false },
      { answer: '8', guess: '', candidates: [], given: false },
      { answer: '2', guess: '', candidates: [], given: true },
      { answer: '4', guess: '', candidates: [], given: false },
      { answer: '3', guess: '', candidates: [], given: true },
      { answer: '6', guess: '', candidates: [], given: false },
      { answer: '9', guess: '', candidates: [], given: true },
      { answer: '5', guess: '', candidates: [], given: false },
    ],
    [
      { answer: '5', guess: '', candidates: [], given: true },
      { answer: '6', guess: '', candidates: [], given: true },
      { answer: '3', guess: '', candidates: [], given: true },
      { answer: '1', guess: '', candidates: [], given: false },
      { answer: '9', guess: '', candidates: [], given: true },
      { answer: '8', guess: '', candidates: [], given: false },
      { answer: '2', guess: '', candidates: [], given: false },
      { answer: '7', guess: '', candidates: [], given: false },
      { answer: '4', guess: '', candidates: [], given: false },
    ],
    [
      { answer: '9', guess: '', candidates: [], given: false },
      { answer: '2', guess: '', candidates: [], given: false },
      { answer: '4', guess: '', candidates: [], given: false },
      { answer: '7', guess: '', candidates: [], given: false },
      { answer: '6', guess: '', candidates: [], given: true },
      { answer: '5', guess: '', candidates: [], given: true },
      { answer: '8', guess: '', candidates: [], given: false },
      { answer: '3', guess: '', candidates: [], given: true },
      { answer: '1', guess: '', candidates: [], given: true },
    ],
  ])

  function getCell(row: number, col: number): BoardCell {
    return board.value[row - 1][col - 1]
  }

  function setCellValue(value: number, row: number, col: number) {
    const cell: BoardCell = getCell(row, col)
    if (cell.given) return

    let setValue: string = value.toString()
    if (value <= 0) {
      setValue = ''
    }

    cell.guess = setValue
  }

  function setCellCandidate(value: number, row: number, col: number) {
    const cell: BoardCell = getCell(row, col)
    if (cell.given) return

    if (value > 0) {
      const idx: number = cell.candidates.indexOf(value)
      if (idx > -1) {
        cell.candidates.splice(idx, 1)
      } else {
        cell.candidates.push(value)
      }
      cell.candidates.sort()
      cell.guess = ''
    } else {
      cell.candidates = []
    }
  }

  function setCellCandidates(value: number[], row: number, col: number) {
    const cell: BoardCell = getCell(row, col)
    if (cell.given) return

    cell.candidates = value
    cell.guess = ''
  }

  return {
    board,
    setCellValue,
    setCellCandidate,
    setCellCandidates,
  }
})
