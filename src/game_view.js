const Game = require("./game");

function GameView() {
  this.game = null;
  this.interval = 1000
  this.grid = document.getElementsByClassName('grid-square-square')
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
  switchScreen()
  this.game = new Game(this.grid); 
  var gameLoop = setInterval(() => {
    this.game.step(); 
    this.bindKeyHandlers();
    if (this.game.winLose) {
      this.clearGrid()
      this.game = null
      clearInterval(gameLoop)
      switchScreen()
      this.splash()
    }
  }, this.interval);
};

GameView.prototype.splash = function splash(){ 
  key("space",  this.start.bind(this));
}

GameView.prototype.clearGrid = function clearGrid(){
  Array.from(this.grid).forEach(ele => {
    ele.classList.toggle('virus', false)
    ele.classList.toggle('cornflowerblue', false)
    ele.classList.toggle('salmon', false)
    ele.classList.toggle('bisque', false)
    ele.classList.toggle('pill', false)
  })
}

function switchScreen(){
  Array.from(document.getElementsByClassName('toHide')).forEach(ele => ele.classList.toggle('hidden'))
  // key.unbind('space')
  // key.unbind('left')
  // key.unbind('right')
  // key.unbind('down')
}

module.exports = GameView;
