
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

ctx.drawImage(img, 370, 590);

draw();

