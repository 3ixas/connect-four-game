import '../styles/style.scss'; // Import the SCSS file for styling

// ---------- GAME VARIABLES ----------

// Tracks whether the game is over
let gameOver = false;

// Tracks the current player's turn, starting with Player 1
let currentPlayer = "Player 1";

// Select the turn indicator element, used to display whose turn it is
const turnIndicator = document.getElementById("turn-indicator")!; // The "!" tells TypeScript that the element exists

// Select the restart button element
const restartButton = document.getElementById("restart-btn");

// Select the game board element where the grid is displayed
const gameBoard = document.getElementById("game-board"); // Container for the game grid

// If the game board element is not found, throw an error
if (!gameBoard) {
    throw new Error("Game board element not found");
}

// Create a 6x7 2D array to represent the game board; each cell starts as empty (`null`)
const board: (null | string)[][] = Array.from({ length: 6 }, () => Array(7).fill(null));

// ---------- HELPER FUNCTIONS ----------

//Updates the turn indicator display to show the current player.
function updateTurnIndicator(): void {
    if (!turnIndicator) return; // If the turn indicator is missing, exit the function

    // Update the text and class based on the current player
    turnIndicator.textContent = `${currentPlayer}'s Turn`;
    turnIndicator.className = currentPlayer === "Player 1" ? "player1-turn" : "player2-turn";
}

// Resets the game state, including the board array, player turn, and UI.
function resetGame(): void {
    console.log("Restarting the game..."); // Log for debugging
    gameOver = false; // Reset the game over flag

    // Clear the board array by setting all cells to `null`
    board.forEach(row => row.fill(null));

    // Clear the visual board by removing all player and winning-cell classes
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("player1", "player2", "winning-cell");
    });

    // Reset the current player to Player 1 and update the turn indicator
    currentPlayer = "Player 1";
    updateTurnIndicator();
    console.log("Game reset complete."); // Log for debugging
}

// Displays a modal with a custom message.
function showModal(message: string): void {
    const modal = document.getElementById("result-modal")!; // Select the modal container
    const messageElement = document.getElementById("result-message")!; // Select the message element
    const closeButton = document.getElementById("close-modal-btn")!; // Select the close button

    // Set the message text inside the modal
    messageElement.textContent = message;

    // Show the modal by toggling its visibility classes
    modal.classList.remove("hidden");
    modal.classList.add("show");

    // Add an event listener to close the modal when the close button is clicked
    closeButton.addEventListener("click", () => {
        modal.classList.remove("show");
        modal.classList.add("hidden");
    });
}

// ---------- RESTART EVENT LISTENER ----------

// Add a click event listener to the restart button to reset the game
restartButton?.addEventListener("click", resetGame);

// ---------- GAME LOGIC ----------

