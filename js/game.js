var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var carrot = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

carrot.src = "img/carrot.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

//Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();
var bg_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
bg_audio.src = "audio/bg2.mp3";

var gap = 90;

//При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
	yPos -= 30;
	fly.play();
	bg_audio.play();
}

//Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
//Позиция моркови
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < pipe.length; i++) {
	  ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
	  ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

	  pipe[i].x--;

	  if(pipe[i].x == 100) {
	  	pipe.push({
          x : cvs.width,
          y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
	  	});
	  }

	  if(xPos + carrot.width >= pipe[i].x
	  	&& xPos <= pipe[i].x + pipeUp.width
	  	&& (yPos <= pipe[i].y + pipeUp.height
	  		|| yPos + carrot.height >= pipe[i].y + pipeUp.height + gap) || yPos + carrot.height >= cvs.height - fg.height) {
	  		  location.reload() //перезагрузка страницы 
	  }

	  if(pipe[i].x == 5) {
	  	score++;
	  	score_audio.play();
	  } 
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(carrot, xPos, yPos);

	yPos += grav;

	ctx.fillStyle = "#FFFFFF";
	ctx.font = "20px Verdana";
	ctx.fillText("Score:" + score, 10, cvs.height - 20)
	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;