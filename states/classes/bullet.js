export class Bullet{
    
    canvas;
    pencil;

    constructor(x, y, direction) {
        this.x = x;
        this.y = y;

        this.width = 6;
        this.height = 4;

        this.speed = 7;
        this.direction = direction;
    }

    update(){
        this.x += this.speed * this.direction;
    }

    draw(pencil){
        pencil.fillStyle = "red";
        pencil.fillRect(this.x, this.y, this.width, this.height);
    }

    offScreen(canvasWidth){
        return this.x < -this.width || this.x > canvasWidth + this.width;
    }
}