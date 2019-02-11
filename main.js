
var canvas = document.getElementById('play-field');
var ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 1200;

var img = new Image();

img.src = 'car.png';

img.onload = function() {
	ctx.drawImage(img, 80, 80)
}


