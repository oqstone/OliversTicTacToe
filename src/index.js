import "./styles.css";

let paused = 0; // 1 -> game is paused, -> 0 playing...
let activePlayer = null;
changeMark();

main();

// Main
function main() {
  // Initializing
  let board = document.getElementById("board");
  let newGameBtn = document.getElementById("newGame");
  let reload = function() {
    window.location.reload(); // Reload the game when the button is pressed
  };

  board = createBoard(board);
  newGameBtn.addEventListener("click", reload); // Activating the reload button

  // Main "loop"
  checkForClick(board); // Activating the gameboard

  // End of The Game //
  return;
}

// Creating the game board
function createBoard(board) {
  board.innerHTML = ``;
  for (let m = 0; m <= 4; m++) {
    let row = board.insertRow(0);
    for (let n = 0; n <= 4; n++) {
      row.insertCell(0);
    }
  }
  console.log("Game board was created.");
  return board;
}

// Checking for clicks
function checkForClick(board) {
  let clickHandler = function() {
    addMark(this, board);
    changeMark();
  };

  if (board !== undefined && board !== null) {
    for (let i = 0; i < board.rows.length; i++) {
      for (let j = 0; j < board.rows[i].cells.length; j++) {
        board.rows[i].cells[j].addEventListener("click", clickHandler);
      }
    }
  } else {
    alert("Unexpected Error Occurred!");
    return;
  }
}

// Adding a activePlayer
function addMark(cell, board) {
  if (paused === 1) {
    return; // Returning if game is on pause
  }
  paused = 0;

  function continuePlaying() {
    changeMark();
    progressBar(continuePlaying);
    paused = 0;

    return
  }

  progressBar(continuePlaying);

  if (cell.innerHTML !== `X` && cell.innerHTML !== `O`) {
    cell.innerHTML = activePlayer;
    if (activePlayer === `X`) {
      cell.classList.add("x-style");
    } else {
      cell.classList.add("o-style");
    }
    checkWinner(board);
  } else if (cell.innerHTML === activePlayer) {
    alert("You already have a mark on this cell. Try another one!");
  } else {
    alert("Another player has a mark on this cell. Try another one!");
  }
  return
}

// Changing the activePlayer
function changeMark() {
  if (activePlayer === `X`) {
    activePlayer = `O`;
    document.getElementById("radioO").checked = true;
    console.log("Active turn: O");
  } else {
    activePlayer = `X`;
    document.getElementById("radioX").checked = true;
    console.log("Active turn: X");
  }
  return
}

// Creating a progress bar
function progressBar(callback) {
  let bar = document.getElementById("bar");
  let width = 1;
  bar.style.width = 0;
  let id = setInterval(frame, 100);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      return;
    } else {
      width++;
      bar.style.width = width + `%`;
    }
  }

  // Waiting for the progress bar...
  setTimeout(function() {
     callback();
  }, 10000);

  return
}

// Checking for winners
function checkWinner(board) {
  let previous = board.rows[0].cells[0].innerHTML;
  let current = board.rows[0].cells[0].innerHTML;
  let r = 0;
  let c = 0;
  let d = 0;
  let size;
  let winner = null;

  let rows = board.rows.length;
  let columns = board.rows[0].cells.length;

  // Check rows
  for (r = 0; r < rows; r++) {
    previous = board.rows[r].cells[0].innerHTML;
    for (c = 0; c < columns; c++) {
      current = board.rows[r].cells[c].innerHTML;
      if (current === previous && current !== ``) {
        if (c === columns - 1) {
          winner = current;
          endOfTheGame(winner);
        }
        previous = current;
      } else {
        previous = current;
        break;
      }
    }
  }

  // Check columns
  for (c = 0; c < columns; c++) {
    previous = board.rows[0].cells[c].innerHTML;
    for (r = 0; r < rows; r++) {
      current = board.rows[r].cells[c].innerHTML;
      if (current === previous && current !== ``) {
        if (r === rows - 1) {
          winner = current;
          endOfTheGame(winner);
        }
        previous = current;
      } else {
        previous = current;
        break;
      }
    }
  }

  // Check diagonal
  if (columns === rows) {
    size = columns;
  } else {
    alert("Error! Columns and rows doesn't match!");
  }
  previous = board.rows[0].cells[0].innerHTML;
  for (d = 0; d < size; d++) {
    current = board.rows[d].cells[d].innerHTML;
    if (current === previous && current !== ``) {
      if (d === size - 1) {
        winner = current;
        endOfTheGame(winner);
      }
      previous = current;
    } else {
      previous = current;
      break;
    }
  }

  previous = board.rows[0].cells[size - 1].innerHTML;
  for (d = 0; d < size; d++) {
    current = board.rows[d].cells[size - 1 - d].innerHTML;
    if (current === previous && current !== ``) {
      if (d === size - 1) {
        winner = previous;
        endOfTheGame(winner);
      }
      previous = current;
    } else {
      previous = current;
      break;
    }
  }
  return winner;
}

// Ending the game...
function endOfTheGame(winner) {
  let n = `1`;

  if (winner === `O`) {
    n = 2;
  }

  console.log("Player", winner, "won!");
  console.log("End of The Game");

  alert("Player " + n + " won!");
}
