import { Toolbox } from "./toolbox.js";
import { Game } from "./states/game.js";
import { GameOver } from "./states/gameOver.js";
import { TitleScreen } from "./states/titlescreen.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil

let toolbox = new Toolbox();

let game = new Game(canvas, pencil);
let title = new TitleScreen(canvas, pencil);
let gameOver = new GameOver(canvas, pencil);

let state = title;

//game loop
function gameLoop(){
    
    pencil.clearRect(0, 0, canvas.width, canvas.height);

    let command = state.update();

    if(command == "title" ){
        state = title;
    }
    if(command == "gameOver"){
        state = gameOver;
    }
    if(command == "game"){
        state == game;
    }
}
setInterval(gameLoop, 50);

// let counts = [0,0,0];
// for(let i = 0; i < 100; i++) {
//     let randomIndex = getRandomIndex(myFavoriteLetters);
//     counts[randomIndex] += 1;

//     console.log(toolbox.getRandomItem(myFavoriteLetters));
// }

// let shuffled = toolbox.shuffleArray(myFavoriteLetters);
// console.log(shuffled);

// let colors = toolbox.getRandomColor();
// console.log(colors);

//Rectangle Draw

// pencil.fillStyle = colors;
// pencil.fillRect(50,50,100,100);
