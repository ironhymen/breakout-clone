class Paddle {
    constructor(x, y, width, height, color) {
        this.pos = new Vector(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = new Vector(0, 0);
        this.mass = 1;
        this.friction = 0.99;
        this.acceleration = new Vector(0, 0);
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
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update(inputStates, delta, ball) {
        if (inputStates.mouseButton === 0) {
                // release ball
                if (ball.lockedToPaddle === true) {
                    ball.launch();
                } else {
                    // do nothing
            }

        }
        if (inputStates.isMouseUsed) {
            if (inputStates.mousePos) {
                // move paddle
                var prevPos = this.pos.x;
                var prevVel = this.velocity.x;
                this.pos = new Vector(inputStates.mousePos.x, this.pos.y);
                this.velocity = new Vector((this.pos.x - prevPos) / delta, 0);
                this.acceleration = new Vector((this.velocity.x - prevVel) / delta, 0);                
        }


            
        

        } else {
           if (inputStates.leftThumb && (inputStates.leftThumb.x < -0.05 || inputStates.leftThumb.x > 0.05)) {
               var prevPos = this.pos.x;
               var prevVel = this.velocity.x;
               this.pos.x += inputStates.leftThumb.x * this.key_speed;
               this.velocity = new Vector((this.pos.x - prevPos) / delta, 0);
                this.acceleration = new Vector((this.velocity.x - prevVel) / delta, 0);
                console.log("pos " + this.pos.x);
                console.log("velocity " + this.velocity.x, this.velocity.y);
                console.log("acceleration " + this.acceleration.x, this.acceleration.y);
    
           } else {
    this.velocity = new Vector(0, 0);
           
}
        //     if (inputStates.left) {
        //         var prevPos = this.pos.x;
        //         this.pos.x -= this.key_speed;
        //         this.velocity = new Vector((this.pos.x - prevPos) / delta, 0);
        //         console.log("pos " + this.pos.x);
        //         console.log("velocity " + this.velocity.x, this.velocity.y);

        // }
        //     if (inputStates.right) {
        //         var prevPos = this.pos.x;
        //         this.pos.x += this.key_speed;
        //         this.velocity = new Vector((this.pos.x - prevPos) / delta, 0);
        //         console.log("pos " + this.pos.x);
        //         console.log("velocity " + this.velocity.x, this.velocity.y);

        // }
            if (inputStates.key_left) {
                var prevPos = this.pos.x;
                var prevVel = this.velocity.x;
                this.pos.x -= this.key_speed;
                this.velocity = new Vector((this.pos.x - prevPos) / delta, 0);
                this.acceleration = new Vector((this.velocity.x - prevVel) / delta, 0);
            
        }
            if (inputStates.key_right) {
                var prevPos = this.pos.x;
                var prevVel = this.velocity.x;
                this.pos.x += this.key_speed;
                this.velocity = new Vector((this.pos.x - prevPos) / delta, 0);
                this.acceleration = new Vector((this.velocity.x - prevVel) / delta, 0);


        }
        if (inputStates.key_shift || inputStates.button0Pressed) {
            // release ball
             if (ball.lockedToPaddle === true) {
                    ball.launch();
                } 
        }


        }
        
        if (inputStates.button6Pressed || inputStates.key_shift) {
            if (inputStates.button6Pressed) {
                console.log("Left Bumper Pressed");
            } else {
                console.log("Shift Pressed");
            }
            this.color = 'red';
            this.key_speed = 10;
        } else {
            this.color = 'DarkSlateBlue';
            this.key_speed = 5;
        }

        // check for collisions with ball

        
    }

}