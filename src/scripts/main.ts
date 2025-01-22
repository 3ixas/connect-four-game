import '../styles/style.scss';

// Selecting the player turn indicator and restart button
const turnIndicator = document.getElementById("turn-indicator")!; // Finds the <p> element with the turn-indicator id & the '!' lets TS know these elements exist and are not null

const restartButton = document.getElementById("restart-btn")!; // Finds the <button> element with the restart-btn id

// Tracking the current player
let currentPlayer = "Player 1";

// Function to update the turn indicator
function updateTurnIndicator(): void { // Declares the function & void means the function does not return anything, just performs the actions below
    turnIndicator.textContent = `${currentPlayer}'s Turn`; // Updated the player indicator with the current player
    turnIndicator.style.color = currentPlayer === "Player 1" ? "#007bff" : "#ffcc00"; // Blue for player 1 and yellow for player 2
}

// Event listener for the restart button
restartButton.addEventListener("click", () => {
    currentPlayer = "Player 1"; // Reset to player 1
    updateTurnIndicator(); // Calls this function to update the turn indicator text and colour
    console.log("Game Restarted!"); // Debug message for now
});

// This should run this function automatically on the page loading
updateTurnIndicator();

// Select the game board element
const gameBoard = document.getElementById("game-board");
if (!gameBoard) {
    throw new Error("Game board element not found");
}

// Create a 2D array to represent the game board (6 rows by 7 columns); each cell starts as empty with null
const board: (null | string) [] [] = Array.from({ length: 6}, () => Array(7).fill(null));

function handleCellClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Ensure the click is on a valid cell
    if (!target.classList.contains("cell")) return;

    // Get the column index from the clicked cell's data attribute
    const col = parseInt(target.dataset.col!); // Use `data-col` directly (1-based)
    console.log("Clicked Column (data-col):", col); // Debugging

    // Find the lowest empty row in the clicked column
    for (let row = board.length - 1; row >= 0; row--) { // Start from the bottom row
        if (board[row][col - 1] === null) { // Subtract 1 for 0-based indexing
            // Update the game board array
            board[row][col - 1] = currentPlayer;

            // Update the DOM (adjust for 1-based `data-row` values in HTML)
            const cell = document.querySelector(`[data-row="${row + 1}"][data-col="${col}"]`);
            console.log(`Checking Row: ${row + 1}, Column: ${col}`); // Debugging
            console.log("Cell Found:", cell); // Debugging
            if (cell) {
                cell.classList.add(currentPlayer === "Player 1" ? "player1" : "player2");
            }

            // Switch to the next player's turn
            currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
            updateTurnIndicator();
            break;
        }
    }
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