var ball;
var score = 0;
var obstCount = 50;
var obst2Count = 5;
let obst = [];
let obst2 = [];
var obstSpeed;
let bg;

function setup() {

	bg = loadImage('https://i.postimg.cc/kMSvVQbV/parallax-dark-space.jpg');

    if( (screen.availHeight || screen.height-30) >= window.innerHeight) {

      alert("\nPlease use fullscreen mode (F11), then press OK \n \n How to play: \n Spacebar to jump (triple jump is available)" + 
      "\n Arrows to move left and right \n Enter to restart");
      window.location.reload();
      

    }
    frameRate(60);
    background(20);
    createCanvas(windowWidth, windowHeight - 100);
    ball = new Ball();

    for (let i = 0; i < obstCount; i++) {
        obst[i] = new Obstacle();
    }

    for (let i = 0; i < obst2Count; i++) {
        obst2[i] = new Obstacle2();
    }

}

function draw() {

    background(bg);
    ball.update();
    ball.show();

    if (frameCount % 60 == 0) {
        score += 1;
    }
    
    var obstSpeed = map(score, 0, 20, 3, 10, true); // Obstacles speeding up from score 0 to 20, speed 3 to 10. true - within bounds

    textSize(56);
    text('Score: ' + score, 50, 100);
    textSize(20);
    text('ENTER to restart', 55, 130);
    textSize(20);

    for (let i = 0; i < obstCount; i++) {

        obst[i].update();
        obst[i].show();

        if (obst[i].collision(ball)) {
            end();
        }
        if (score == 10) {
            obst[1].y = -300;
            obst[1].x = 300;
            obst[1].size = 200;

            if (obst[1].y > height + 200) {

                obst[1].y = -3000;

            }
        }
        //obst[i].speed = obstSpeed;  // Kvadrati lidos vienada atruma (nomainit ari obstacle.js speed uz fixed)

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
}

function keyPressed() {

    if (key == ' ') {
        ball.jump();
    }

    if (keyCode == ENTER) {
        window.location.reload();
    }

    if (keyCode == ESCAPE) {

      var answer = window.confirm("Exit? \n\nMusic: Eric Skiff - Underclocked - Resistor Anthems \nAvailable at http://EricSkiff.com/music" )

      if (answer) {
          window.close()
      }
        
    }
}

function end() {
    document.getElementById('gameover').volume = 0.2;
    document.getElementById('gameover').play();
    document.getElementById('song').volume = 0;
    document.getElementById('jump').volume = 0;
    document.getElementById('song').pause();
      
    noLoop();
    fill(255);
    textSize(24);
    textAlign(CENTER);
    text('GAME OVER', width / 2, height / 2 - 15);
    text('Score: ' + score, width / 2, height / 2 + 15);
}