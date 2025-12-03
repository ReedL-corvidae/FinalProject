export class Player{
    constructor(x, y, width, height, speed, upKey, downKey, canvas) {
        this.canvas = canvas;
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

    //allows movement for the player
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
    //draws the player
    draw(pencil){
        pencil.fillStyle = "black";
        pencil.fillRect(this.x, this.y, this.width, this.height);
    }
    //detects keyinput and acts accordingly
    //key down
    handleKeyDown(key){
        if (key == this.upKey) {
            this.moveUp = true;
        }
        if (key == this.downKey) {
            this.moveDown = true;
        }
    }
    //key up
    handleKeyUp(key){
        if (key == this.upKey){
            this.moveUp = false;
        }
        if (key == this.downKey){
            this.moveDown = false;
        }
    }
}