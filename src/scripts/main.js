'use strict';

import Game from '../modules/Game.class.js';

const game = new Game();
const scoreElement = document.querySelector('.game-score');
const cells = document.querySelectorAll('.field-cell');
const messageStart = document.querySelector('.message-start');
const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');
const startButton = document.querySelector('.button.start');
const restartButton = document.querySelector('.button.restart');

function renderBoard() {
  scoreElement.textContent = game.getScore();

  if (game.status === 'lose') {
    messageLose.classList.remove('hidden');
  }

  if (game.status === 'win') {
    messageWin.classList.remove('hidden');
  }

  game.board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = cells[rowIndex * 4 + colIndex];

      cellElement.textContent = cell !== 0 ? cell : '';
      cellElement.className = 'field-cell';

      if (cell !== 0) {
        cellElement.classList.add(`field-cell--${cell}`);

        if (
          game.newTiles?.some((t) => t.row === rowIndex && t.col === colIndex)
        ) {
          cellElement.classList.add('new');

          cellElement.addEventListener(
            'animationend',
            () => {
              cellElement.classList.remove('new');
            },
            { once: true },
          );
        }

        if (
          game.mergedTiles?.some(
            (t) => t.row === rowIndex && t.col === colIndex,
          )
        ) {
          cellElement.classList.add('merged');

          cellElement.addEventListener(
            'animationend',
            () => {
              cellElement.classList.remove('merged');
            },
            { once: true },
          );
        }
      }
    });
  });
}

startButton.addEventListener('click', () => {
  game.start();
  restartButton.classList.remove('hidden');
  startButton.classList.add('hidden');
  messageStart.classList.add('hidden');
  renderBoard();
});

restartButton.addEventListener('click', () => {
  game.restart();
  restartButton.classList.add('hidden');
  startButton.classList.remove('hidden');
  messageStart.classList.remove('hidden');
  messageLose.classList.add('hidden');
  messageWin.classList.add('hidden');

  renderBoard();
});

document.addEventListener('keydown', (e) => {
  const directions = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down',
  };

  if (directions[e.key]) {
    game.move(directions[e.key]);
    renderBoard();
    game.getStatus();
  }
});
