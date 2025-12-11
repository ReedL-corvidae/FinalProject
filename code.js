import { Game } from "./states/game.js";
import { GameOver } from "./states/gameOver.js";
import { Title } from "./states/titlescreen.js";
import { Bullet } from "./states/classes/bullet.js";
import { Player } from "./states/classes/player.js";
import { Toolbox } from "./toolbox.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

//make some states to go to.
let game = new Game(canvas, pencil);
let gameOver = new GameOver(canvas, pencil);
let title = new Title(canvas, pencil);

let state = title;

function gameLoop() {

    pencil.clearRect(0,0, canvas.width, canvas.height);

    let command = state.update();

    if(command == "title") {
        state = title;
    }
    if(command == "gameOver") {
        gameOver.setWinner(game.winner);
        state = gameOver;
    }
    if(command == "game") {
        state = game;
    }

}

setInterval(gameLoop, 1000 / 60);


//things to note that I WOULD fix if I had the time.

//charging.gif not working.
//An error with button detection escaping out of its designated state leading to various errors such as auto restarting, broken health tracking, etc.
//That weird little stutter when restarting the game
//Being able to double shoot if shooting within the first few seconds
//Optimising the big bullet so it didnt just call for two at once.
//Overall optimisation and messy coding
