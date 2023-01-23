class Brick {
    constructor(x, y, w, h, color1, color2) {
        this.pos = new Vector(x, y);
        this.width = w;
        this.height = h;
        this.color1 = color1;
        this.color2 = color2;
    }

    draw(ctx) {
        ctx.save();
        var gradient = ctx.createLinearGradient(-this.width / 2, -this.height / 2, this.width / 2, this.height / 2);
        gradient.addColorStop(0, this.color1);
        gradient.addColorStop(1, this.color2);
        ctx.fillStyle = gradient;
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
}