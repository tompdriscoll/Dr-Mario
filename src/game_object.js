function GameObject(option){
    this.game = options.game
    this.color = randomColor()
    this.idx = null
}

function randomColor() {
    const possibleColors = ['cornflowerblue', 'salmon', 'bisque']  
    color = possibleColors[Math.floor((Math.random() * 3))];
    return color;
}