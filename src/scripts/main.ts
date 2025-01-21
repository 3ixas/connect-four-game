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