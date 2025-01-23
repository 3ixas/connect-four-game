import '../styles/style.scss';

// Setting a global variable for the game being over with the gameOver flag
let gameOver = false;

// Selecting the player turn indicator and restart button
const turnIndicator = document.getElementById("turn-indicator")!; // Finds the <p> element with the turn-indicator id & the '!' lets TS know these elements exist and are not null

// Tracking the current player
let currentPlayer = "Player 1";

// Function to update the turn indicator
// Declares the function & void means the function does not return anything, just performs the actions below
function updateTurnIndicator(): void {
    const turnIndicator = document.getElementById("turn-indicator");
    if (!turnIndicator) return;

    if (currentPlayer === "Player 1") {
        turnIndicator.textContent = "Player 1's Turn";
        turnIndicator.classList.add("player1-turn");
        turnIndicator.classList.remove("player2-turn");
    } else {
        turnIndicator.textContent = "Player 2's Turn";
        turnIndicator.classList.add("player2-turn");
        turnIndicator.classList.remove("player1-turn");
    }
}

const restartButton = document.getElementById("restart-btn"); // Assume this is the button's ID

restartButton?.addEventListener("click", () => {
    console.log("Restarting the game..."); // Debugging
    gameOver = false;

    // Reset the board array
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            board[row][col] = null;
        }
    }
    console.log("Game board array reset:", board); // Debugging

    // Reset the DOM grid
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("player1", "player2", "winning-cell");
    });
    console.log("Visual board reset."); // Debugging

    // Reset current player to Player 1
    currentPlayer = "Player 1";
    updateTurnIndicator();
    console.log("Player reset to Player 1."); // Debugging
});


// Select the game board element
const gameBoard = document.getElementById("game-board");
if (!gameBoard) {
    throw new Error("Game board element not found");
}

// Create a 2D array to represent the game board (6 rows by 7 columns); each cell starts as empty with null
const board: (null | string) [] [] = Array.from({ length: 6}, () => Array(7).fill(null));

function handleCellClick(event: MouseEvent): void {

    // Prevent further input if the game is over
    if (gameOver) return;

    const target = (event.target as HTMLElement).closest(".cell") as HTMLElement;
    if (!target) {
        console.error("Click did not hit a valid cell.");
        return;
    }

    const col = parseInt(target.dataset.col!); // Get clicked column
    for (let row = board.length - 1; row >= 0; row--) { // Start from the bottom row
        if (board[row][col - 1] === null) {
            board[row][col - 1] = currentPlayer; // Update the board array

            const cell = document.querySelector(`[data-row="${row + 1}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add(currentPlayer === "Player 1" ? "player1" : "player2");
            }

            // Check for a win
            if (checkWin()) {
                gameOver = true;
                setTimeout(() => {
                    alert(`${currentPlayer} wins!`);
                }, 100); // Delay of 100ms to allow the DOM to update
                return; // Stop further clicks
            }

            // Check for a draw (only if no one has won)
            if (checkDraw()) {
                gameOver = true;
                setTimeout(() => {
                    alert("It's a draw!");
                }, 100);
                return;
            }

            // Switch to the next player's turn
            currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
            updateTurnIndicator();
            break;
        }
    }
}


function checkWin(): boolean {
    // Checking for a horizontal, vertical, and diagonal win
    return checkHorizontal() || checkVertical() || checkDiagonal();
}

function checkHorizontal(): boolean {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length - 3; col++) {
            if (
                board[row][col] !== null &&
                board[row][col] === board[row][col + 1] &&
                board[row][col] === board[row][col + 2] &&
                board[row][col] === board[row][col + 3]
            ) {

                // Highlight the winning cells
                for (let i = 0; i < 4; i++) {
                    const cell = document.querySelector(
                        `[data-row="${row + 1}"][data-col="${col + 1 + i}"]`
                    );
                    cell?.classList.add("winning-cell");
                }
                console.log(`${board[row][col]} wins horizontally!`);
                return true;
            }
        }
    }
    return false;
}

function checkVertical(): boolean {
    for (let col = 0; col < board.length; col++) {
        for (let row = 0; row < board.length - 3; row++) {
            if (
                board[row][col] !== null &&
                board[row][col] === board[row + 1][col] &&
                board[row][col] === board[row + 2][col] &&
                board[row][col] === board[row + 3][col]
            ) {
                // Highlight the winning cells
                for (let i = 0; i < 4; i++) {
                    const cell = document.querySelector(
                        `[data-row="${row + 1 + i}"][data-col="${col + 1}"]`
                    );
                    cell?.classList.add("winning-cell");
                }
                console.log(`${board[row][col]} wins vertically!`);
                return true;
            }
        }
    }
    return false;
}

function checkDiagonal(): boolean {
    // Check for downward-right diagonal
    for (let row = 0; row < board.length - 3; row++) {
        for (let col = 0; col < board[row].length - 3; col++) {
            if (
                board[row][col] !== null &&
                board[row][col] === board[row + 1][col + 1] &&
                board[row][col] === board[row + 2][col + 2] &&
                board[row][col] === board[row + 3][col + 3]
            ) {
                // Highlight the winning cells
                for (let i = 0; i < 4; i++) {
                    const cell = document.querySelector(
                        `[data-row="${row + 1 + i}"][data-col="${col + 1 + i}"]`
                    );
                    cell?.classList.add("winning-cell");
                }
                console.log(`${board[row][col]} wins diagonally (down-right)!`);
                return true;
            }
        }
    }

    // Check for upward-right diagonal 
    for (let row = 3; row < board.length; row++) {
        for (let col = 0; col < board[row].length - 3; col++) {
            if (
                board[row][col] !== null &&
                board[row][col] === board[row - 1][col + 1] &&
                board[row][col] === board[row - 2][col + 2] &&
                board[row][col] === board[row - 3][col + 3]
            ) {
                // Highlight the winning cells
                for (let i = 0; i < 4; i++) {
                    const cell = document.querySelector(
                        `[data-row="${row + 1 - i}"][data-col="${col + 1 + i}"]`
                    );
                    cell?.classList.add("winning-cell");
                }

                console.log(`${board[row][col]} wins diagonally (up-right)!`);
                return true;
            }
        }
    }

    return false;
}

function checkDraw(): boolean {

    // Check if any cell in the board is still empty (null)
    for(let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === null) {
                return false; // Meaning the board is not full
            }
        }
    }
    return true; // Meaning the board is full
}


// Add click listeners to each cell
function setupCellListeners(): void {
    const cells = document.querySelectorAll<HTMLDivElement>(".cell");
    cells.forEach(cell => {
        cell.addEventListener("click", (event) => handleCellClick(event as MouseEvent));
    });
}

// Initialise the game board
setupCellListeners();