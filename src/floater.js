function Floater(options){
    this.game = options.game
    this.grid = options.grid
    this.color = options.color
    this.idx = options.idx
    this.collided = false
    this.placeOnGrid()
}

Floater.prototype.placeOnGrid = function placeOnGrid(){
    this.grid[this.idx].classList.toggle('pill', false)
    this.grid[this.idx].classList.toggle(`minHor`, false)
    this.grid[this.idx].classList.toggle(`maxHor`, false)
    this.grid[this.idx].classList.toggle(`minVer`, false)
    this.grid[this.idx].classList.toggle(`maxVer`, false)  
    this.grid[this.idx].classList.toggle('floater')
}

module.exports = Floater;