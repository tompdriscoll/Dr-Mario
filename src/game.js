const Virus = require("./virus")
const Pill = require("./pill");
const Floater = require("./floater")

function Game(grid, level) {
  this.pills = [];
  this.viruses = [];
  this.floaters = [];
  this.toRemove = null;
  this.currentPill = null
  this.level = level
  this.virusCount = this.level * 4
  this.grid = grid
  this.addPill()
  this.addViruses()
  this.win = false
  this.lose = false
  this.score = 0
}

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
  for (let i = 0; i < this.virusCount; i++) {
    this.add(new Virus({ game: this }));
  }
};

Game.prototype.addPill = function addPill() {
  // if (this.grid[3].classList.length > 1) return this.gameOver();
  let pill = new Pill({
    game: this
  });
  this.currentPill = pill
  // this.bindKeyHandlers()
  if (!this.checkCollisions()) return this.gameOver()
  this.add(pill);
  // this.bindKeyHandlers()
  return pill;

}; 

Game.prototype.allObjects = function allObjects() {
  return [].concat(this.pills, this.viruses);
};

Game.prototype.checkCollisions = function checkCollisions(pill=this.currentPill) {
  
  if (pill.idx2) {
    let check1 = pill.idx1 + 8
    let check2  = pill.idx2 + 8
    if (check1 >= 128 ||  check2 >= 128) {
      pill.collided = true
      this.toRemove = this.checkRemove(pill.idx1).concat(this.checkRemove(pill.idx2))   
      this.currentPill = null
      return false
    }
    else if (this.grid[check1].classList.length > 1 && (check1 !== pill.idx2)){
      pill.collided = true
      this.toRemove = this.checkRemove(pill.idx1).concat(this.checkRemove(pill.idx2))    
      this.currentPill = null
      return false
    }
    else if(this.grid[check2].classList.length > 1 && (check2 !== pill.idx1)){
      pill.collided = true
      this.toRemove = this.checkRemove(pill.idx1).concat(this.checkRemove(pill.idx2))  
      this.currentPill = null
      return false
    }
  } else if (pill.idx1) {
    let check1 = pill.idx1 + 8
    if (check1 >= 128 || this.grid[check1].classList.length > 1){
      pill.collided = true
      this.toRemove = this.checkRemove(pill.idx1)
      return false
    }
  }
  pill.collided = false
  return true
};

Game.prototype.checkMove = function checkMove(move) {
  let idx1 = this.currentPill.idx1
  let idx2 = this.currentPill.idx2
  if (move === 1){
    if (idx1%8 === 7 ||
       idx2%8 === 7 ||
      (idx1+1 !== idx2 && this.grid[idx1 +1].classList.length > 1) ||
      (idx2+1 !== idx1 && this.grid[idx2 +1].classList.length > 1)){
      return false
    } 
  }    
  else if (move === -1){
    if (idx1%8 === 0 || 
      idx2%8 === 0  ||
      (idx1-1 !== idx2 && this.grid[idx1 -1].classList.length > 1) ||
      (idx2-1 !== idx1 && this.grid[idx2 -1].classList.length > 1)){
      return false} 
  }
  else if (move === 8){
    if (idx1+8 > 127 || 
      idx2+8 > 127  ||
      (idx1+8 !== idx2 && this.grid[idx1 +8].classList.length > 1) ||
      (idx2+8 !== idx1 && this.grid[idx2 +8].classList.length > 1)){
      return false} 
  } 
  return true
}

Game.prototype.checkRotate = function checkRotate() {
  let pill = this.currentPill
  if (pill.idx1 < 8) return false;
  if (this.currentPill.horizontal) {
    let less = pill.idx1 > pill.idx2 ? pill.idx2 : pill.idx1
    if (this.grid[less-8] && this.grid[less - 8].classList.length > 1){
      return false
    }
  }
  else{
    let greater = pill.idx1 < pill.idx2 ? pill.idx2 : pill.idx1
    if ((greater+1)%8 === 0 || this.grid[greater + 1].classList.length > 1){
      return false
    }
  }
  return true
}

Game.prototype.checkRemove = function checkRemove(idx){
    return this.inefhorizontalCheck(idx).concat(this.inefVerticalCheck(idx))   
}

