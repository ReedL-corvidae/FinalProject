import { Bullet } from "./bullet.js";

export class Player{
    constructor(x, y, width, height, speed, upKey, downKey, direction, canvas) {
        //drawing variables
        this.pencil = canvas.getContext("2d");
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.pencil.imageSmoothingEnabled = false;

        //movement variables
        this.speed = speed;
        this.moveUp = false;
        this.moveDown = false;
        this.upKey = upKey;
        this.downKey = downKey;

        //bullet placement and direction
        this.bulletOffset = 16;
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

        //sprites
        this.playerSprite = document.getElementById("playerIcon");
        this.chargeSprite = document.getElementById("charging");

    }

    //allows movement for the player
    updateMove(){

        if (this.isCharging) {
            this.pencil.drawImage(this.chargeSprite, this.x, this.y, this.width, this.height);
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
        // pencil.fillStyle = "black";
        // pencil.fillRect(this.x, this.y, this.width, this.height);

        //so this is originally meant to be a gif, but I found the squeezed sprite funny so its staying squeezed, i'd fix it if I werent the sole developer.
         if (this.isCharging) {
            this.pencil.drawImage(this.chargeSprite, this.x, this.y, this.width, this.height);
         } else {
            pencil.drawImage(this.playerSprite, this.x, this.y, this.width, this.height);
         }
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
            bulletX = this.x - this.bulletOffset - 10;
        }

        let bulletY = this.y + this.height / 2;

        return new Bullet(bulletX, bulletY, this.direction);
       
    }

    shootMega() {
        let bulletX = this.direction == 1 ? this.x + this.width: this.x - 40;

        let bulletY = this.y + this.height / 2;

        let mega = new Bullet(bulletX, bulletY, this.direction);

        mega.width = 50;
        mega.height = 15;
        mega.speed = 12;

        return mega;
    }

}