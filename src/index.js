
const GameView = require("./game_view")
const Pill = require("./pill")

document.addEventListener("DOMContentLoaded", function () {``
    var vid = document.getElementById("fever");
    vid.volume = 0.0;

    new GameView().splash();
  });
  