Game.prototype.inefhorizontalCheck = function inefhorizontalCheck(idx) {
  let start1 = (idx - (idx%8))
  let streak = []
  let toRemove = []
  let color = null
  for (i=start1; i<start1+8; i++){
    if (this.grid[i].classList.length > 1){
      color = color ? color : this.grid[i].classList.item(2)
      if (this.grid[i].classList.item(2) === color){
        streak.push(i)
      }
      else {
        if (streak.length >= 4){ 
          toRemove = toRemove.concat(streak)                       
        }
        streak =[]  
        color = this.grid[i].classList.item(2)
        streak.push(i)
      }
    }
    else {
      if (streak.length >= 4){
        toRemove = toRemove.concat(streak)                       
      }
      streak =[] 
      color = null
    }
  }
  if (streak.length >= 4){
    toRemove = toRemove.concat(streak)                       
  }
  return toRemove
};

Game.prototype.inefVerticalCheck = function inefVerticalCheck(idx) {
  let start1 = (idx%8)
  let streak = []
  let toRemove = []
  let color = null
  for (i=start1; i<127; i += 8){
    if (this.grid[i].classList.length > 1){
      color = color ? color : this.grid[i].classList.item(2)
      if (this.grid[i].classList.item(2) === color){
        streak.push(i)
      }
      else {
        if (streak.length >= 4){
          toRemove = toRemove.concat(streak)                       
        }
        streak =[]  
        color = this.grid[i].classList.item(2)
        streak.push(i)
      }
    }
    else {
      if (streak.length >= 4){
        toRemove = toRemove.concat(streak)                      
      }
      streak =[]
      color = null
    }
  }
  if (streak.length >= 4){
    toRemove = toRemove.concat(streak)                    
  }
  return toRemove
};


Game.prototype.remove = function remove(arr) {
  arr.forEach(idx => {
    if (this.grid[idx].classList.contains('virus')) this.virusCount -= 1;
    this.grid[idx].classList.remove(
      'virus', 'pill', 'cornflowerblue', 'bisque',
      'salmon', 'minHor', 'minVer', 'maxHor', 'maxVer', 'floater'
    )
  })
};

Game.prototype.moveObjects = function moveObjects(delta) {
  if (this.currentPill) {
    this.currentPill.move()
  } else{
    let movers = this.pills.concat(this.floaters)
    for (let i = 120; i>0; i-=8 ){
      movers.forEach(mover => {
        if (mover.idx1 >= i && mover.idx1 < i+8){
          mover.move()
        }
      })
      
    }
    if (movers.every(mover => mover.collided)) this.addPill();
    // if (!movers.every(mover => mover.collided)) {
    //   movers.forEach(mover => {
    //     mover.move()        
    //     if (mover.collided) doubleCheck.push(mover)
    //   })
    //   doubleCheck.forEach(mover => {mover.move()})
    // } else {
    // this.addPill()   
    // }
  }
};

Game.prototype.step = function step(delta) {
  this.checkWin();
  this.moveObjects();
  document.getElementById('score').textContent = this.score
  document.getElementById('virus-count').textContent = this.virusCount
  if (this.toRemove) {
    this.score += (this.toRemove.length * 100)
    this.remove(this.toRemove)
    this.handleFloaters();
    this.toRemove = null
  }
};

Game.prototype.gameOver = function gameOver(){
  this.lose = true
} 

Game.prototype.checkWin = function checkWin(){
  if (this.virusCount === 0) this.win = true
}

Game.prototype.handleFloaters = function handleFloaters(){
  this.floaters = this.floaters.filter(floater => {
    return this.grid[floater.idx1].classList.contains('floater')
  })
  this.pills = this.pills.filter(pill => {
   let list1 = this.grid[pill.idx1].classList.contains('pill')
   let list2 = this.grid[pill.idx2].classList.contains('pill')
   if (!list1 || !list2){
      if (!list1 && !list2){
        return false
      } else if (!list1){
        this.floaters.push(new Floater({game: pill.game, color: pill.color2, idx: pill.idx2, grid: this.grid}))
        return false
      } else if (!list2){
        this.floaters.push(new Floater({game: pill.game, color: pill.color1, idx: pill.idx1, grid: this.grid}))
        return false
      }
   }
   return true
  })

}





module.exports = Game;
