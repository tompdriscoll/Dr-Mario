const GameView = require("./game_view")
const Pill = require("./pill")



document.addEventListener("DOMContentLoaded", function () {
    var vid = document.getElementById("fever");
    vid.volume = 0.0;
    let slider = document.getElementById('level-slider')
    slider.addEventListener( 'input', function () {
      document.getElementById('level-value').textContent =  slider.value
    })
    new GameView().splash();
  });
  