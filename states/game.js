import { Player } from "./classes/player.js";
export class Game{
    
    canvas;
    pencil;

    constructor(canvas) {
        this.canvas = canvas;
        this.pencil = canvas.getContext("2d");

        console.log("constructor");
        //creates the player characters
        this.player1 = new Player(20, canvas.height/2-40, 20, 50, 5, "w", "s", canvas);
        this.player2 = new Player(canvas.width - 40, canvas.height/2-40, 20, 50, 5, "ArrowUp", "ArrowDown", canvas);
        this.setupInputs();
        //this.start();
        this.update();
    }
    //properly detects player inputs
    setupInputs(){
        console.log("inputs");
        document.addEventListener("keydown", e =>{
            this.player1.handleKeyDown(e.key);
            this.player2.handleKeyDown(e.key);
        });
        document.addEventListener("keyup", e => {
            this.player1.handleKeyUp(e.key);
            this.player2.handleKeyUp(e.key);
        })
    }
    //draws players and such
    update(){
        console.log("In game!");

        this.player1.updateMove();
        this.player2.updateMove();

         this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.player1.draw(this.pencil);
        this.player2.draw(this.pencil);

    }
}