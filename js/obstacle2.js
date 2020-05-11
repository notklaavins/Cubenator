class Obstacle2 {
  sizeX = 20;
  sizeY = random(50, 300);
  x = random(width+100, width+4000);
  y = height-this.sizeY;
  speed = 3; 

  show() {
    noStroke();
    fill(80);
    rect(this.x, this.y, this.sizeX, this.sizeY, 5);

  }

  collision(ball) {
    if(ball.x <= this.x+this.sizeX && ball.x+ball.size >= this.x && ball.y <= this.y+this.sizeY && ball.y+ball.size >= this.y){
      return true;
    } else {
      return false;
    }
  }
  
  update(){
    this.x -= this.speed;
    if (this.x < 0-this.sizeX){
      this.x = random(width+100, width+4000);
    }
  } 
}