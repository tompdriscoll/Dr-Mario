 
function Pill(options){
    this.color1 = randomColor()
    this.color2 = randomColor()
    this.radius = 9;
    this.pos1 = [280, 100]
    this.pos2 = [300, 100]
    this.idx1 = 3
    this.idx2 = 4
    this.rot1 = 2
    this.rot2 = 0
    this.game = options.game;
    this.collided = false
    this.horizontal = true
    this.placeOnGrid()
}

Pill.prototype.draw = function draw(ctx) {
    ctx.fillStyle = this.color1;
    ctx.beginPath();
    ctx.arc(
      this.pos1[0], this.pos1[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();

    ctx.fillStyle = this.color2;
    ctx.beginPath();
    ctx.arc(
      this.pos2[0], this.pos2[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
    
};

Pill.prototype.placeOnGrid = function placeOnGrid(){ 
    let squares;
    this.idx1 = ((((this.pos1[0]-200)/20) + ((this.pos1[1]-100)/20)*8) -1)
    this.idx2 = ((((this.pos2[0]-200)/20) + ((this.pos2[1]-100)/20)*8) -1)
    squares = document.getElementsByClassName('grid-square-square')  
    squares[this.idx1].classList.toggle(`${this.color1}`)
    squares[this.idx2].classList.toggle(`${this.color2}`)
    if(this.collided){
        this.game.checkRemove(this.idx1, this.idx2)   
    }
}

Pill.prototype.move = function move() {
    if(!this.collided){
        this.placeOnGrid()
        this.game.checkCollisions()
        if (!this.collided){
        this.pos1[1] += 20
        this.pos2[1] += 20
        }
    }
    this.placeOnGrid()  
}

Pill.prototype.control = function control(move){  
    if(!this.collided){
        this.placeOnGrid()
        this.game.checkCollisions()
        if (this.game.checkMove(move) && !this.collided){
        this.pos1[0] += move[0]
        this.pos2[0] += move[0]
        this.pos1[1] += move[1]
        this.pos2[1] += move[1]
    }
    this.placeOnGrid()
    }
}

Pill.prototype.rotate = function rotate(move){   
    if(!this.collided){
        this.placeOnGrid()
        this.game.checkCollisions()
        if (this.game.checkRotate()){
        let rotatations = [[-20, -20], [0, 20], [0, 0], [20, 0]]
        this.pos1[0] += rotatations[this.rot1][0]
        this.pos1[1] += rotatations[this.rot1][1]
        this.pos2[0] += rotatations[this.rot2][0]
        this.pos2[1] += rotatations[this.rot2][1]
        this.rot1 = Math.round((this.rot1 + 1 ) % 4 )   
        this.rot2 = Math.round((this.rot2 + 1 ) % 4 ) 
        this.horizontal = this.horizontal ? false : true;
        }
        this.placeOnGrid()    
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