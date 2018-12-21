var player1X = 5;
var player1Y = 5;
var player1D = 1; //0 for not moving, 1 for right, 2 for down, 3 for left, 4 for up
var p1Lost = false;
var player2X = COLS - 5;
var player2Y = ROWS - 5;
var player2D = 3;
var p2Lost = false;

function movePlayer() {
  if(!p1Lost) {
    var initX = player1X;
    var initY = player1Y;
    if(player1D == 1){
      player1X++;
    } else if(player1D == 2) {
      player1Y++;
    } else if(player1D == 3) {
      player1X--;
    } else if(player1D == 4) {
      player1Y--;
    }
    if(player1X<0 || player1X>=COLS || player1Y<0 || player1Y>=ROWS ||
       grid[colRowToArrayIndex(player1X,player1Y)] == TRAIL1 || grid[colRowToArrayIndex(player1X,player1Y)] == TRAIL2 ||
       grid[colRowToArrayIndex(player1X,player1Y)] == PLAYER2) {
      player1X = initX;
      player1Y = initY;
      lose(1);
    }
    if(player1D != 0) {
      grid[colRowToArrayIndex(initX,initY)] = TRAIL1;
    }
    grid[colRowToArrayIndex(player1X,player1Y)] = PLAYER1;
  }

  if(!p2Lost) {
    var initX = player2X;
    var initY = player2Y;
    if(player2D == 1){
      player2X++;
    } else if(player2D == 2) {
      player2Y++;
    } else if(player2D == 3) {
      player2X--;
    } else if(player2D == 4) {
      player2Y--;
    }
    if(player2X<0 || player2X>=COLS || player2Y<0 || player2Y>=ROWS ||
       grid[colRowToArrayIndex(player2X,player2Y)] == TRAIL2 || grid[colRowToArrayIndex(player2X,player2Y)] == TRAIL1 ||
       grid[colRowToArrayIndex(player2X,player2Y)] == PLAYER1) {
      player2X = initX;
      player2Y = initY;
      lose(2);
    }
    if(player1D != 0) {
      grid[colRowToArrayIndex(initX,initY)] = TRAIL2;
    }
    grid[colRowToArrayIndex(player2X,player2Y)] = PLAYER2;
  }
}

function lose(player) {
  if(player == 1) {
    p1Lost = true;
  } else if(player == 2) {
    p2Lost = true;
  }
}

function resetPlayer() {
  player1X = 5;
  player1Y = 5;
  player1D = 1;
  player2X = COLS - 5;
  player2Y = ROWS - 5;
  player2D = 3;
}
