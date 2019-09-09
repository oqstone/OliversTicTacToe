import "./styles.css";

main();

// Main
function main() {
  let board = document.getElementById("board");
  let mark = ``;

  board = createBoard(board);
  mark = changeMark(mark);
  checkForClick(board, mark);
}

// Creating game board
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
function checkForClick(board, mark) {
  if (board != null) {
    for (let i = 0; i < board.rows.length; i++) {
      for (let j = 0; j < board.rows[i].cells.length; j++) {
        board.rows[i].cells[j].addEventListener("click", function() {
          mark = addMark(this, board, mark);
        });
      }
    }
  }
}

// Adding a mark
function addMark(cell, board, mark) {
  if (cell.innerHTML !== `X` && cell.innerHTML !== `O`) {
    cell.innerHTML = mark;
    checkWinner(board, mark);
    mark = changeMark(mark);
  } else if (cell.innerHTML === mark) {
    alert("You already have a mark on this cell. Try another one!");
  } else {
    alert("Another player has a mark on this cell. Try another one!");
  }
  return mark;
}

// Changing a mark
function changeMark(mark) {
  if (mark === `X`) {
    mark = `O`;
    document.getElementById("radioO").checked = true;
    console.log("Active turn: O");
  } else {
    mark = `X`;
    document.getElementById("radioX").checked = true;
    console.log("Active turn: X");
  }
  return mark;
}

// Checking for winners
function checkWinner(board, mark) {
  let previous = board.rows[0].cells[0].innerHTML;
  let current = board.rows[0].cells[0].innerHTML;
  let r = 0;
  let c = 0;
  let d = 0;
  let size;
  let winner;

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

function endOfTheGame(winner) {
  console.log(winner, "won!");
  console.log("End of The Game");
  alert("End of The Game");
  let button = document.getElementById("newGame");
  button.innerHTML = `New Game`;
}
