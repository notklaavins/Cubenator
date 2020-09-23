class Bonus {
  x = random(width);
  y = random(-1000, -2000);
  speed = random(3, 7); 
  size = 100;
  xspeed = random(-5,3);
  
  
  show(isFreeze) {
    if(isFreeze){
    noStroke();
    fill(255,255,255, 0);
    rect(this.x, this.y, this.size, this.size, 5);
    } else {
      image(img, this.x, this.y)
    } 
  }

  collision(ball) {
    if(ball.x <= this.x+this.size && ball.x+ball.size >= this.x && ball.y <= this.y+this.size && ball.y+ball.size >= this.y){
      return true;
    } else {
      return false;
    }
  }

  update(){

  this.x += this.xspeed;
    this.y += this.speed;
    if (this.y > height+this.size){
      this.y = random(-1000, -3000);
      this.x = random(width);
    }
  
    if (this.x > width+this.size){
      this.y = random(-1000, -4000);
      this.x = random(width);
    }
  }
}