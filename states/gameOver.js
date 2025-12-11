import { Toolbox } from "../toolbox.js";

export class GameOver{
    
    canvas;
    pencil;
    changeToTitle = false;
    toolbox = new Toolbox();

    restartButtonX = 260;
    restartButtonY = 300;
    restartButtonW = 100;
    restartButtonH = 50;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.winner = "";

        this.endBackground = document.getElementById("endBackground");

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
        //draws background
        this.pencil.drawImage(endBackground, 0, 0, this.canvas.width, this.canvas.height);

        //Win text
        this.pencil.fillStyle = "White";
        this.pencil.font = "40px Georgia";
        this.pencil.fillText(this.winner + " wins!", 185, 200);

        //button and its text
        this.pencil.fillStyle = "Cyan";
        this.pencil.fillRect(
            this.restartButtonX, this.restartButtonY,
            this.restartButtonW, this.restartButtonH
        );

        //button text
        this.pencil.fillStyle = "Blue";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Retry?", 283, 330);

        //reloads page as a sort of restart
        if(this.changeToTitle) {
            console.log("changing title!");
            this.changeToTitle = false; //consume it; so we reset the title screen for next time.
            window.location.reload();
        }
    }
}