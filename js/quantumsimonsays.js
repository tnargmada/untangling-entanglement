import Qubits from './index.js';

var canvas;
var canvasContext;

var centerx, centery;
var center;

var fps = 30;
var radius = 200;
var gameTime = 30;
var highscore = 10000;

var qreg;


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	document.addEventListener('keydown', keyPressed);

  centerx = canvas.width/2;
  centery = canvas.height/2;
  center = [centerx, centery];

	setInterval(function() {
		runGame();
	}, 1000/fps);
}

function keyPressed(evt) {
	//console.log(evt.keyCode);
	if (evt.keyCode == 81) { //Q
		qreg.rotateZ(0, 0.3);
	}
	if (evt.keyCode == 83) { //S
		qreg.hadamard(0);
	}
	if (evt.keyCode == 65) { //A
		qreg.rotateZ(1, 0.3);
	}
	if (evt.keyCode == 87) { //W
		qreg.hadamard(1);
	}
}

function initialize() {
  qreg = new Qubits.Qstate(2);
  qreg.hadamard(Qubits.ALL);
  qreg.controlledZRotation(0, 1, 2*Math.PI);
}

function display(goal) {
  colorRect(0,0, canvas.width,canvas.height, "white");

  for(var i=0; i<4; i++) {
    var hue = qreg.amplitude(i).phase()/2*Math.PI + 0.5;
    var saturation = qreg.amplitude(i).magnitude();
    var value = 1;

    var colorHSV = hsvToRgb(hue, saturation, value);
    var color = rgb(colorHSV[0], colorHSV[1], colorHSV[2]);

    var points;

    if(i == 0) {
        points = [center, [centerx - radius/2, centery - radius/2], [centerx, centery - radius],
                  [centerx + radius/2, centery - radius/2]];
    } if(i == 1) {
        points = [center, [centerx + radius/2, centery - radius/2], [centerx + radius, centery],
                  [centerx + radius/2, centery + radius/2]];
    } if(i == 2) {
        points = [center, [centerx - radius/2, centery + radius/2], [centerx - radius, centery],
                  [centerx - radius/2, centery - radius/2]];
    } if(i == 3) {
        points = [center, [centerx + radius/2, centery + radius/2], [centerx, centery + radius],
                  [centerx - radius/2, centery + radius/2]];
    }

    quad(points, color, false);
  }

  var points;
  if(goal == 0) {
      points = [center, [centerx - radius/2, centery - radius/2], [centerx, centery - radius],
                [centerx + radius/2, centery - radius/2]];
  } if(goal == 1) {
      points = [center, [centerx + radius/2, centery - radius/2], [centerx + radius, centery],
                [centerx + radius/2, centery + radius/2]];
  } if(goal == 2) {
      points = [center, [centerx - radius/2, centery + radius/2], [centerx - radius, centery],
                [centerx - radius/2, centery - radius/2]];
  } if(goal == 3) {
      points = [center, [centerx + radius/2, centery + radius/2], [centerx, centery + radius],
                [centerx - radius/2, centery + radius/2]];
  }
  quad(points, "white", true);

}

function runGame() {
  initialize();
  display(0);
}

function drawLine(startX,startY, endX,endY, color) {
	canvasContext.strokeStyle = color;
	canvasContext.beginPath();
	canvasContext.moveTo(startX,startY);
	canvasContext.lineTo(endX,endY);
	canvasContext.stroke();
}

function quad(points, color, outline) {
  canvasContext.beginPath();
  canvasContext.fillStyle = color;
  canvasContext.strokeStyle = "black";
  canvasContext.strokeWeight = 4;
  canvasContext.moveTo(points[0][0], points[0][1]);
  canvasContext.lineTo(points[1][0], points[1][1]);
  canvasContext.lineTo(points[2][0], points[2][1]);
  canvasContext.lineTo(points[3][0], points[3][1]);
  canvasContext.lineTo(points[4][0], points[4][1]);

  if(outline) {
    canvasContext.stroke();
  } else {
    canvasContext.fill();
  }
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function drawText(text, x,y, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillText(text, x,y);
}

function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}
