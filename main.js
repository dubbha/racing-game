let lastTimeObstacleCreated = performance.now();
let minPauseBetweenObstacles = 2000;
const obstacles = [];
var canvas = document.getElementById('play-field');
const startButton = document.getElementById('start');
startButton.addEventListener('click', toggleGameState);
var ctx = canvas.getContext('2d');
let play = false;
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

function startGameHandler (e) {
  if (e.keyCode === 13) {
    toggleGameState();
  }
}

function toggleGameState () {
  play = !play;
  if (play) {
    draw();
  }
  else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, carX, carY, carWidth, carHeight);
  }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function draw(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawObstacles();
	if (timestamp - lastTimeObstacleCreated > minPauseBetweenObstacles) {
		generateObstacle();
    lastTimeObstacleCreated = timestamp;
	}
  drawCar();
  if (play) requestAnimationFrame(draw);
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
  ctx.drawImage(img, carX, carY, carWidth, carHeight);
}

let brickX;
let brickY = 0;
let brickWidth;
const brickHeight = 50;
const increment = 3;

function drawSquare(o) {
	const { x, y, width, height} = o;
	ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  o.y += increment;

}

function generateObstacle() {
	const minWidth = canvas.width * 0.1;
  const maxWidth = canvas.width * 0.3;
	brickWidth =  minWidth + (maxWidth - minWidth) * Math.random();
  brickX = (canvas.width - brickWidth) * Math.random();
  const obstacle = {
  	x: brickX,
		y: brickY,
		width: brickWidth,
		height: brickHeight,
	}
  obstacles.push(obstacle);
  if (obstacles.length > 3) {
  	obstacles.shift();
	}
}

function drawObstacles() {
	obstacles.forEach(drawSquare);
}

generateObstacle();


function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// draw();

