import { Player } from "./classes/player.js";
export class Game{
    
    

    canvas;
    pencil;

    constructor(canvas) {

        this.canvas = canvas;
        this.pencil = canvas.getContext("2d");

        console.log("constructor");
        //creates the player characters
        this.player1 = new Player(20, canvas.height/2-40, 20, 50, 5, "w", "s", 1, canvas);
        this.player2 = new Player(canvas.width - 40, canvas.height/2-40, 20, 50, 5, "ArrowUp", "ArrowDown", -1, canvas);
        
        this.bullets = [];
        
        this.setupInputs();
        this.update();

   
    }
    //properly detects player inputs for movement
    setupInputs(){
        console.log("inputs");
        document.addEventListener("keydown", e =>{
            this.player1.handleKeyDown(e.key);
            this.player2.handleKeyDown(e.key);
        });
        document.addEventListener("keyup", e => {
            this.player1.handleKeyUp(e.key);
            this.player2.handleKeyUp(e.key);
        });

        window.addEventListener("keydown", (e) => {
            if (e.key == "d" || e.key == "D"){
                let bullet = this.player1.shoot();
                this.bullets.push(bullet);
            }
            if (e.key == "ArrowLeft"){
                let bullet = this.player2.shoot();
                this.bullets.push(bullet);
            }
        });
    }
    //draws players and such
    update(){
        console.log("In game!");

        this.player1.updateMove();
        this.player2.updateMove();

         this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.player1.draw(this.pencil);
        this.player2.draw(this.pencil);

        this.bullets.forEach(bullet => bullet.draw(this.pencil) & bullet.update());

        this.bullets = this.bullets.filter(bullet => bullet.x > 0 && bullet.x <  this.canvas.width);
    }
}