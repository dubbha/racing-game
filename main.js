let lastTimeObstacleCreated = performance.now();
let minPauseBetweenObstacles = 2000;
const obstacles = [];
var canvas = document.getElementById('play-field');
var ctx = canvas.getContext('2d');

canvas.width = 1300;
canvas.height = 1000;

var img = new Image();

img.src = 'iconfinder_BT_c3top_905662.png';

img.onload = function() {
	ctx.drawImage(img, 80, 80)
}

function draw(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //drawCar();
  drawObstacles();
	if (timestamp - lastTimeObstacleCreated > minPauseBetweenObstacles) {
		generateObstacle();
    lastTimeObstacleCreated = timestamp;
	}
  requestAnimationFrame(draw);
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

draw();