// Handles the logic for when a cell is clicked.
function handleCellClick(event: MouseEvent): void {
    if (gameOver) return; // Ignore clicks if the game is over

    // Find the clicked cell element
    const target = (event.target as HTMLElement).closest(".cell") as HTMLElement;
    if (!target) return; // If no valid cell was clicked, exit the function

    // Get the column number of the clicked cell
    const col = parseInt(target.dataset.col!);

    // Loop through rows from bottom to top to find the first empty cell in the column
    for (let row = board.length - 1; row >= 0; row--) {
        if (board[row][col - 1] === null) { // Check if the cell is empty
            board[row][col - 1] = currentPlayer; // Update the board array with the current player

            // Find the corresponding cell in the DOM and add the player's class
            const cell = document.querySelector(`[data-row="${row + 1}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add(currentPlayer === "Player 1" ? "player1" : "player2");
            }

            // Check for a win
            if (checkWin()) {
                gameOver = true; // Set the game over flag
                setTimeout(() => showModal(`🏅 Victory for ${currentPlayer}! What a game! 🎉`), 100); // Show the win message
                return;
            }

            // Check for a draw if no win is detected
            if (checkDraw()) {
                gameOver = true; // Set the game over flag
                setTimeout(() => showModal("😲 It’s a draw! Who will break the tie next time? 🤔"), 100); // Show the draw message
                return;
            }

            // Switch to the next player's turn and update the turn indicator
            currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
            updateTurnIndicator();
            updateHoverEffect(); // Update the hover effect for the new player
            break;
        }
    }
}

// ---------- WIN/LOSS/DRAW CHECKERS ----------

// Checks if there is a win on the board (horizontal, vertical, or diagonal) and returns true if there is a win, false otherwise
function checkWin(): boolean {
    return checkHorizontal() || checkVertical() || checkDiagonal();
}

// Checks for a horizontal win.
function checkHorizontal(): boolean {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col <= board[row].length - 4; col++) {
            if (
                board[row][col] !== null &&
                board[row][col] === board[row][col + 1] &&
                board[row][col] === board[row][col + 2] &&
                board[row][col] === board[row][col + 3]
            ) {
                // Highlight the winning cells
                highlightWinningCells(row, col, "horizontal");
                return true;
            }
        }
    }
    return false;
}

// Checks for a vertical win.
function checkVertical(): boolean {
    for (let col = 0; col < board[0].length; col++) {
        for (let row = 0; row <= board.length - 4; row++) {
            if (
                board[row][col] !== null &&
                board[row][col] === board[row + 1][col] &&
                board[row][col] === board[row + 2][col] &&
                board[row][col] === board[row + 3][col]
            ) {
                // Highlight the winning cells
                highlightWinningCells(row, col, "vertical");
                return true;
            }
        }
    }
    return false;
}

// Checks for a diagonal win.
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

// Checks if the board is full, resulting in a draw and returns true if the board is full, false otherwise
function checkDraw(): boolean {
    return board.every(row => row.every(cell => cell !== null));
}

// ---------- HIGHLIGHT/HOVER EFFECTS ----------

// Highlights the cells that form a winning combination.
function highlightWinningCells(row: number, col: number, direction: "horizontal" | "vertical"): void {
    for (let i = 0; i < 4; i++) {
        const cell = document.querySelector(
            `[data-row="${row + 1 + (direction === "vertical" ? i : 0)}"][data-col="${col + 1 + (direction === "horizontal" ? i : 0)}"]`
        );
        cell?.classList.add("winning-cell");
    }
}

// Adds hover effects to highlight columns for the current player.
function updateHoverEffect(): void {
    // Remove previous hover effects from all cells
    const allCells = document.querySelectorAll(".cell");
    allCells.forEach(cell => cell.classList.remove("hover-player1", "hover-player2"));

    // Add hover effect based on the current player
    allCells.forEach(cell => {
        cell.addEventListener("mouseover", (event) => {
            const target = (event.target as HTMLElement).closest(".cell") as HTMLElement;
            if (!target) return;

            const col = target.dataset.col; // Get the column of the hovered cell
            const columnCells = document.querySelectorAll(`.cell[data-col="${col}"]`);

            columnCells.forEach(columnCell => {
                const row = parseInt((columnCell as HTMLElement).dataset.row!);

                // Check if the cell is empty
                if (board[row - 1][parseInt(col!) - 1] === null) {
                    columnCell.classList.add(
                        currentPlayer === "Player 1" ? "hover-player1" : "hover-player2"
                    );
                }
            });
        });

        cell.addEventListener("mouseout", () => {
            // Remove hover effect when the mouse leaves the column
            allCells.forEach(cell => cell.classList.remove("hover-player1", "hover-player2"));
        });
    });
}

// ---------- INITIAL PAGE INTERACTION SETUP ----------

// Adds click listeners to all cells on the board.
function setupCellListeners(): void {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("click", (event) => handleCellClick(event as MouseEvent));
    });
}
setupCellListeners(); // Globally set cell listeners