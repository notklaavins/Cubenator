var ball;
var score = 0;
var obstCount = 50;
var obst2Count = 5;
let obst = [];
let obst2 = [];
var bonus = [];
var obstSpeed;
let bg;
var originalSpeed = [];
var originalSpeedX = [];
let button;
var highscore = localStorage.getItem("highscoreKey");
var toggleMusicVolume = localStorage.getItem("musicKey");
var isFreeze;
var countDown = 10;

function preload() {
  img = loadImage('https://i.postimg.cc/Nj2yJrWn/Webp-net-resizeimage.png');
}

function setup() {

	if(!navigator.cookieEnabled){
		alert("Whoops! Seems like cookies are disabled. \nCubenator requires cookies in order to save highscore.");
      	window.location.reload();
	}

	if( (screen.availHeight || screen.height-30) >= window.innerHeight) {

      alert("\nPlease use fullscreen mode (F11), then press OK \n \n How to play: \n Spacebar to jump (triple jump is available)" + 
      "\n Arrows to move left and right \n Enter to restart, DEL to reset highscore");
      window.location.reload();
      
    }
    if(toggleMusicVolume == null){
    	document.getElementById('song').volume = 0.01;
    }else{
		document.getElementById('song').volume = toggleMusicVolume;
	}

	button = createButton('Music ON/OFF');
  	button.position(47, 140);
  	button.style("border-radius:8px");
  	button.style("cursor:pointer");
  	button.style("font-family:Arial");
  	button.style("outline:none");
  	button.mousePressed(toggleMute);

	bg = loadImage('https://i.postimg.cc/9MkSmKQ1/istockphoto-947174826-612x612.png');
	bg5g = loadImage('https://i.postimg.cc/1Rdt2rDK/5g-wave.png');

    frameRate(60);
    background(20);
    createCanvas(windowWidth, windowHeight - 100);
    
    ball = new Ball();
    bonus = new Bonus();
    milzis = new Obstacle();

    for (let i = 0; i < obstCount; i++) {
        obst[i] = new Obstacle();
        originalSpeed[i] = obst[i].speed;
        originalSpeedX[i] = obst[i].xspeed;
    }

    for (let i = 0; i < obst2Count; i++) {
        obst2[i] = new Obstacle2();
    }

    
}

function draw() {

    background(bg);
    textAlign(CENTER);
    if(isFreeze){
    	background(bg5g);
    	document.getElementById('dialup').volume = 0.7;
    	document.getElementById('dialup').play();
    	fill(255);
    	textSize(36);
    	
		text('Meteors got paralyzed by 5G', width / 2, height / 2 - 200);
		text('- ' + countDown + ' -', width / 2, height / 2 - 150);
    } else {
    	background(bg);
    }

    ball.update();
    ball.show();

    bonus.update();
    bonus.show(isFreeze);

    if (frameCount % 60 == 0) {
        score += 1;
    }
    
    var obstSpeed = map(score, 0, 20, 3, 10, true); // Obstacles speeding up from score 0 to 20, speed 3 to 10. true - within bounds

    

    for (let i = 0; i < obstCount; i++) {

        obst[i].update();
        obst[i].show();

        if(obst[i].collision(ball)) {
            end();
        }

        if(bonus.collision(ball)) {
           isFreeze = true;
        }

        if(isFreeze){
        	obst[i].speed = 0;
           	obst[i].xspeed = 0;
            milzis.speed = 0;
            milzis.xspeed = 0;
        }else{
        	obst[i].speed = originalSpeed[i]; 
           	obst[i].xspeed = originalSpeedX[i];
        }
        
        if(score == 10) {
            milzis.y = -300;
            milzis.x = 300;
            milzis.size = 200;

            if(milzis.y > height + 200) {
                milzis.y = -3000;
            }
        }
    }

    if (frameCount % 60 == 0 && isFreeze) {
        countDown -= 1;
    }

    if(countDown == 0){
    	document.getElementById('dialup').pause();
    	isFreeze = false;
        countDown = 10;
    }

    for (let i = 0; i < obst2Count; i++) {
        obst2[i].update();
        obst2[i].show();

        if (obst2[i].collision(ball)) {
            end();
        }

        obst2[i].speed = obstSpeed;
    }

    if (keyIsDown(LEFT_ARROW)) {
        document.getElementById('song').play();
        ball.left();
    }
    if (keyIsDown(RIGHT_ARROW)) {
        document.getElementById('song').play();
        ball.right();
    }

    fill(255);
    textSize(56);
    text('Score: ' + score, 150, 100);
    textSize(20);
    text('ENTER to restart', 125, 130);
    textSize(20);
}

function keyPressed() {

    if (key == ' ') {
        ball.jump();
    }

    if (keyCode == DELETE) {

    	var answer = window.confirm("Do you really want to reset your highscore? \n(Changes take place after respawn)");

      	if (answer) {
          localStorage.removeItem("highscoreKey");
      	}

    }

    if (keyCode == ENTER) {
        window.location.reload();
    }

    if (keyCode == ESCAPE) {
    	if( (screen.availHeight || screen.height-30) < window.innerHeight) {
      		alert("Exit fullscreen by pressing F11");
      	}
        
    }
}

function end() {
	
	if(score > highscore){
		fill(255, 255, 0);
    	textSize(30);
    	textAlign(CENTER);
		text('!!!NEW HIGHSCORE!!!', width / 2, height / 2 - 45);
		localStorage.setItem("highscoreKey", score);
		highscore = localStorage.getItem("highscoreKey");
	} else if (score == highscore) {
		fill(255, 255, 0);
    	textSize(30);
    	textAlign(CENTER);
		text('HIGHSCORE REPEATED!', width / 2, height / 2 - 45);
	} else if (highscore == null) {
		localStorage.setItem("highscoreKey", 0);
		highscore = localStorage.getItem("highscoreKey");
	}
    document.getElementById('gameover').volume = 1;
    document.getElementById('gameover').play();
    document.getElementById('song').volume = 0;
    document.getElementById('jump').volume = 0;
    document.getElementById('song').pause();
    document.getElementById('dialup').pause();
    noLoop();
    fill(255);
    textSize(24);
    textAlign(CENTER);
    text('GAME OVER', width / 2, height / 2 - 15);
    text('Score: ' + score, width / 2, height / 2 + 15);
    text('Highscore: ' + highscore, width / 2, height / 2 + 45);
}

function toggleMute() {

	if (document.getElementById('song').volume != 0){
		document.getElementById('song').volume = 0;
		localStorage.setItem("musicKey", document.getElementById('song').volume);
	} else {
		document.getElementById('song').volume = 0.1;
		localStorage.setItem("musicKey", document.getElementById('song').volume);
	}
}
