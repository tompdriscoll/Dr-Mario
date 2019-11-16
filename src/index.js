const GameView = require("./game_view")




document.addEventListener("DOMContentLoaded", function () {
    let fever = document.getElementById('fever')
    let chill = document.getElementById('chill')
    chill.volume = 0.1
    fever.volume = 0.1
    let slider = document.getElementById('level-slider')
    // debugger
    let radio = Array.from(document.getElementsByTagName("input"))
    radio.slice(1, radio.length).forEach(input => {
      input.addEventListener("mousedown", function(event) {
        event.preventDefault()
      })
    })
    slider.addEventListener( 'input', function (event) {
      document.getElementById('level-value').textContent =  slider.value
    })
    new GameView().splash();
  });
  