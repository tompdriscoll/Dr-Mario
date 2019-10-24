const Virus = require("./virus")
const Pill = require("./pill");


function Game(grid) {
  this.pills = [];
  this.viruses = [];
  this.currentPill = null
  this.addPill()
  this.ships = [];
  this.addViruses()
  this.grid = grid
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600; 
Game.FPS = 2;
Game.NUM_VIRUSES = 10;

Game.prototype.add = function add(object) {
  if (object instanceof Pill) {
    this.pills.push(object);
  } 
  else if (object instanceof Virus) {
    this.viruses.push(object);
  } 
  else {
    throw new Error("unknown type of object");
  }
};

Game.prototype.addViruses = function addViruses() {
  
  for (let i = 0; i < Game.NUM_VIRUSES; i++) {
    this.add(new Virus({ game: this }));
  }
};

Game.prototype.addPill = function addPill() {
  let pill = new Pill({
    game: this
  });
  this.currentPill = pill
  this.add(pill);
  return pill;

}; 

Game.prototype.allObjects = function allObjects() {
  return [].concat(this.pills, this.viruses);
};

Game.prototype.checkCollisions = function checkCollisions() {
  let check1 = this.currentPill.idx1 + 8
  let check2  = this.currentPill.idx2 + 8
  if (check1 >= 128 || check2 >= 128){
    this.currentPill.collided = true
    this.addPill()
    return false
  }
  else if (this.grid[check1].classList.length > 1 && (check1 !== this.currentPill.idx2)) {
    this.currentPill.collided = true
    this.addPill()
    return false
  }
  else if (this.grid[check2].classList.length > 1 && (check2 !== this.currentPill.idx1)) {
    this.currentPill.collided = true
    this.addPill()
    return false
  }
  return true
};

Game.prototype.checkMove = function checkMove(move) {

  let pill = this.currentPill
  if (move[0] === 20){
    if (pill.idx1%8 === 7 || pill.idx2%8 === 7 ){
      return false
    }
    else if (pill.idx1+1 !== pill.idx2 && this.grid[pill.idx1 +1].classList.length > 1){
      return false
    }
    else if (pill.idx2+1 !== pill.idx1 && this.grid[pill.idx2 +1].classList.length > 1){
      return false
    } 
  }    
  else if (move[0] === -20){
    if (pill.idx1%8 === 0 || pill.idx2%8 === 0 ){
      return false
    }
    else if (pill.idx1-1 !== pill.idx2 && this.grid[pill.idx1 -1].classList.length > 1){
      return false
    }
    else if (pill.idx2-1 !== pill.idx1 && this.grid[pill.idx2 -1].classList.length > 1){
      return false
    } 
  }
  else if (move[0] === 0 && !this.checkCollisions()){
    return false
  } 
  return true
}

Game.prototype.checkRotate = function checkRotate() {
  let pill = this.currentPill
  if (this.currentPill.horizontal) {
    let less = pill.idx1 > pill.idx2 ? pill.idx2 : pill.idx1
    if (this.grid[less-8] && this.grid[less - 8].classList.length > 1){
      return false
    }
    return true
  }
  else{
    let greater = pill.idx1 < pill.idx2 ? pill.idx2 : pill.idx1
    if ((greater+1)%8 === 0 || this.grid[greater + 1].classList.length > 1){
      return false
    }
    return true
  }
}

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
   
  this.allObjects().forEach(function(object) {
    object.draw(ctx);
  });
};

Game.prototype.checkRemove = function checkRemove(idx1, idx2){
  if(this.currentPill.horizontal){
    this.inefhorizontalCheck(idx1)
    this.inefVerticalCheck(idx1)
    this.inefVerticalCheck(idx2)
  } 
  else{
    this.inefhorizontalCheck(idx1)
    this.inefhorizontalCheck(idx2)
    this.inefVerticalCheck(idx1)
  }
}

Game.prototype.inefhorizontalCheck = function inefhorizontalCheck(idx) {
  let start1 = (idx - (idx%8))
  let streak = []
  let color = null
  for (i=start1; i<start1+8; i++){
    if (this.grid[i].classList.length > 1){
      color = color ? color : this.grid[i].classList[this.grid[i].classList.length-1]
      if (this.grid[i].classList[this.grid[i].classList.length-1] === color){
        streak.push(i)
      }
      else {
        if (streak.length >= 4){
          this.remove(streak, color)                      
        }
        streak =[]  
        color = this.grid[i].classList[this.grid[i].classList.length-1]
        streak.push(i)
      }
    }
    else {
      if (streak.length >= 4){
        this.remove(streak, color)                      
      }
      streak =[] 
      color = null
    }
  }
  if (streak.length >= 4){
    this.remove(streak, color)                      
  }
};

Game.prototype.inefVerticalCheck = function inefVerticalCheck(idx) {
  let start1 = (idx%8)
  let streak = []
  let color = null
  for (i=start1; i<127; i += 8){
    if (this.grid[i].classList.length > 1){
      color = color ? color : this.grid[i].classList[this.grid[i].classList.length-1]
      if (this.grid[i].classList[this.grid[i].classList.length-1] === color){
        streak.push(i)
      }
      else {
        if (streak.length >= 4){
          this.remove(streak, color)                      
        }
        streak =[]  
        color = this.grid[i].classList[this.grid[i].classList.length-1]
        streak.push(i)
      }
    }
    else {
      if (streak.length >= 4){
        this.remove(streak, color)                      
      }
      streak =[] 
      color = null
    }
  }
  if (streak.length >= 4){
    this.remove(streak, color)                      
  }
};

Game.prototype.moveObjects = function moveObjects(delta) {
  this.currentPill.move()
 
};

Game.prototype.randomPosition = function randomPosition() {
  return [
    Game.DIM_X * Math.random(),
    Game.DIM_Y * Math.random()
  ];
};

Game.prototype.remove = function remove(arr) {
  arr.forEach(idx => {
    this.grid[idx].classList.toggle('cornflowerblue', false)
    this.grid[idx].classList.toggle('virus', false)
    this.grid[idx].classList.toggle('salmon', false)
    this.grid[idx].classList.toggle('bisque', false)
  })
};

Game.prototype.step = function step(delta) {
  
  this.moveObjects(delta);

};



module.exports = Game;
