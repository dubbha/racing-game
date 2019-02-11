
var canvas = document.getElementById('play-field');
var ctx = canvas.getContext('2d');
const carWidth = 80;
const carHeight = 80;
canvas.width = 800;
canvas.height = 650;
const initCarX = canvas.width / 2 - carWidth/2;
const carY = canvas.height - carHeight;
let carX = initCarX;
const dx = 10;
let rightPressed = false;
let leftPressed = false;

var img = new Image();
img.src = 'car.png';

var barrierFirst = new Image();
barrierFirst.src = 'iconfinder_VLC_46933.png';

img.onload = function() {
	ctx.drawImage(img, carX, carY, carWidth, carHeight);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
// startButton.addEventListener('click', start);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSquare();
  drawCar();
  ctx.drawImage(img, carX, carY, carWidth, carHeight);
  requestAnimationFrame(draw);
}
function drawCar () {
	if (rightPressed) {
		if (carX < canvas.width - carWidth - dx) {
			carX += dx;
		}
	}
	if (leftPressed) {
		if (carX > dx) {
			carX -= dx;
		}
	}
}

let brickX = 0;
let brickY = 0;
let brickWidth  = 50;
let brickHeight = 50;
let increment = 3;

function drawSquare() {
	ctx.beginPath();
	ctx.rect(brickX, brickY, brickWidth, brickHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	brickY += increment;
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

draw();

