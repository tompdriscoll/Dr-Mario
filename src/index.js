const GameView = require("./game_view")
const Pill = require("./pill")



document.addEventListener("DOMContentLoaded", function () {
    var vid = document.getElementById("fever");
    vid.volume = 0.0;
    document.getElementById('level-slider').addEventListener( "mouseup", function () {
      document.getElementById('level-value').textContent =  document.getElementById('level-slider').value
    })
    new GameView().splash();
  });
  