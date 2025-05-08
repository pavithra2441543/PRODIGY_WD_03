const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

startGame();

function startGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  statusText.textContent = "Your turn";
}
function cellClicked() {
    const index = this.dataset.index;
  
    if (board[index] !== "" || !running) return;
  
    updateCell(this, index, currentPlayer);
  
    if (checkWinner()) {
      statusText.textContent = `${currentPlayer} wins!`;
      running = false;
    } else if (isDraw()) {
      statusText.textContent = "It's a draw!";
      running = false;
    } else {
      // Switch to AI's turn
      currentPlayer = "O";
      statusText.textContent = "AI's turn";
  
      setTimeout(() => {
        aiMove();
  
        if (checkWinner()) {
          statusText.textContent = "AI wins!";
          running = false;
        } else if (isDraw()) {
          statusText.textContent = "It's a draw!";
          running = false;
        } else {
          currentPlayer = "X";
          statusText.textContent = "Your turn";
        }
      }, 500);
    }
  }
  

function updateCell(cell, index, player) {
  board[index] = player;
  cell.textContent = player;
}

function aiMove() {
  const available = board
    .map((val, idx) => val === "" ? idx : null)
    .filter(val => val !== null);
  const randomIndex = available[Math.floor(Math.random() * available.length)];

  if (randomIndex !== undefined) {
    const cell = cells[randomIndex];
    updateCell(cell, randomIndex, currentPlayer);
  }
}

function checkWinner() {
  return winConditions.some(cond => {
    return cond.every(index => board[index] === currentPlayer);
  });
}

function isDraw() {
  return board.every(cell => cell !== "");
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.textContent = "Your turn";
  cells.forEach(cell => {
    cell.textContent = "";
  });
}