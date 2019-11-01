function GameView(game) {
  this.game = game;
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
  setInterval(() => {
    this.bindKeyHandlers();
    this.game.step(); 
  }, this.interval);
  
};

module.exports = GameView;
