import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface BoardCell {
  answer: string
  guess: string
  candidates: number[]
  given: boolean
  isCorrect?: boolean
}

export const useSudokuStore = defineStore('sudoku', () => {
  const solved = ref(false)
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
    ] as BoardCell[],
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
    ] as BoardCell[],
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
    ] as BoardCell[],
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
    ] as BoardCell[],
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
    ] as BoardCell[],
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
    ] as BoardCell[],
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
    ] as BoardCell[],
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
    ] as BoardCell[],
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
    ] as BoardCell[],
  ])

  // Set all given answers to correct
  for (const boardRow in board.value) {
    for (const boardCol in board.value[boardRow]) {
      board.value[boardRow][boardCol].isCorrect = board.value[boardRow][boardCol].given
    }
  }

  function getCell(row: number, col: number): BoardCell {
    return board.value[row - 1][col - 1]
  }

  function checkPuzzle(): boolean {
    for (const boardRow in board.value) {
      for (const boardCol in board.value[boardRow]) {
        if (board.value[boardRow][boardCol].isCorrect === false) {
          return false
        }
      }
    }
    return true
  }

  function numberUsed(checkNumber: number): boolean {
    if (checkNumber < 1) {
      return false
    }

    for (const boardRow in board.value) {
      const rowGuesses: number[] = []
      for (const boardCol in board.value[boardRow]) {
        let cellValue: number = 0
        if (board.value[boardRow][boardCol].given) {
          cellValue = Number(board.value[boardRow][boardCol].answer)
        } else {
          cellValue = Number(board.value[boardRow][boardCol].guess)
        }

        rowGuesses.push(cellValue)
      }

      if (!rowGuesses.includes(checkNumber)) {
        return false
      }
    }
    return true
  }

  function setCellValue(value: number, row: number, col: number) {
    const cell: BoardCell = getCell(row, col)
    if (cell.given) return

    let setValue: string = value.toString()
    if (value <= 0) {
      setValue = ''
    }

    cell.guess = setValue
    cell.isCorrect = cell.guess === cell.answer
    solved.value = checkPuzzle()
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
    solved,
    numberUsed,
    setCellValue,
    setCellCandidate,
    setCellCandidates,
  }
})
