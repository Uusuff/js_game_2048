'use strict';

const BOARD_SIZE = 4;
const WIN_TILE = 2048;

function deepClone(arr) {
  return arr.map((item) => (Array.isArray(item) ? deepClone(item) : item));
}

export default class Game {
  constructor() {
    this.board = Array.from({ length: BOARD_SIZE }, () => {
      return Array(BOARD_SIZE).fill(0);
    });

    this.score = 0;
    this.status = 'idle';
  }

  getState() {
    return deepClone(this.board);
  }

  getScore() {
    return this.score;
  }

  getStatus() {
    let hasEmpty = false;
    let hasMoves = false;

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cell = this.board[row][col];

        if (cell === WIN_TILE) {
          return (this.status = 'win');
        }

        if (cell === 0) {
          hasEmpty = true;
        }

        if (
          (col < BOARD_SIZE - 1 && cell === this.board[row][col + 1]) ||
          (row < BOARD_SIZE - 1 && cell === this.board[row + 1][col])
        ) {
          hasMoves = true;
        }
      }
    }

    if (hasEmpty || hasMoves) {
      return (this.status = 'playing');
    }

    return (this.status = 'lose');
  }

  addRandomTile() {
    const emptyCells = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (this.board[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length === 0) {
      return;
    }

    const { row: emptyRow, col: emptyCol } =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    this.board[emptyRow][emptyCol] = Math.random() < 0.9 ? 2 : 4;
    this.newTiles = [{ row: emptyRow, col: emptyCol }];
  }

  shiftAndCombine(arr, rowIndex = null, isCol = false) {
    let filtered = arr.filter((num) => num !== 0);
    const merged = [];

    for (let i = 0; i < filtered.length - 1; i++) {
      if (filtered[i] === filtered[i + 1]) {
        filtered[i] *= 2;
        this.score += filtered[i];
        filtered[i + 1] = 0;

        if (rowIndex !== null) {
          if (isCol) {
            merged.push({ row: i, col: rowIndex });
          } else {
            merged.push({ row: rowIndex, col: i });
          }
        }
      }
    }

    filtered = filtered.filter((num) => num !== 0);

    while (filtered.length < BOARD_SIZE) {
      filtered.push(0);
    }

    this.mergedTiles = (this.mergedTiles || []).concat(merged);

    return filtered;
  }

  move(direction) {
    if (this.status === 'idle') {
      return;
    }

    let changed = false;
    const board = deepClone(this.board);

    this.newTiles = [];
    this.mergedTiles = [];

    const getCol = (col) => this.board.map((row) => row[col]);
    const setCol = (colIndex, newCol) =>
      newCol.forEach((val, row) => (this.board[row][colIndex] = val));

    for (let i = 0; i < BOARD_SIZE; i++) {
      let line;

      switch (direction) {
        case 'left':
          line = this.board[i];
          line = this.shiftAndCombine(line, i, false);
          this.board[i] = line;
          break;
        case 'right':
          line = [...this.board[i]].reverse();
          line = this.shiftAndCombine(line, i, false).reverse();
          this.board[i] = line;
          break;
        case 'up':
          line = getCol(i);
          line = this.shiftAndCombine(line, i, true);
          setCol(i, line);
          break;
        case 'down':
          line = getCol(i).reverse();
          line = this.shiftAndCombine(line, i, true).reverse();
          setCol(i, line);
          break;
      }

      if (!changed && board[i].join() !== this.board[i].join()) {
        changed = true;
      }
    }

    if (changed) {
      this.addRandomTile();
    }
  }

  start() {
    this.board = Array.from({ length: BOARD_SIZE }, () => {
      return Array(BOARD_SIZE).fill(0);
    });
    this.score = 0;
    this.status = 'playing';
    this.addRandomTile();
    this.addRandomTile();
  }

  restart() {
    this.board = Array.from({ length: BOARD_SIZE }, () => {
      return Array(BOARD_SIZE).fill(0);
    });
    this.score = 0;
    this.status = 'idle';
  }
}
