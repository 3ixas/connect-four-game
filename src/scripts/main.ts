import '../styles/style.scss';

// Selecting the player turn indicator and restart button
const turnIndicator = document.getElementById("turn-indicator")!; // Finds the <p> element with the turn-indicator id & the '!' lets TS know these elements exist and are not null

// Tracking the current player
let currentPlayer = "Player 1";

// Function to update the turn indicator
function updateTurnIndicator(): void { // Declares the function & void means the function does not return anything, just performs the actions below
    turnIndicator.textContent = `${currentPlayer}'s Turn`; // Updated the player indicator with the current player
    turnIndicator.style.color = currentPlayer === "Player 1" ? "#007bff" : "#ffcc00"; // Blue for player 1 and yellow for player 2
}

const restartButton = document.getElementById("restart-btn"); // Assume this is the button's ID

restartButton?.addEventListener("click", () => {
    console.log("Restarting the game..."); // Debugging

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
        cell.classList.remove("player1", "player2");
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
    const target = (event.target as HTMLElement).closest(".cell") as HTMLElement;
    if (!target) {
        console.error("Click did not hit a valid cell.");
        return;
    }

    // Debug clicked cell's data attributes
    console.log("Clicked Cell Attributes:", {
        "data-row": target.dataset.row,
        "data-col": target.dataset.col,
    });

    // Parse column index from clicked cell's `data-col` attribute
    const col = parseInt(target.dataset.col!); // 1-based index
    console.log("Clicked Column (data-col):", col);

    // Find the lowest empty row in the clicked column
    for (let row = board.length - 1; row >= 0; row--) { // Start from the bottom row
        if (board[row][col - 1] === null) { // Subtract 1 for 0-based indexing
            // Update the game board array
            board[row][col - 1] = currentPlayer;

            // Query the corresponding DOM element
            const cell = document.querySelector(`[data-row="${row + 1}"][data-col="${col}"]`);
            console.log(`Checking Row: ${row + 1}, Column: ${col}`); // Debugging
            console.log("Cell Found:", cell);

            if (!cell) {
                console.error(`Error: Could not find cell with data-row="${row + 1}" and data-col="${col}"`);
                return;
            }

            // Add class to visually represent the player's piece
            cell.classList.add(currentPlayer === "Player 1" ? "player1" : "player2");

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
                console.log(`${board[row][col]} wins diagonally (up-right)!`);
                return true;
            }
        }
    }

    return false;
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