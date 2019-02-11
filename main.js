
var canvas = document.getElementById('play-field');
var ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 650;

var img = new Image();

img.src = 'car.png';

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSquare();
  requestAnimationFrame(draw);
}

let brickX = 370;
let brickY = 570;
let brickWidth  = 50;
let brickHeight = 50;
let increment = 3;

function drawSquare() {
  ctx.beginPath();
  ctx.drawImage(img, brickX, brickY);
  ctx.closePath();
  brickY -= increment;
}

draw();

