
var canvas = document.getElementById('play-field');
var ctx = canvas.getContext('2d');

canvas.width = 1300;
canvas.height = 1000;

var img = new Image();

img.src = 'iconfinder_BT_c3top_905662.png';

img.onload = function() {
	ctx.drawImage(img, 80, 80)
}



