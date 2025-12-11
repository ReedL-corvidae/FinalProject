import { Toolbox } from "../toolbox.js";

export class Title {

    canvas;
    pencil;
    changeToGame = false;
    toolbox = new Toolbox();

    startButtonX = 250;
    startButtonY = 200;
    startButtonW = 100;
    startButtonH = 50;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.titleBackground = document.getElementById("titleBackground");

        //bind the function; this becomes something different in the callback
        //"onKeyPressed", otherwise.
        // this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onClicked = this.onClicked.bind(this);
        
        this.update();
        // document.addEventListener("keypress", this.onKeyPressed )
        document.addEventListener("click", this.onClicked);
    }

    // onKeyPressed() {
    //     this.changeToGame = true;
    // }
    
    onClicked(event) {
        let isHitButton = this.toolbox.isWithinRect(
            event.offsetX, event.offsetY, 
            this.startButtonX, this.startButtonY, 
            this.startButtonW, this.startButtonH
        );
        this.changeToGame = isHitButton;
        console.log("WHAT?");
    }

    update() {
        this.pencil.drawImage(titleBackground, 0, 0, this.canvas.width, this.canvas.height);

        this.pencil.fillStyle = "White";
        this.pencil.font = "40px Georgia";
        this.pencil.fillText("SHOOTOUT", 190, 150);

        this.pencil.fillStyle = "cyan";
        this.pencil.fillRect(
            this.startButtonX, this.startButtonY,
            this.startButtonW, this.startButtonH
        );

        this.pencil.fillStyle = "Blue";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("START", 269, 232);

        this.pencil.fillStyle = "White";
        this.pencil.font = "18px Georgia";
        this.pencil.fillText("Player 1 uses w and s to move up and down.", 130, 300);
        this.pencil.fillText("Player 1 uses d to shoot, a to dodge. Hold e to fire a special shot.", 50, 325);

        this.pencil.fillText("Player 2 uses Arrow Up and Arrow Down to move up and down.", 50, 375);
        this.pencil.fillText("Player 2 uses Left Arrow to shoot, Right Arrow to dodge.", 90, 400);
        this.pencil.fillText("Hold / to fire a special shot.", 186, 425);

        if(this.changeToGame) {
            this.changeToGame = false; //consume it; so we reset the title screen for next time.
            return "game";
        }
    }


}