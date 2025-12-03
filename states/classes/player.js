export class Player{
    constructor(x, y, width, height, speed, upKey, downKey, canvas) {
        this.canvas = canvas;
        //this.pencil = pencil;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.moveUp = false;
        this.moveDown = false;
        this.upKey = upKey;
        this.downKey = downKey;
    }

    updateMove(){
        if (this.moveUp){
            this.y -= this.speed;
        }
        if (this.moveDown){
            this.y += this.speed;
        }
        if(this.y<0){ 
            this.y = 0;
        }
        if (this.y + this.height > this.canvas.height){
            this.y = this.canvas.height - this.height;
        }
    }

    draw(pencil){
        pencil.fillStyle = "black";
        pencil.fillRect(this.x, this.y, this.width, this.height);
    }
    handleKeyDown(key){
        if (key == this.upKey) {
            this.moveUp = true;
            console.log("up");
        }
        if (key == this.downKey) {
            this.moveDown = true;
            console.log("down");
        }
    }
    handleKeyUp(key){
        if (key == this.upKey){
            this.moveUp = false;
        }
        if (key == this.downKey){
            this.moveDown = false;
        }
    }
}