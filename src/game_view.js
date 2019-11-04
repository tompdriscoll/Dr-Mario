const Game = require("./game");

function GameView() {
  this.game = null;
  this.interval = 1000
}

GameView.MOVES = {
  left: -1,
  down: 8,
  right: 1,
};

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
  key.unbind('space')
  key.unbind('left')
  key.unbind('right')
  key.unbind('down')

  let pill = this.game.currentPill
  Object.keys(GameView.MOVES).forEach(function(k)  {
    const move = GameView.MOVES[k];
    key(k, function () { pill.control(move); });
  });

    key("space", function () { pill.rotate(); });
};

GameView.prototype.start = function start() {
  Array.from(document.getElementsByClassName('toHide')).forEach(ele => ele.classList.toggle('hidden'))
  const grid = document.getElementsByClassName('grid-square-square')
  this.game = new Game(grid);
  setInterval(() => {
    this.bindKeyHandlers();
    this.game.step(); 
  }, this.interval);
};

GameView.prototype.splash = function splash(){ 
  key("space",  this.start.bind(this));
}

module.exports = GameView;
