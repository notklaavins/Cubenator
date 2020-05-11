class Obstacle {
  x = random(width);
  y = random(-50, -3000);
  speed = random(3, 7); 
  size = random(10, 70);
  xspeed = random(-5,3);
  
  
  show() {
    noStroke();
    fill(random(0,255),random(0,255),random(0,255));
    rect(this.x, this.y, this.size, this.size, 5);
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
      this.y = random(-100, -3000);
      this.x = random(width);
    }
	
	if (this.x > width+this.size){
      this.y = random(-100, -3000);
      this.x = random(width);
    }
  }
}
