var canvas, canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 40;
	setInterval(updateAll, 1000/framesPerSecond);

	setupInput();
}

function updateAll() {
	movePlayer();
	drawAll();
}

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height,'black');

	drawGrid();
}
