class Ball {
    constructor(x, y, radius, color) {
        this.pos = new Vector(x, y);
        this.width = this.height = radius;
        this.color = color;
        this.velocity = new Vector(0.2, -0.2);
        this.mass = 1;
        this.friction = 0.01;
        this.acceleration = new Vector(1, 1);
        this.maxSpeed = 0.2 ;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.pos.x, this.pos.y);
        ctx.beginPath();
        ctx.moveTo(-this.width / 2, -this.height / 2);
        ctx.lineTo(this.width / 2, -this.height / 2);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.lineTo(-this.width / 2, this.height / 2);
        ctx.fill();        
        ctx.closePath();
        
        ctx.restore();
    };

update(dt, paddle, brickArray, w, h, currentGameState) {
    // check for collision with walls
    if (this.pos.x < 0) {
        this.pos.x = 0;
        this.velocity.x = -this.velocity.x;
    }
    if (this.pos.x > w) {
        this.pos.x = w;
        this.velocity.x = -this.velocity.x;
    }
    if (this.pos.y < 0) {
        this.pos.y = 0;
        this.velocity.y = -this.velocity.y;
    }
    if (this.pos.y > h) {
        this.pos.y = h;
        this.velocity.y = -this.velocity.y;
        
    }

    // check for collision with paddle
    let xOverlap = calculateOverlap(paddle.pos.x - paddle.width / 2, paddle.width, this.pos.x - this.width / 2, this.width);
    let yOverlap = calculateOverlap(paddle.pos.y - paddle.height / 2, paddle.height, this.pos.y - this.height / 2, this.height);

    if (xOverlap > 0 && yOverlap > 0) {
        // if there's a collision, push the ball out of the paddle
        if (xOverlap < yOverlap) {
            // push the ball out along the x axis
            if (this.pos.x < paddle.pos.x) {
                this.pos.x -= xOverlap;
            } else {
                this.pos.x += xOverlap;
            }
        } else {
            // push the ball out along the y axis
            if (this.pos.y < paddle.pos.y) {
                this.pos.y -= yOverlap;
            } else {
                this.pos.y += yOverlap;
            }
        }

        // update the ball velocity
        this.velocity = this.velocity.add(paddle.acceleration).multiply(dt);
        this.velocity.y = -this.velocity.y;
        console.log("collision");
    }
    // limit speed
    if (this.velocity.x > this.maxSpeed) {
        this.velocity.x = this.maxSpeed;
    }
    if (this.velocity.x < -this.maxSpeed) {
        this.velocity.x = -this.maxSpeed;
    }
    if (this.velocity.y > this.maxSpeed) {
        this.velocity.y = this.maxSpeed;
    }
    if (this.velocity.y < -this.maxSpeed) {
        this.velocity.y = -this.maxSpeed;
    }
     // check for collision with bricks
    for (let i = 0; i < brickArray.length; i++) {
    let xOverlap = calculateOverlap(brickArray[i].pos.x - brickArray[i].width / 2, brickArray[i].width, this.pos.x - this.width / 2, this.width);
    let yOverlap = calculateOverlap(brickArray[i].pos.y - brickArray[i].height / 2, brickArray[i].height, this.pos.y - this.height / 2, this.height);
    if (xOverlap > 0 && yOverlap > 0) {
        
        this.velocity.y = -this.velocity.y;
        brickArray.splice(i, 1);
        console.log("collision with brick");
        break;
    }
}
    // move the ball
    this.pos = this.pos.add(this.velocity.multiply(dt));
}

    handleCornerCollision(paddle) {
    // calculate the distances from the object's center to the corners of the paddle
        let topLeft = new Vector(paddle.pos.x - (this.width / 2), paddle.pos.y - (this.height / 2));
        let topRight = new Vector(paddle.pos.x + (this.width / 2), paddle.pos.y - (this.height / 2));
        let bottomLeft = new Vector(paddle.pos.x - (this.width / 2), paddle.pos.y + (this.height / 2));
        let bottomRight = new Vector(paddle.pos.x + (this.width / 2), paddle.pos.y + (this.height / 2));
    // find the closest corner
    let closestCorner = Math.min(topLeft, topRight, bottomLeft, bottomRight);

    // determine the reflection angle based on the closest corner
    if (closestCorner == topLeft) {
        this.velocity = this.velocity.reflect(new Vector(-1, 1));
    } else if (closestCorner == topRight) {
        this.velocity = this.velocity.reflect(new Vector(1, 1));
    } else if (closestCorner == bottomLeft) {
        this.velocity = this.velocity.reflect(new Vector(-1, -1));
    } else {
        this.velocity = this.velocity.reflect(new Vector(1, -1));
    }
}
    move(v, dt) {
        this.pos = this.pos.add(v);
    }
}