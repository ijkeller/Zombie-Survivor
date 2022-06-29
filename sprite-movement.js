//dimensions of the board.
const boardXSize = 10;
const boardYSize = 10;

let gameBoard = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]];


function checkBounds(x, y)
//returns false if coordinates are outside gameboard bounds
{
  x++;
  y++;
  if (x >= boardXSize || x < 0) {
    return false;
  }
  if (y >= boardYSize || y < 0) {
    return false;
  }
  else {
    return true;
  }
}

function getAdjacent(x, y)
// returns an array that contains x and y positions of the item and the item value;
//format:[x,y,itemValue]
{
  x++;
  y++;
  let foundItem = [0, 0, 0];
  if (checkBounds(x, y) && gameBoard[x + 1][y] !== null || gameBoard[x + 1][y] !== 0) {
    foundItem = [(x + 1), y, gameBoard[x + 1][y]];
    return foundItem;
  }
  if (checkBounds(x, y) && gameBoard[x][y + 1] !== null || gameBoard[x][y + 1] !== 0) {
    foundItem = [x, (y + 1), gameBoard[x][y + 1]];
    return foundItem;
  }
  if (checkBounds(x, y) && gameBoard[x - 1][y] !== null || gameBoard[x - 1][y] !== 0) {
    foundItem = [(x - 1), y, gameBoard[x - 1][y]];
    return foundItem;
  }
  if (checkBounds(x, y) && gameBoard[x][y - 1] !== null || gameBoard[x][y - 1] !== 0) {
    foundItem = [x, (y - 1), gameBoard[x][y - 1]];
    return foundItem;
  }
}

function getInFront(x, y, direction)
//returns item in front of xy coordinates in the direction
{
  x++;
  y++;
  let foundItem = [0, 0, 0];
  switch (direction) {
    case 'n':
    case 'N':
      {
        if (checkBounds(x, y - 1)) {
          foundItem = [x, y - 1, gameBoard[x][y - 1]]
        }
        break;
      }
    case 's':
    case 'S':
      {
        if (checkBounds(x, y + 1)) {
          foundItem = [x, y + 1, gameBoard[x][y + 1]]
        }
        break;
      }
    case 'e':
    case 'E':
      {
        if (checkBounds(x - 1, y)) {
          foundItem = [x - 1, y, gameBoard[x - 1][y]]
        }
        break;
      }
    case 'w':
    case 'W':
      {
        if (checkBounds(x + 1, y)) {
          foundItem = [x + 1, y, gameBoard[x + 1][y]]
        }
        break;
      }
  }
  return foundItem;
}
function clearCell(x,y)
{
  gameBoard[x][y] = 0;
}
function swapCells(x1,y1,x2,y2)
{
  let temp = gameBoard[x1][y1];
  gameBoard[x1][y1] = gameBoard[x2][y2];
  gameBoard[x2][y2] = gameBoard[x1][y1];
}

console.log(getInFront(0, 0, 's'));
console.log(gameBoard);