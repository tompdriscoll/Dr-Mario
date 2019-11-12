const GameView = require("./game_view")




document.addEventListener("DOMContentLoaded", function () {
    let fever = document.getElementById('fever')
    let chill = document.getElementById('chill')
    chill.volume = 0.1
    fever.volume = 0.1
    let slider = document.getElementById('level-slider')
    slider.addEventListener( 'input', function () {
      document.getElementById('level-value').textContent =  slider.value
    })
    new GameView().splash();
  });
  