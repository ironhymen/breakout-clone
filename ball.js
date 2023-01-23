class Ball {
    constructor(x, y, radius, color) {
        this.pos = new Vector(x, y);
        this.width = this.height = radius;
        this.color = color;
        this.velocity = new Vector(0, 0);
        this.mass = 1;
        this.friction = 0.01;
        this.acceleration = new Vector(0, 0);
        this.maxSpeed = 0.5;
        this.restitution = 0.9;
        this.desiredVelocity = new Vector(0, 0);
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
        if (aabbCollisionDetection(this.pos, this.width, this.height, paddle.pos, paddle.width, paddle.height)) {
            console.log("collision");
            // find position of collision on paddle
            var collisionPointX = this.pos.x - paddle.pos.x;
            var collisionPointY = this.pos.y - paddle.pos.y;
            // normalize x position to be between -1 and 1
            collisionPointX = collisionPointX / (paddle.width / 2);
            // normalize y position to be between -1 and 1
            collisionPointY = collisionPointY / (paddle.height / 2);
            // calculate angle of collision
            var angle = Math.atan2(collisionPointY, collisionPointX);
            // calculate new velocity
            this.velocity.x = this.maxSpeed * Math.cos(angle);
            this.velocity.y = this.maxSpeed * Math.sin(angle);

        }

        // check for collision with bricks
        for (var i = 0; i < brickArray.length; i++) {
            if (aabbCollisionDetection(this.pos, this.width, this.height, brickArray[i].pos, brickArray[i].width, brickArray[i].height)) {
                // find position of collision on brick
                var collisionPointX = this.pos.x - brickArray[i].pos.x;
                var collisionPointY = this.pos.y - brickArray[i].pos.y;
                // normalize x position to be between -1 and 1
                collisionPointX = collisionPointX / (brickArray[i].width / 2);
                // normalize y position to be between -1 and 1
                collisionPointY = collisionPointY / (brickArray[i].height / 2);
                // calculate angle of collision
                var angle = Math.atan2(collisionPointY, collisionPointX);
                // calculate new velocity
                this.velocity.x = this.maxSpeed * Math.cos(angle);
                this.velocity.y = this.maxSpeed * Math.sin(angle);
                // remove brick from array
                brickArray.splice(i, 1);
            }
        }
    }
    move(dt) {
       
        this.pos = this.pos.add(this.velocity.multiply(dt));
}
}