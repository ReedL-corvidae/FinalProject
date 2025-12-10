export class GameOver{
    
    canvas;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.winner = "";
    }

    setWinner(who){
        this.winner = who;
    }

    update(){
        console.log("Game over");

        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText(this.winner + " wins!", 200, 200);
    }
}