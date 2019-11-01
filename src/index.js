const Game = require("./game");
const GameView = require("./game_view")
const Pill = require("./pill")

document.addEventListener("DOMContentLoaded", function () {``
    var vid = document.getElementById("fever");
    vid.volume = 0.0;
    const grid = document.getElementsByClassName('grid-square-square')
    const game = new Game(grid);
    new GameView(game).start();
  });
  