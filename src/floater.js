function Floater(options){
    this.game = options.game
    this.grid = options.grid
    this.color = options.color
    this.idx1 = options.idx
    this.collided = false
    this.removePillClasses()
    this.placeOnGrid()
}

Floater.prototype.removePillClasses = function removePillClasses(){
    this.grid[this.idx1].classList.toggle('pill', false)
    this.grid[this.idx1].classList.toggle(`minHor`, false)
    this.grid[this.idx1].classList.toggle(`maxHor`, false)
    this.grid[this.idx1].classList.toggle(`minVer`, false)
    this.grid[this.idx1].classList.toggle(`maxVer`, false)  
    this.grid[this.idx1].classList.toggle(`${this.color}`, false)  
}
Floater.prototype.placeOnGrid = function placeOnGrid(){
    this.grid[this.idx1].classList.toggle('floater')
    this.grid[this.idx1].classList.toggle(`${this.color}`)  
}
 
Floater.prototype.move = function move() {
    this.game.checkCollisions(this)

    this.placeOnGrid()
    if(!this.collided){ 
        this.idx1 += 8     
    }
    this.placeOnGrid()  
    this.game.checkCollisions(this)
}

module.exports = Floater;