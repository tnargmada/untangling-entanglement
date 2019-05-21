import Qubits from './index.js';

var canvas;
var canvasContext;

var centerx, centery;
var center;

var fps = 30;
var radius = 150;
var highscore = 10000;

var time = 0;
var goal = 0;

var playing = false;
var won = false;
var lost = false;
var menu = false;

var qreg;


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	document.addEventListener('keydown', keyPressed);

  centerx = canvas.width/2;
  centery = canvas.height/2;
  center = [centerx, centery];

	initialize();

	setInterval(function() {
		runGame();
	}, 1000/fps);
}

function keyPressed(evt) {
	console.log(evt.keyCode);
	if(playing) {
		if (evt.keyCode == 81) { //Q
			qreg = qreg.rotateZ(0, 0.3);
		}
		if (evt.keyCode == 83) { //S
			qreg = qreg.hadamard(0);
		}
		if (evt.keyCode == 65) { //A
			qreg = qreg.rotateZ(1, 0.3);
		}
		if (evt.keyCode == 87) { //W
			qreg = qreg.hadamard(1);
		}
		if (evt.keyCode == 13) { //enter
			qreg = qreg.measure(Qubits.ALL).newState;
			endGame();
		}
		for(var i=0; i<4; i++) {
			//console.log(qreg.amplitude(i)/(2*Math.PI));
			//console.log(qreg.amplitude(i).phase());
		}
	} else {
		if (evt.keyCode == 13) { //enter
			initialize();
		}
	}
}

function initialize() {
  qreg = new Qubits.QState(2);
  qreg = qreg.hadamard(Qubits.ALL);
  qreg = qreg.rotateZ(0, Math.random()*4*Math.PI);
	qreg = qreg.rotateZ(1, Math.random()*4*Math.PI);
	for(var i=0; i<4; i++) {
		console.log(qreg.amplitude(i))
	}

	playing = true;
	lost = false;
	won = false;
	time = 0;
	goal = Math.floor(Math.random()*4);
}

function display(goal) {
  colorRect(0,0, canvas.width,canvas.height, "white");

  for(var i=0; i<4; i++) {
    var hue = qreg.amplitude(i).phase()/(2*Math.PI);
		if(hue < 0) {
			hue += 1;
		}
    var saturation = qreg.amplitude(i).magnitude() * qreg.amplitude(i).magnitude();
    var value = 1;

    var colorHSV = hsvToRgb(hue, saturation, value);
    var color = "rgb(" + colorHSV[0] + "," + colorHSV[1] + "," + colorHSV[2] + ")";

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

	if(won) {
		win();
	}
	if(lost) {
		lose();
	}

}

function runGame() {
  display(goal);
	if(playing) {
		drawText((time/fps).toFixed(1), centerx,100, "black", "60px Futura");
		time++;
	}
}

function endGame() {
	playing = false;
	for(var i=0; i<4; i++) {
		if(qreg.amplitude(i).magnitude() > 0) {
			if(i == goal){
				won = true;
				return;
			}
		}
	}
	lost = true;
}

function win() {
	drawText("YOU WIN! TIME: " + (time/fps).toFixed(1), centerx,100, "black", "40px Futura");
	drawText("PRESS ENTER TO PLAY AGAIN", centerx, 520, "black", "30px Futura");
}

function lose() {
	drawText("YOU LOSE!", centerx,100, "black", "40px Futura");
	drawText("PRESS ENTER TO PLAY AGAIN", centerx, 520, "black", "30px Futura");
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
  canvasContext.lineWidth = 3;
  canvasContext.moveTo(points[0][0], points[0][1]);
  canvasContext.lineTo(points[1][0], points[1][1]);
  canvasContext.lineTo(points[2][0], points[2][1]);
  canvasContext.lineTo(points[3][0], points[3][1]);
  canvasContext.lineTo(points[0][0], points[0][1]);

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

function drawText(text, x,y, color, font) {
	canvasContext.textAlign = "center";
	canvasContext.fillStyle = color;
	canvasContext.font = font;
	canvasContext.fillText(text, x,y);
}

function hsvToRgb(h, s, v) {
	var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}
