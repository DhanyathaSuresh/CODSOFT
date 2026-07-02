const HUMAN = "X";
const AI = "O";
const EMPTY = "";

const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const statusTitle = document.getElementById("status-title");
const statusText = document.getElementById("status-text");
const humanScoreText = document.getElementById("human-score");
const drawScoreText = document.getElementById("draw-score");
const aiScoreText = document.getElementById("ai-score");
const newGameButton = document.getElementById("new-game");
const aiStartButton = document.getElementById("ai-start");

let board = Array(9).fill(EMPTY);
let gameOver = false;
let scores = {
  human: 0,
  draw: 0,
  ai: 0
};

function availableMoves(currentBoard) {
  return currentBoard
    .map((cell, index) => cell === EMPTY ? index : null)
    .filter((index) => index !== null);
}

function checkWinner(currentBoard) {
  for (const line of winLines) {
    const [a, b, c] = line;

    if (
      currentBoard[a] !== EMPTY &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[a] === currentBoard[c]
    ) {
      return {
        winner: currentBoard[a],
        line
      };
    }
  }

  if (availableMoves(currentBoard).length === 0) {
    return {
      winner: "Draw",
      line: []
    };
  }

  return null;
}

function minimax(currentBoard, currentPlayer, alpha = -Infinity, beta = Infinity, depth = 0) {
  const result = checkWinner(currentBoard);

  if (result) {
    if (result.winner === AI) return { score: 10 - depth };
    if (result.winner === HUMAN) return { score: depth - 10 };
    return { score: 0 };
  }

  const maximizing = currentPlayer === AI;
  let bestMove = null;
  let bestScore = maximizing ? -Infinity : Infinity;

  for (const move of availableMoves(currentBoard)) {
    currentBoard[move] = currentPlayer;

    const next = minimax(
      currentBoard,
      currentPlayer === AI ? HUMAN : AI,
      alpha,
      beta,
      depth + 1
    );

    currentBoard[move] = EMPTY;

    if (maximizing) {
      if (next.score > bestScore) {
        bestScore = next.score;
        bestMove = move;
      }

      alpha = Math.max(alpha, bestScore);
    } else {
      if (next.score < bestScore) {
        bestScore = next.score;
        bestMove = move;
      }

      beta = Math.min(beta, bestScore);
    }

    if (beta <= alpha) break;
  }

  return {
    score: bestScore,
    move: bestMove
  };
}

function getAiMove() {
  if (availableMoves(board).length === 9) {
    return 4;
  }

  return minimax([...board], AI).move;
}

function updateStatus(title, text) {
  statusTitle.textContent = title;
  statusText.textContent = text;
}

function renderBoard(winningLine = []) {
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
    cell.classList.toggle("x", board[index] === HUMAN);
    cell.classList.toggle("o", board[index] === AI);
    cell.classList.toggle("win", winningLine.includes(index));
    cell.disabled = gameOver || board[index] !== EMPTY;
  });
}

function updateScores() {
  humanScoreText.textContent = scores.human;
  drawScoreText.textContent = scores.draw;
  aiScoreText.textContent = scores.ai;
}

function finishGame(result) {
  gameOver = true;

  if (result.winner === HUMAN) {
    scores.human += 1;
    updateStatus("You Win!", "Great move. You defeated the AI.");
  } else if (result.winner === AI) {
    scores.ai += 1;
    updateStatus("AI Wins!", "The AI found the optimal path.");
  } else {
    scores.draw += 1;
    updateStatus("It's a Draw!", "Perfect play usually ends in a draw.");
  }

  updateScores();
  renderBoard(result.line);
}

function checkGameState() {
  const result = checkWinner(board);

  if (result) {
    finishGame(result);
    return true;
  }

  return false;
}

function aiTurn() {
  if (gameOver) return;

  updateStatus("AI Thinking...", "Minimax is checking the best move.");

  setTimeout(() => {
    const move = getAiMove();

    if (move !== null && move !== undefined) {
      board[move] = AI;
    }

    if (!checkGameState()) {
      updateStatus("Your Turn", "Choose any empty square.");
      renderBoard();
    }
  }, 350);
}

function humanTurn(index) {
  if (gameOver || board[index] !== EMPTY) return;

  board[index] = HUMAN;

  if (!checkGameState()) {
    renderBoard();
    aiTurn();
  }
}

function newGame(aiStarts = false) {
  board = Array(9).fill(EMPTY);
  gameOver = false;

  updateStatus(
    aiStarts ? "AI Starts" : "Your Turn",
    aiStarts ? "The AI will make the first move." : "You are X. Choose any empty square."
  );

  renderBoard();

  if (aiStarts) {
    aiTurn();
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    humanTurn(Number(cell.dataset.index));
  });
});

newGameButton.addEventListener("click", () => newGame(false));
aiStartButton.addEventListener("click", () => newGame(true));

newGame();
