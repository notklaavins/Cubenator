class Ball {

    x = width / 2;
    y = height / 2;
    size = 32;
    gravity = 1;
    velocity = 0;
    jumpIntensity = 20;
    speed = 5;
    jumpcount = 0;

    show() {
        noStroke();
        fill(255);
        rect(this.x, this.y, this.size, this.size, 5);
    }

    update() {

        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > height - this.size) {
            this.y = height - this.size;
            this.velocity = 0;
            this.jumpcount = 0;
        }

        if (this.x >= width - this.size) {
            this.x = width - this.size;
        }

        if (this.x <= 0) {
            this.x = 0;

        }
    }

    jump() {

        this.jumpcount++;

        if (this.y == height - this.size || this.jumpcount <= 3) { ///// triple jump
            document.getElementById('jump').play();
            this.velocity = 0;
            this.velocity -= this.jumpIntensity;
        }

    }

    left() {

        this.x -= this.speed;

    }

    right() {

        this.x += this.speed;

    }
}