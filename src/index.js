const Game = require("./game");
const GameView = require("./game_view")
const Pill = require("./pill")

document.addEventListener("DOMContentLoaded", function () {``
    var vid = document.getElementById("fever");
    vid.volume = 0.2;
    const canvasEl = document.getElementsByTagName("canvas")[0];
    const grid = document.getElementsByClassName('grid-square-square')
    canvasEl.width = 700
    canvasEl.height = 500
    const game = new Game(grid);
    const ctx = canvasEl.getContext("2d");
    new GameView(game, ctx).start();
  });
  