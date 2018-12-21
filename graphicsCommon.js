function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(x1,y1, x2,y2, thickness, fillColor) {
	canvasContext.strokeStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.line(x1,y1, x2,y2);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX,textY);
}
