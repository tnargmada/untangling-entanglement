const GAP = 0;
const COLS = 120;
const ROWS = 80;
const WIDTH = 8;
const EMPTY = 0;
const PLAYER1 = 1;
const TRAIL1 = 2;
const PLAYER2 = 3;
const TRAIL2 = 4;

var grid = new Array(COLS*ROWS);

for(var i=0; i<ROWS; i++) {
	for(var j=0; j<COLS; j++) {
		grid[colRowToArrayIndex(j,i)] = EMPTY;
	}
}

function drawGrid() {
	for(var i=0; i<ROWS; i++) {
		for(var j=0; j<COLS; j++) {
			if(grid[colRowToArrayIndex(j,i)] == PLAYER1) {
				colorRect(j*WIDTH,i*WIDTH, WIDTH-GAP,WIDTH-GAP, "white");
			}
			if(grid[colRowToArrayIndex(j,i)] == TRAIL1) {
				colorRect(j*WIDTH,i*WIDTH, WIDTH-GAP,WIDTH-GAP, "#ffe330");
			}
			if(grid[colRowToArrayIndex(j,i)] == PLAYER2) {
				colorRect(j*WIDTH,i*WIDTH, WIDTH-GAP,WIDTH-GAP, "white");
			}
			if(grid[colRowToArrayIndex(j,i)] == TRAIL2) {
				colorRect(j*WIDTH,i*WIDTH, WIDTH-GAP,WIDTH-GAP, "#3030ff");
			}
		}
	}
}

function colRowToArrayIndex(col, row) {
	return col + COLS * row;
}

function resetGrid() {
	for(var i=0; i<ROWS; i++) {
		for(var j=0; j<COLS; j++) {
			grid[colRowToArrayIndex(j,i)] = EMPTY;
		}
	}
	resetPlayer();
}
