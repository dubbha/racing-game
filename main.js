let lastTimeObstacleCreated = performance.now()
let minPauseBetweenObstacles = 1500
let obstaclesCounter = 0;
const obstacles = []
var canvas = document.getElementById('play-field')
var ctx = canvas.getContext('2d')
const carWidth = 80
const carHeight = 80
canvas.width = 800
canvas.height = 650
const initCarX = canvas.width / 2 - carWidth / 2
const carY = canvas.height - carHeight
let carX = initCarX
const dx = 10
let rightPressed = false
let leftPressed = false
let gameOver = false

var img = new Image()
img.src = 'car.png'

var barrierFirst = new Image()
barrierFirst.src = 'iconfinder_VLC_46933.png'

img.onload = function () {
  ctx.drawImage(img, carX, carY, carWidth, carHeight)
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

// startButton.addEventListener('click', start);

function keyDownHandler (e) {
  // console.log(e)
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true
  }
  else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true
  }
}

function draw (timestamp) {
  if (gameOver) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawObstacles()
  drawCar()
  drawScore()
  detectCollision();

  if (timestamp - lastTimeObstacleCreated > minPauseBetweenObstacles) {
    generateObstacle()
    lastTimeObstacleCreated = timestamp
  }

  if ( obstacles.length && obstacles[0].y > carY + carHeight) {
    obstacles.shift();
    obstaclesCounter++;
    accelerateGame();
  }


  requestAnimationFrame(draw)
}

function drawCar () {
  if (rightPressed) {
    if (carX < canvas.width - carWidth - dx) {
      carX += dx
    }
  }
  if (leftPressed) {
    if (carX > dx) {
      carX -= dx
    }
  }
  ctx.drawImage(img, carX, carY, carWidth, carHeight)
}

let brickX
let brickY = 0
let brickWidth
const brickHeight = 50
const increment = 3

function drawSquare (o) {
  const {x, y, width, height} = o
  ctx.beginPath()
  ctx.rect(x, y, width, height)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
  o.y += increment

}

function generateObstacle () {
  const minWidth = canvas.width * 0.1
  const maxWidth = canvas.width * 0.3
  brickWidth = minWidth + (maxWidth - minWidth) * Math.random()
  brickX = (canvas.width - brickWidth) * Math.random()
  const obstacle = {
    x: brickX,
    y: brickY,
    width: brickWidth,
    height: brickHeight,
  }
  obstacles.push(obstacle)
}

function drawObstacles () {
  obstacles.forEach(drawSquare)
}

generateObstacle()

function keyUpHandler (e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false
  }
  else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false
  }
}

function detectCollision () {
  obstacles.forEach(o => {
    if ((o.x < carX && o.x + o.width > carX && o.y < carY + carHeight && o.y + o.height > carY)
      || (o.x < carX + carWidth && o.x + o.width > carX && o.y < carY + carHeight && o.y + o.height > carY)) {
      endGame()
    }
  })
}

function endGame () {
  gameOver = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#ff0000";
    ctx.fillText(`Game Over. Your score ${obstaclesCounter}`, canvas.width/2 - 250, canvas.height/2);
    obstaclesCounter = 0;

}

function accelerateGame() {
  if (obstaclesCounter % 10 === 0 ) {
    minPauseBetweenObstacles *= 0.9;
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+ obstaclesCounter, 8, 20);
}

draw()

