import { Toolbox } from "../toolbox.js";

export class GameOver{
    
    canvas;
    pencil;
    changeToTitle = false;
    toolbox = new Toolbox();

    restartButtonX = 200;
    restartButtonY = 300;
    restartButtonW = 100;
    restartButtonH = 50;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.winner = "";

        this.onClicked = this.onClicked.bind(this);
        
        this.update();

        document.addEventListener("click", this.onClicked);
    }

    onClicked(event) {
        let isHitButton = this.toolbox.isWithinRect(
            event.offsetX, event.offsetY, 
            this.restartButtonX, this.restartButtonY, 
            this.restartButtonW, this.restartButtonH
        );
        this.changeToTitle = isHitButton;
        console.log("changing?");
    }

    setWinner(who){
        this.winner = who;
    }

    update(){
        console.log("Game over");

        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText(this.winner + " wins!", 200, 200);

        this.pencil.fillStyle = "pink";
        this.pencil.fillRect(
            this.restartButtonX, this.restartButtonY,
            this.restartButtonW, this.restartButtonH
        );

        if(this.changeToTitle) {
            console.log("changing title!");
            this.changeToTitle = false; //consume it; so we reset the title screen for next time.
            window.location.reload();
        }
    }
}