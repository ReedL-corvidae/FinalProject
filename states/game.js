import { Player } from "./classes/player.js";
import { Toolbox } from"../toolbox.js";
export class Game{
    
    toolbox = new Toolbox();

    canvas;
    pencil;
    changeToOver = false;

    constructor(canvas) {

        this.canvas = canvas;
        this.pencil = canvas.getContext("2d");
        this.pencil.imageSmoothingEnabled = false;

        console.log("constructor");
        //creates the player characters
        this.player1 = new Player(20, canvas.height/2-40, 60, 55, 5, "w", "s", 1, canvas);
        this.player2 = new Player(canvas.width - 75, canvas.height/2-40, 60, 55, 5, "ArrowUp", "ArrowDown", -1, canvas);
        
        //store thine bullets
        this.bullets = [];

        //sprites
        this.heartSprite = document.getElementById("heart");
        this.background = document.getElementById("gameBackground");

        //makes everything, literally everything work.
        
        this.setupInputs();
        this.update();
   
    }
    //properly detects player inputs for movement
    setupInputs(){
        console.log("inputs");
        document.addEventListener("keydown", e =>{
            this.player1.handleKeyDown(e.key);
            this.player2.handleKeyDown(e.key);

            //shoot bullets

            if (e.key == "d" || e.key == "D"){
                let bullet = this.player1.shoot();

                //prevents NULL from entering into bullet array
                if (bullet) this.bullets.push(bullet);
            }
            if (e.key == "ArrowLeft"){
                let bullet = this.player2.shoot();

                //prevents NULL from entering into bullet array
                if (bullet) this.bullets.push(bullet);
            }

            if(e.key == "a") {
                this.player1.dodge();
            }
            if(e.key == "ArrowRight"){
                this.player2.dodge();
            }

            //mega bullet checking

            if(e.key == "e"){
                if(!this.player1.isCharging){
                    this.player1.isCharging = true;
                    this.player1.chargeStartTime = performance.now();
                }
            } 
            if(e.key == "/"){
                if(!this.player2.isCharging){
                    this.player2.isCharging = true;
                    this.player2.chargeStartTime = performance.now();
                }
            } 
        });
        document.addEventListener("keyup", e => {
            this.player1.handleKeyUp(e.key);
            this.player2.handleKeyUp(e.key);

            //mega bullet

            if(e.key == "e"){
                this.tryMegaShot(this.player1);
            }
            if(e.key == "/"){
                this.tryMegaShot(this.player2);
            }
        });

    }
    //draws players and health and such

    drawHealth() {
        for(let i = 0; i < this.player1.health; i++){
            // this.pencil.fillStyle = "red";
            // this.pencil.fillRect(10 + i * 20, this.canvas.height - 20, 15, 15);
            this.pencil.drawImage(this.heartSprite, 10 + i * 30, this.canvas.height - 35, 30, 30);
        }
        for(let i = 0; i<this.player2.health;i++){
            // this.pencil.fillstyle = "red";
            // this.pencil.fillRect(this.canvas.width - 10 - (i + 1) * 20, this.canvas. height - 20, 15, 15);
            this.pencil.drawImage(this.heartSprite, this.canvas.width - 15 - (i + 1) * 30, this.canvas.height - 35, 30, 30);
        }
    }

    tryMegaShot(player){
        if(!player.isCharging) return;

        player.isCharging = false;

        let heldTime = performance.now() - player.chargeStartTime;

        if (heldTime >= player.chargeDuration){
            let mega = player.shootMega();

            //the lazy way to make it do 2 damage :)
            this.bullets.push(mega);
            this.bullets.push(mega);
        } else {
            //vast nothingness.
        }
    }

    update(){
        console.log("In game!");

        this.player1.updateMove();
        this.player2.updateMove();

         this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);
         this.pencil.drawImage(gameBackground, 0, 0, this.canvas.width, this.canvas.height);

        this.player1.draw(this.pencil);
        this.player2.draw(this.pencil);

        //draws bullets and adjusts bullet array
        this.bullets.forEach(bullet => bullet.draw(this.pencil) & bullet.update());

        this.bullets = this.bullets.filter(bullet => {

        if(this.toolbox.isWithinRect(bullet.x, bullet.y, this.player1.x, this.player1.y, this.player1.width, this.player1.height)){

            console.log("player 1 is hit");
            this.player1.health--;
            console.log(this.player1.health);
            return false;
        }
        if(this.toolbox.isWithinRect(bullet.x, bullet.y, this.player2.x, this.player2.y, this.player2.width, this.player2.height)){
            console.log("player 2 is hit");
            this.player2.health--;
            console.log(this.player2.health);
            return false;
        }

        return true;
    });

    //Checks if player's health is below or equal to 0, if it is, it changes the changeToGame to true

    if(this.player1.health <=0 || this.player2.health <= 0) {
        this.changeToOver = true;
    }
    //changes the screen to the game over screen.
    if(this.changeToOver) {
            this.changeToOver = false; //consume it; so we reset the title screen for next time.

            if(this.player1.health <= 0){
                this.winner = "Player 2";
            } else { 
                this.winner = "Player 1";
            }

            return "gameOver";
        }

    //Draws both player's health
     this.drawHealth();
    }
}