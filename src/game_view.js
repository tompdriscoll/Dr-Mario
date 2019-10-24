function GameView(game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.interval = 1000
}

GameView.MOVES = {
  left: [-20, 0],
  down: [0, 20],
  right: [20, 0],
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
  this.lastTime = 0;
  // start the animation
  setInterval(() => {
    this.bindKeyHandlers();
    this.game.step();
    this.game.draw(this.ctx); 
  }, this.interval);
  requestAnimationFrame(this.animate.bind(this));
  
};

GameView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;

  this.game.draw(this.ctx);
  // setInterval(() => {
  //   this.bindKeyHandlers();
  //   this.game.step();
  // }, this.interval);
  // every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
