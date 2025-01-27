# Connect Four Game Break Down

This document explains the logic and thought process behind the HTML, SCSS, and TypeScript code used to create the Connect Four game. The goal is to provide clear documentation of how the game was built from start to finish, making it easier to understand, maintain, or enhance the code in the future.

## HTML Structure

**Overview**

The HTML serves as the skeleton for the Connect Four game. It includes the layout for the game board, controls, and supporting sections (e.g., the header and footer). The structure ensures that the DOM elements required for the game logic and styling are in place.

**Key Elements**

- <div id="connect-four">: The main container for all game elements.

- This groups the header, game board, controls, and footer into one cohesive block.

**Header Section**

- <header>: Contains the game title and a brief description.

- <h1 class="header__title">: Displays "Connect Four".

- <p class="header__description">: Explains the objective of the game.

**Game Board Section**

- <main class="game">: Acts as the container for the interactive game board.

- <div id="game-board">: Dynamically represents the 6x7 Connect Four grid.

- The grid is pre-defined in the HTML using <div> elements for rows and cells.

- data-row and data-col: Used to identify each cell’s position for game logic.

**Controls Section**

- Player Turn Indicator (<div id="player-info">): Displays the current player’s turn.

- Restart Button (<button id="restart-btn">): Allows players to reset the game.

**Footer Section**

- Includes a simple credit line for the creator.

**Dynamic Content**

- The HTML is kept minimal since much of the functionality (e.g. checking for wins, dynamic cell classes) is handled through TypeScript.

## SCSS Styling

**Overview**

- The SCSS defines the visual appearance of the game, implementing a responsive and aesthetically pleasing design. A mobile-first approach ensures compatibility across devices.

**Key Sections**

**Body and Global Styles**

- Sets a gradient background (linear-gradient) with a polished colour palette.

- Uses flexbox to centre-align elements and ensure responsive behaviour.

**Header**

- Styled with bold, white text and subtle shadows for better readability.

- The description text uses an italicised font for a more polished look.

**Game Board**

- The game board grid is styled using CSS grid properties (grid-template-rows and grid-template-columns).

- Each cell is styled as a circular slot with consistent spacing (gap) and a hover effect.

- A border and shadow are applied to the entire board for a 3D effect, making it look like a real game board.

**Controls**

- The player turn indicator uses colours to differentiate between Player 1 (red) and Player 2 (yellow).

- The restart button is styled with a hover and active state to provide feedback.

**Modal**

- A modal is used to display win or draw messages, styled with a centred layout and a subtle background overlay.

**Responsive Design**

- Media queries adjust font sizes, grid dimensions, and spacing for tablets and desktops.

## TypeScript Logic

**Overview**

- The TypeScript code manages the game’s interactivity, including player turns, win detection, and resetting the game.

**Key Functionalities**

**Global Variables**

- gameOver: Tracks whether the game is over to prevent further moves.

- currentPlayer: Keeps track of the active player ("Player 1" or "Player 2").

- board: A 2D array representing the game grid (6 rows by 7 columns).

**Turn Management**

- The updateTurnIndicator function dynamically updates the displayed player turn based on currentPlayer.

**Cell Interaction**

- The handleCellClick function handles player moves when a cell is clicked:

    - Identifies the column of the clicked cell.

    - Updates the board array and DOM with the current player’s move.

    - Checks for a win or draw.

    - Switches the turn to the next player.

**Win and Draw Detection**

- checkWin Function:

    - Combines horizontal, vertical, and diagonal checks to determine if a player has won.

    - Highlights the winning cells using a CSS class.

- checkDraw Function:

    - Checks if all cells are filled without a winner.

**Restart Functionality:**

- Resets the game state, including the board array and DOM elements, when the restart button is clicked.

**Hover Effects:**

- The updateHoverEffect function dynamically applies hover classes to empty cells in the column of the hovered cell.

**Modal Handling:**

- The showModal function displays a modal with a custom win or draw message and allows players to dismiss it.

**Event Listeners**

- Event listeners are added to cells, the restart button, and the modal close button to handle user interactions.

**Error Handling**

- Ensures that required DOM elements (e.g., the game board) are present before executing logic.

- Uses TypeScript’s strict typing to minimise runtime errors.

## Development Workflow

**Step-by-Step Build Process**

**HTML Layout:**

- Define the structure of the game board and controls.

**SCSS Styling:**

- Style the game board, cells, and controls for a polished look.

- Implement responsive design for tablets and desktops.

**TypeScript Logic:**

- Develop the game logic for player turns, win detection, and resetting the game.

- Add hover effects and modals for interactivity.

**Testing and Debugging:**

- Test the game on different screen sizes and devices.

- Debug issues with event listeners and game logic.

**Optimisation:**

- Refactor code for readability and maintainability.

- Add detailed comments to document the functionality.

**Deployment:**

- Host the game on GitHub Pages using Vite.