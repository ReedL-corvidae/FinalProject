import { Toolbox } from "./toolbox.js";
import { Game } from "./game.js";
import { GameOver } from "./gameOver.js";
import { TitleScreen } from "./titlescreen.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil

let toolbox = new Toolbox();

let game = new Game();
let titlescreen = new TitleScreen();
let gameOver = new GameOver();

let state = titlescreen;

//game loop
function gameLoop(){
    state.update();
}
setInterval(gameLoop, 50);

// let counts = [0,0,0];
// for(let i = 0; i < 100; i++) {
//     let randomIndex = getRandomIndex(myFavoriteLetters);
//     counts[randomIndex] += 1;

//     console.log(toolbox.getRandomItem(myFavoriteLetters));
// }

let shuffled = toolbox.shuffleArray(myFavoriteLetters);
console.log(shuffled);

let colors = toolbox.getRandomColor();
console.log(colors);

//Rectangle Draw

// pencil.fillStyle = colors;
// pencil.fillRect(50,50,100,100);
