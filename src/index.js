import "./styles.css";

let paused = 1; // 1 -> game is paused, -> 0 playing...
console.log("Pause status:", paused);
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
  let row = document.createElement("div");
  row.className = "row";
  board.appendChild(row);

  for (let i = 1; i <= 25; i++) {
    let column = document.createElement("div");
    column.className = "col custom-col";
    let is = i;
    column.id = "cell" + is.toString();
    row.appendChild(column);
  }

  console.log("Game board was created.");
  return board;
}

// Checking for clicks
function checkForClick(board) {
  let clickHandler = function() {
    addMark(this, board);
  };

  for (let i = 1; i < 25; i++) {
    let is = i;
    is = is.toString();
    let cell = document.getElementById("cell" + is);
    cell.addEventListener("click", clickHandler);
  }
}

// Adding a activePlayer
function addMark(cell, board) {
  if (paused === 1) {
    return; // Returning if game is on pause
  }
  paused = 1;
  console.log("Pause status:", paused);

  if (cell.innerHTML !== `X` && cell.innerHTML !== `O`) {
    cell.innerHTML = activePlayer;
    if (activePlayer === `X`) {
      cell.classList.add("x-style");
    } else {
      cell.classList.add("o-style");
    }
    //checkWinner(board);
  } else if (cell.innerHTML === activePlayer) {
    alert("You already have a mark on this cell. Try another one!");
  } else {
    alert("Another player has a mark on this cell. Try another one!");
  }
  checkWinner(board);
  return;
}

// Changing the activePlayer
function changeMark() {
  function continuePlaying() {
    paused = 0;
    changeMark();
    console.log("Pause status:", paused);

    return;
  }
  progressBar(continuePlaying);
  if (paused === 1) {
    return; // Returning if game is on pause
  }

  if (activePlayer === `X`) {
    activePlayer = `O`;
    document.getElementById("radioO").checked = true;
    console.log("Active turn: O");
  } else {
    activePlayer = `X`;
    document.getElementById("radioX").checked = true;
    console.log("Active turn: X");
  }
  return;
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

  return;
}

// Checking for winners
function checkWinner(board) {
  let previous = document.getElementById("cell1").innerHTML;
  let current = document.getElementById("cell1").innerHTML;
  let r = 0;
  let c = 0;
  let d = 0;
  let winner = null;

  // Check rows
  for (r = 1; r <= 25; r = r + 5) {
    let rs = r;
    rs = rs.toString();
    previous = document.getElementById("cell" + rs).innerHTML;
    for (c = 0; c < 5; c++) {
      let rcs = r + c;
      rcs = rcs.toString();
      current = document.getElementById("cell" + rcs).innerHTML;
      if (current === previous && current !== ``) {
        if (c === 4) {
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
  for (r = 1; r <= 5; r++) {
    let rs = r;
    rs = rs.toString();
    previous = document.getElementById("cell" + rs).innerHTML;
    for (c = 0; c < 25; c = c + 5) {
      let rcs = r + c;
      rcs = rcs.toString();
      current = document.getElementById("cell" + rcs).innerHTML;
      if (current === previous && current !== ``) {
        if (c === 4) {
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
  previous = document.getElementById("cell1").innerHTML;
  for (d = 1; d <= 25; d = d + 6) {
    let ds = d;
    ds = ds.toString();
    current = document.getElementById("cell" + ds).innerHTML;
    if (current === previous && current !== ``) {
      if (d === 25) {
        winner = current;
        endOfTheGame(winner);
      }
      previous = current;
    } else {
      previous = current;
      break;
    }
  }

  previous = document.getElementById("cell1").innerHTML;
  for (d = 5; d <= 21; d = d + 4) {
    let ds = d;
    ds = ds.toString();
    current = document.getElementById("cell" + ds).innerHTML;
    if (current === previous && current !== ``) {
      if (d === 21) {
        winner = current;
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
  paused = 1;

  alert("Player " + n + " won!");
}
