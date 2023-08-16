const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    const updateCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };
    const isFull = () => board.every(cell => cell !== "");

    return { getBoard, updateCell, isFull };
})();

const playerFactory = (name, marker) => ({ name, marker });

const displayController = (() => {
    const gameContainer = document.getElementById("game-board");
    const startButton = document.getElementById("start-button");
    const winnerMessage = document.getElementById("winner-message");
    const winnerText = document.getElementById("winner-text");
    const player1 = playerFactory("Player 1", "X");
    const player2 = playerFactory("Player 2", "O");

    const renderBoard = (board) => {
        gameContainer.innerHTML = "";
        board.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.textContent = cell;
            cellElement.classList.add("cell");
            cellElement.addEventListener("click", () => makeMove(index));
            gameContainer.appendChild(cellElement);
        });
    };

    const makeMove = (index) => {
        if (gameBoard.updateCell(index, currentPlayer.marker)) {
            renderBoard(gameBoard.getBoard());
            if (checkWin(currentPlayer.marker)) {
                displayWinner(currentPlayer.name);
            } else if (gameBoard.isFull()) {
                displayTie();
            } else {
                togglePlayer();
            }
        }
    };

    const togglePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const displayWinner = (winnerName) => {
        winnerText.textContent = `${winnerName} wins!`;
        winnerMessage.classList.remove("hidden");
    };

    const displayTie = () => {
        winnerText.textContent = "It's a tie!";
        winnerMessage.classList.remove("hidden");
    };
    const checkWin = (marker) => {
        const board = gameBoard.getBoard();
    
        // Check rows
        for (let i = 0; i < 9; i += 3) {
            if (board[i] === marker && board[i + 1] === marker && board[i + 2] === marker) {
                return true;
            }
        }
    
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[i] === marker && board[i + 3] === marker && board[i + 6] === marker) {
                return true;
            }
        }
    
        // Check diagonals
        if (board[0] === marker && board[4] === marker && board[8] === marker) {
            return true;
        }
        if (board[2] === marker && board[4] === marker && board[6] === marker) {
            return true;
        }
    
        return false;
    };
    let currentPlayer = player1;

    startButton.addEventListener("click", () => {
        gameBoard.getBoard().fill("");
        renderBoard(gameBoard.getBoard());
        winnerMessage.classList.add("hidden");
        currentPlayer = player1;
        winnerText.textContent = "Player X wins!";
    });

    renderBoard(gameBoard.getBoard());
})();
