import { Bullet } from "./bullet.js";

export class Player{
    constructor(x, y, width, height, speed, upKey, downKey, direction, canvas) {
        //drawing variables
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        //movement variables
        this.speed = speed;
        this.moveUp = false;
        this.moveDown = false;
        this.upKey = upKey;
        this.downKey = downKey;

        //bullet placement and direction
        this.bulletOffset = 12;
        this.direction = direction;

        //Mega bullet things too
        this.isCharging = false;
        this.chargeStartTime = 0;
        this.chargeDuration = 500; //this is 1/2 second

        //health
        this.health = 3;

        //bullet cooldowns
        this.lastShot = 0;
        this.fireCooldown = 300;

        //Dodging things
        this.isDoding = false;
        this.dodgeCooldown = 2000;
        this.lastDodge = 0;
        this.dodgeDistance = 60;

    }

    //allows movement for the player
    updateMove(){

        if (this.isCharging) {
            return;
        }

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

    //adds a dodging function
    dodge(){
        let now = Date.now();

        if(now-this.lastDodge < this.dodgeCooldown) {
            return;
        }

        this.lastDodge = now;
        this.isDodging = true;

        //moves the player a random direction up or down
        let randomDirection = Math.random() < .5 ? -1 : 1;

        this.y += randomDirection * this.dodgeDistance;

        if(this.y < 0) {
            this.y = 0;
        }
        if(this.y + this.height > this.gameHeight) {
            this.y = this.gameHeight - this.height;
        }
            this.isDodging = false;
    }

    shoot(){

        //dynamic cooldown that bases the actual date/time to the last shot and cooldown
        let now = Date.now();

        if(now - this.lastShot < this.fireCooldown){
            return null;
        }

        this.lastShot = now;
    
        //sets the bullet location from the player
        let bulletX;

        if(this.direction == 1){
            bulletX = this.x + this.width + 6;
        } else {
            bulletX = this.x - this.bulletOffset;
        }

        let bulletY = this.y + this.height / 2;

        return new Bullet(bulletX, bulletY, this.direction);
       
    }

    shootMega() {
        let bulletX = this.direction == 1 ? this.x + this.width: this.x - 40;

        let bulletY = this.y + this.height / 2;

        let mega = new Bullet(bulletX, bulletY, this.direction);

        mega.width = 30;
        mega.height = 10;
        mega.speed = 12;

        return mega;
    }

}