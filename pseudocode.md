# Pseudocode for Connect Four game

## Initial Setup

-   Initialise a 2D array to represent the 6x7 game board.
-   Set the current player to "Player 1" (which will be the red piece).
-   Display the empty game board in the browser.

## Game Flow

-   While the game is not over:
    -   Display the current player's turn.
    -   Wait for the player to click on a column.
    -   If the column is not full:
        -   Find the lowest available row in the clicked column.
        -   Place the current player's piece in that position.
        -   Update the game board on the screen.
        -   Check for a win condition:
            -   If true - display "Player (1 or 2) Wins!" and end the game.
        -   Check for a draw condition:
            -   If true - display "It's a draw!" and end the game.
        -   If no win condition is confirmed, switch to the other player.
    -   If the column is full:
        -   Display an error message: "Column is full. Try another one."

## Win Condition Logic

-   Define a function to check for a win condition:
    -   Check for four consecutive pieces of the same colour:
        -   Horizontally
        -   Vertically
        -   Diagonally
    -   Return true if a win condition is met - otherwise, return false.

## Draw Condition Logic

-   Define a function to check for a draw:
    -   Check if all cells in the game board are filled and no win condition is met.
    -   Return true if no empty cells remain and no win condition is met - otherwise, return false.

## Restart or Reset

-   When "Restart" button is clicked:
    -   Reset the game board to its initial empty state with no pieces.
    -   Set the current player to "Player 1".
    -   Clear any win or draw messages.

## Mobile-first Design

-   Design the game board to adjust sizes based on screen width.
-   Ensure clickable areas are large enough for mobile users to easily tap.
