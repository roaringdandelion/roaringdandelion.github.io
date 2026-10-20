const levels = {
  easy: { size: 9, mines: 10 },
  medium: { size: 12, mines: 22 },
  hard: { size: 16, mines: 40 }
};

const boardElement = document.querySelector('#board');
const mineCountElement = document.querySelector('#mine-count');
const timerElement = document.querySelector('#timer');
const messageElement = document.querySelector('#message');
const faceElement = document.querySelector('#face');
const resetButton = document.querySelector('#reset-button');
const difficultyElement = document.querySelector('#difficulty');
const healthButton = document.querySelector('#health-button');
const healthStatusElement = document.querySelector('#health-status');
const healthToggle = document.querySelector('#health-toggle');
const scannerButton = document.querySelector('#scanner-button');
const scannerStatusElement = document.querySelector('#scanner-status');
const scannerToggle = document.querySelector('#scanner-toggle');
const resultDialog = document.querySelector('#result-dialog');
const resultTitle = document.querySelector('#result-title');
const resultSummary = document.querySelector('#result-summary');
const resultTime = document.querySelector('#result-time');
const resultBoard = document.querySelector('#result-board');
const dialogRestart = document.querySelector('#dialog-restart');

let state;
let timerId;

function newGame(levelName = difficultyElement.value) {
  const { size, mines } = levels[levelName];
  clearInterval(timerId);
  state = { size, mines, flags: 0, elapsed: 0, started: false, finished: false, scanMode: false, extraLife: true, scannerUsed: false, extraLifeEnabled: healthToggle.checked, scannerEnabled: scannerToggle.checked, cells: [] };
  resultDialog.close();
  timerElement.textContent = '000';
  mineCountElement.textContent = String(mines).padStart(3, '0');
  faceElement.textContent = '●';
  messageElement.textContent = 'Pick a tile to begin.';
  messageElement.className = 'message';
  updatePowerups();
  createEmptyBoard();
}

function createEmptyBoard() {
  boardElement.innerHTML = '';
  boardElement.style.gridTemplateColumns = `repeat(${state.size}, 1fr)`;
  for (let index = 0; index < state.size * state.size; index += 1) {
    const cell = { mine: false, adjacent: 0, revealed: false, flagged: false, scanned: false };
    state.cells.push(cell);
    const element = document.createElement('button');
    element.className = 'cell';
    element.type = 'button';
    element.setAttribute('role', 'gridcell');
    element.setAttribute('aria-label', `Hidden tile ${index + 1}`);
    element.dataset.index = index;
    element.addEventListener('click', () => reveal(index));
    element.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      toggleFlag(index);
    });
    boardElement.appendChild(element);
  }
}

function plantMines(firstIndex) {
  const safeZone = new Set([firstIndex, ...neighbors(firstIndex)]);
  const available = state.cells.map((_, index) => index).filter((index) => !safeZone.has(index));
  for (let index = available.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [available[index], available[randomIndex]] = [available[randomIndex], available[index]];
  }
  available.slice(0, state.mines).forEach((index) => { state.cells[index].mine = true; });
  state.cells.forEach((cell, index) => {
    cell.adjacent = neighbors(index).filter((neighbor) => state.cells[neighbor].mine).length;
  });
}

function reveal(index) {
  if (state.finished || state.cells[index].flagged || state.cells[index].revealed) return;
  if (state.scanMode) {
    scanArea(index);
    return;
  }
  if (!state.started) {
    plantMines(index);
    state.started = true;
    timerId = setInterval(() => {
      state.elapsed += 1;
      timerElement.textContent = String(state.elapsed).padStart(3, '0');
    }, 1000);
    messageElement.textContent = 'Find the clear path.';
  }
  const cell = state.cells[index];
  if (cell.mine) {
    cell.revealed = true;
    renderCell(index, true);
    if (state.extraLifeEnabled && state.extraLife) {
      state.extraLife = false;
      updatePowerups();
      faceElement.textContent = '♥';
      messageElement.textContent = 'Extra life spent. The field gives you one more chance.';
      messageElement.className = 'message saved';
      return;
    }
    finish(false);
    return;
  }
  floodReveal(index);
  renderBoard();
  if (state.cells.every((current) => current.mine || current.revealed)) finish(true);
}

function floodReveal(startIndex) {
  const queue = [startIndex];
  const visited = new Set();
  while (queue.length) {
    const index = queue.shift();
    if (visited.has(index) || state.cells[index].flagged) continue;
    visited.add(index);
    const cell = state.cells[index];
    cell.revealed = true;
    if (cell.adjacent === 0) neighbors(index).forEach((neighbor) => {
      if (!state.cells[neighbor].mine && !visited.has(neighbor)) queue.push(neighbor);
    });
  }
}

function toggleFlag(index) {
  if (state.finished || state.cells[index].revealed) return;
  const cell = state.cells[index];
  if (!cell.flagged && state.flags >= state.mines) return;
  cell.flagged = !cell.flagged;
  state.flags += cell.flagged ? 1 : -1;
  mineCountElement.textContent = String(Math.max(0, state.mines - state.flags)).padStart(3, '0');
  renderCell(index);
}

