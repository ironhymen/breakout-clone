class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = "green";
        ctx.fillStyle = "none";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.lineTo((this.x + 10), (this.y + 10))
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

  // Method for adding two vectors
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  // Method for subtracting two vectors
  sub(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  // Method for finding the dot product of two vectors
  dot(v) {
    return this.x * v.x + this.y * v.y;
    }
    
    multiply(s) {
        return new Vector(this.x * s, this.y * s);
    }

  // Method for finding the length of the vector
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  // Method for normalizing the vector
  normalize() {
      const len = this.length();
      if (len === 0) {
          return new Vector(0, 0);
        }
    return new Vector(this.x / len, this.y / len);
    }

    normal() {
        return new Vector(-this.y, this.x);
    }
    
    rotate(angle) {
        return new Vector(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
    }

    angle() {
        return Math.atan2(this.y, this.x);
    }

    reflect(normal) {
        return this.sub(normal.multiply(2 * this.dot(normal)))
    }

    getQuadrant() {
        if (this.x >= 0 && this.y <= 0) {
            return 1;
        } else if (this.x <= 0 && this.y <= 0) {
            return 2;
        } else if (this.x <= 0 && this.y >= 0) {
            return 3;
        } else if (this.x >= 0 && this.y >= 0) {
            return 4;
        } else {
            return 0;
        }
    }

    static distance(vector1, vector2) {
        let dx = vector1.x - vector2.x;
        let dy = vector1.y - vector2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

}

class Point {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.moveTo(0, 0);
        ctx.fillStyle = "chocolate";
        ctx.arc(0, 0, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

  // Method for moving the point by a given vector
  move(v) {
    this.pos = this.pos.add(v);
  }

  // Method for finding the distance between two points
  distanceTo(p) {
    return this.pos.subtract(p.pos).length();
  }
}

class Line {
  constructor(p1, p2) {
    this.start = p1;
    this.end = p2;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.start.pos.x, this.start.pos.y)
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo((this.end.pos.x - this.start.pos.x), (this.end.pos.y - this.start.pos.y));
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

  // Method for finding the length of the line
  length() {
    return this.start.distanceTo(this.end);
    }
    
    rotate(angle) {
        this.end.pos.x = this.start.pos.x + this.length() * Math.cos(angle);
        this.end.pos.y = this.start.pos.y + this.length() * Math.sin(angle);
    }

  // Method for finding the slope of the line
  slope() {
    return (this.end.pos.y - this.start.pos.y) / (this.end.pos.x - this.start.pos.x);
  }

  // Method for finding the y-intercept of the line
  yIntercept() {
    return this.start.pos.y - this.slope() * this.start.pos.x;
  }

  // Method for finding the intersection point of two lines
  intersection(l) {
    const x = (l.yIntercept() - this.yIntercept()) / (this.slope() - l.slope());
    const y = this.slope() * x + this.yIntercept();
    return new Point(x, y);
  }
}

