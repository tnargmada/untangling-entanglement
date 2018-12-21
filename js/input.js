const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_A = 65;
const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_ENTER = 13;

var mouseX;
var mouseY;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keyPressed(evt) {
	// console.log("key pressed: " + evt.keyCode);
	if (evt.keyCode == KEY_A) {
		if(player1D != 1){
			player1D = 3;
		}
	}
	if (evt.keyCode == KEY_D) {
		if(player1D != 3) {
			player1D = 1;
		}
	}
	if (evt.keyCode == KEY_W) {
		if(player1D != 2) {
			player1D = 4;
		}
	}
	if (evt.keyCode == KEY_S) {
		if(player1D != 4) {
			player1D = 2;
		}
	}

	if (evt.keyCode == KEY_LEFT_ARROW) {
		if(player2D != 1){
			player2D = 3;
		}
	}
	if (evt.keyCode == KEY_RIGHT_ARROW) {
		if(player2D != 3) {
			player2D = 1;
		}
	}
	if (evt.keyCode == KEY_UP_ARROW) {
		if(player2D != 2) {
			player2D = 4;
		}
	}
	if (evt.keyCode == KEY_DOWN_ARROW) {
		if(player2D != 4) {
			player2D = 2;
		}
	}

	if (evt.keyCode == KEY_ENTER) {
		if(p1Lost || p2Lost) {
			resetGrid();
			p1Lost = false;
			p2Lost = false;
		}
	}
}