function scanArea(index) {
  if (!state.scannerEnabled || state.scannerUsed || state.finished || !state.started) return;
  state.scannerUsed = true;
  state.scanMode = false;
  neighbors(index).concat(index).forEach((neighbor) => { state.cells[neighbor].scanned = true; });
  updatePowerups();
  messageElement.textContent = 'Scanner report: the marked 3 × 3 area is now visible.';
  messageElement.className = 'message scan-message';
  renderBoard();
}

function activateScanner() {
  if (!state.scannerEnabled || state.scannerUsed || state.finished) return;
  if (!state.started) {
    messageElement.textContent = 'Reveal your first tile before scanning.';
    return;
  }
  state.scanMode = !state.scanMode;
  scannerButton.classList.toggle('active', state.scanMode);
  messageElement.textContent = state.scanMode ? 'Choose the center of a 3 × 3 scan.' : 'Scanner cancelled.';
  messageElement.className = 'message scan-message';
}

function updatePowerups() {
  healthButton?.classList.toggle('spent', !state.extraLife);
  scannerButton.classList.toggle('spent', state.scannerUsed);
  scannerButton.classList.toggle('active', state.scanMode);
  healthStatusElement.textContent = !state.extraLifeEnabled ? 'Disabled' : state.extraLife ? 'Ready once' : 'Used this game';
  scannerStatusElement.textContent = !state.scannerEnabled ? 'Disabled' : state.scannerUsed ? 'Used this game' : '1 scan available';
  scannerButton.disabled = !state.scannerEnabled || state.scannerUsed;
  healthToggle.checked = state.extraLifeEnabled;
  scannerToggle.checked = state.scannerEnabled;
}

function finish(won) {
  state.finished = true;
  clearInterval(timerId);
  state.cells.forEach((cell, index) => {
    if (won && cell.mine) cell.flagged = true;
    if (!won && cell.mine) cell.revealed = true;
    renderCell(index, !won);
  });
  faceElement.textContent = won ? '✦' : '×';
  messageElement.textContent = won ? `Field cleared in ${state.elapsed}s. Nice work.` : 'A mine got you. Try a new field.';
  messageElement.className = `message ${won ? 'win' : 'lose'}`;
  showResult(won);
}

function showResult(won) {
  resultTitle.textContent = won ? 'Field cleared' : 'Mine triggered';
  resultSummary.textContent = won ? 'You found every mine. Excellent nerve.' : 'The field got the better of you this round.';
  resultTime.textContent = `${String(state.elapsed).padStart(3, '0')}s`;
  resultBoard.textContent = difficultyElement.options[difficultyElement.selectedIndex].text.split(' · ')[0];
  resultDialog.showModal();
}

function renderBoard() { state.cells.forEach((_, index) => renderCell(index)); }

function renderCell(index, showMine = false) {
  const cell = state.cells[index];
  const element = boardElement.children[index];
  element.className = 'cell';
  element.textContent = '';
  delete element.dataset.number;
  if (cell.revealed) {
    element.classList.add('revealed');
    if (cell.mine) {
      element.classList.add(showMine ? 'mine' : 'exploded');
      element.textContent = '✹';
    } else if (cell.adjacent) {
      element.dataset.number = cell.adjacent;
      element.textContent = cell.adjacent;
    }
  } else if (cell.scanned) {
    element.classList.add('scanned');
    if (cell.mine) {
      element.classList.add('scanned-mine');
      element.textContent = '◆';
    } else if (cell.adjacent) {
      element.dataset.number = cell.adjacent;
      element.textContent = cell.adjacent;
    } else {
      element.textContent = '·';
    }
  } else if (cell.flagged) {
    element.classList.add('flagged');
    element.textContent = '⚑';
  }
  element.setAttribute('aria-label', cell.revealed ? (cell.mine ? 'Mine' : `${cell.adjacent} adjacent mines`) : cell.flagged ? 'Flagged tile' : 'Hidden tile');
}

function neighbors(index) {
  const row = Math.floor(index / state.size);
  const column = index % state.size;
  const result = [];
  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
      if (!rowOffset && !columnOffset) continue;
      const nextRow = row + rowOffset;
      const nextColumn = column + columnOffset;
      if (nextRow >= 0 && nextRow < state.size && nextColumn >= 0 && nextColumn < state.size) result.push(nextRow * state.size + nextColumn);
    }
  }
  return result;
}

resetButton.addEventListener('click', () => newGame());
difficultyElement.addEventListener('change', () => newGame());
scannerButton.addEventListener('click', activateScanner);
healthToggle.addEventListener('change', () => {
  state.extraLifeEnabled = healthToggle.checked;
  updatePowerups();
});
scannerToggle.addEventListener('change', () => {
  state.scannerEnabled = scannerToggle.checked;
  if (!state.scannerEnabled) {
    state.scanMode = false;
  }
  updatePowerups();
});
dialogRestart.addEventListener('click', () => newGame());
newGame();
