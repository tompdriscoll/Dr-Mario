 
function Pill(options){
    this.color1 = randomColor()
    this.color2 = randomColor()
    this.idx1 = 3
    this.idx2 = 4
    this.rot1 = 2
    this.rot2 = 0
    this.game = options.game;
    this.collided = false
    this.horizontal = true
    this.placeOnGrid()
}

Pill.prototype.placeOnGrid = function placeOnGrid(){ 
    let squares;
    squares = document.getElementsByClassName('grid-square-square')  
    squares[this.idx1].classList.toggle(`${this.color1}`)
    squares[this.idx2].classList.toggle(`${this.color2}`)
}

Pill.prototype.move = function move() {
    if(!this.collided){
        this.placeOnGrid()
        if (!this.collided){
            this.idx1 += 8
            this.idx2 += 8
        }
    }
    this.placeOnGrid()  
    this.game.checkCollisions()
}

Pill.prototype.control = function control(move){  
    if(!this.collided){
        this.placeOnGrid()
        if (this.game.checkMove(move) && !this.collided){
            this.idx1 += move
            this.idx2 += move
        }
        this.placeOnGrid()
        this.game.checkCollisions()
    }
}

Pill.prototype.rotate = function rotate(move){   
    if(!this.collided){
        this.placeOnGrid()
        if (this.game.checkRotate()){
            let rotatations = [ -9, 8, 0, 1]
            this.idx1 += rotatations[this.rot1]
            this.idx2 += rotatations[this.rot2]
            this.rot1 = Math.round((this.rot1 + 1 ) % 4 )   
            this.rot2 = Math.round((this.rot2 + 1 ) % 4 ) 
            this.horizontal = this.horizontal ? false : true;
        }
        this.placeOnGrid()    
        this.game.checkCollisions()
    }
}

// function convertToGridIdx(pos){
//     let idx = (((pos[0]-200)/20) + ((pos[1]-100)/20)/8) -1
//     return idx
// }

function randomColor() {
    const possibleColors = ['cornflowerblue', 'salmon', 'bisque']  
    let color = possibleColors[Math.floor((Math.random() * 3))];
    return color;
}


module.exports = Pill; 