export class TitleScreen{

    canvas;
    pencil;

    constructor(canvas, pencil){
        this.canvas = canvas;
        this.pencil = pencil;
    }

    update(){
        console.log("In Title!");
        this.pencil.font = "20x Georgia";
        this.pencil.fillText("Text", 10, 50);

        return "gameOver";
    }
}