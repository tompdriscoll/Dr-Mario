/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/floater.js":
/*!************************!*\
  !*** ./src/floater.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Floater(options){\n    this.game = options.game\n    this.grid = options.grid\n    this.color = options.color\n    this.idx1 = options.idx\n    this.collided = false\n    this.removePillClasses()\n    this.placeOnGrid()\n}\n\nFloater.prototype.removePillClasses = function removePillClasses(){\n    this.grid[this.idx1].classList.toggle('pill', false)\n    this.grid[this.idx1].classList.toggle(`minHor`, false)\n    this.grid[this.idx1].classList.toggle(`maxHor`, false)\n    this.grid[this.idx1].classList.toggle(`minVer`, false)\n    this.grid[this.idx1].classList.toggle(`maxVer`, false)  \n    this.grid[this.idx1].classList.toggle(`${this.color}`, false)  \n}\nFloater.prototype.placeOnGrid = function placeOnGrid(){\n    this.grid[this.idx1].classList.toggle('floater')\n    this.grid[this.idx1].classList.toggle(`${this.color}`)  \n}\n \nFloater.prototype.move = function move() {\n    this.game.checkCollisions(this)\n\n    this.placeOnGrid()\n    if(!this.collided){ \n        this.idx1 += 8     \n    }\n    this.placeOnGrid()  \n    this.game.checkCollisions(this)\n}\n\nmodule.exports = Floater;\n\n//# sourceURL=webpack:///./src/floater.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Virus = __webpack_require__(/*! ./virus */ \"./src/virus.js\")\nconst Pill = __webpack_require__(/*! ./pill */ \"./src/pill.js\");\nconst Floater = __webpack_require__(/*! ./floater */ \"./src/floater.js\")\n\nfunction Game(grid, level) {\n  this.pills = [];\n  this.viruses = [];\n  this.floaters = [];\n  this.toRemove = [];\n  this.currentPill = null\n  this.nextPill = null\n  this.level = level\n  this.virusCount = this.level * 4\n  this.grid = grid\n  this.addPill()\n  this.addViruses()\n  this.win = false\n  this.lose = false\n  this.score = 0\n}\n\nGame.prototype.add = function add(object) {\n  if (object instanceof Pill) {\n    this.pills.push(object);\n  } \n  else if (object instanceof Virus) {\n    this.viruses.push(object);\n  } \n  else {\n    throw new Error(\"unknown type of object\");\n  }\n};\n\nGame.prototype.addViruses = function addViruses() {\n  for (let i = 0; i < this.virusCount; i++) {\n    this.add(new Virus({ game: this }));\n  }\n};\n\nGame.prototype.addPill = function addPill() {\n  let pill = new Pill({\n    game: this\n  });\n  this.currentPill = pill\n  this.nextPill = pill\n  let next = document.getElementById('next-pill')\n  next.classList.add(this.nextPill.color1)\n  if (!this.checkCollisions()) return this.gameOver()\n  this.add(pill);\n  return pill;\n}; \n\nGame.prototype.allObjects = function allObjects() {\n  return [].concat(this.pills, this.viruses);\n};\n\nGame.prototype.checkCollisions = function checkCollisions(pill=this.currentPill) {\n  \n  if (pill.idx2) {\n    let check1 = pill.idx1 + 8\n    let check2  = pill.idx2 + 8\n    if (check1 >= 128 ||  check2 >= 128) {\n      pill.collided = true\n      this.toRemove = this.toRemove.concat(this.checkRemove(pill.idx1).concat(this.checkRemove(pill.idx2))   )\n      this.currentPill = null\n      return false\n    }\n    else if (this.grid[check1].classList.length > 1 && (check1 !== pill.idx2)){\n      pill.collided = true\n      this.toRemove = this.toRemove.concat(this.checkRemove(pill.idx1).concat(this.checkRemove(pill.idx2))    )\n      this.currentPill = null\n      return false\n    }\n    else if(this.grid[check2].classList.length > 1 && (check2 !== pill.idx1)){\n      pill.collided = true\n      this.toRemove = this.toRemove.concat(this.checkRemove(pill.idx1).concat(this.checkRemove(pill.idx2))  )\n      this.currentPill = null\n      return false\n    }\n  } else if (pill.idx1) {\n    let check1 = pill.idx1 + 8\n    if (check1 >= 128 || this.grid[check1].classList.length > 1){\n      pill.collided = true\n      this.toRemove = this.toRemove.concat(this.checkRemove(pill.idx1))\n      return false\n    }\n  }\n  pill.collided = false\n  return true\n};\n\nGame.prototype.checkMove = function checkMove(move) {\n  let idx1 = this.currentPill.idx1\n  let idx2 = this.currentPill.idx2\n  if (move === 1){\n    if (idx1%8 === 7 ||\n       idx2%8 === 7 ||\n      (idx1+1 !== idx2 && this.grid[idx1 +1].classList.length > 1) ||\n      (idx2+1 !== idx1 && this.grid[idx2 +1].classList.length > 1)){\n      return false\n    } \n  }    \n  else if (move === -1){\n    if (idx1%8 === 0 || \n      idx2%8 === 0  ||\n      (idx1-1 !== idx2 && this.grid[idx1 -1].classList.length > 1) ||\n      (idx2-1 !== idx1 && this.grid[idx2 -1].classList.length > 1)){\n      return false} \n  }\n  else if (move === 8){\n    if (idx1+8 > 127 || \n      idx2+8 > 127  ||\n      (idx1+8 !== idx2 && this.grid[idx1 +8].classList.length > 1) ||\n      (idx2+8 !== idx1 && this.grid[idx2 +8].classList.length > 1)){\n      return false} \n  } \n  return true\n}\n\nGame.prototype.checkRotate = function checkRotate() {\n  let pill = this.currentPill\n  if (pill.idx1 < 8) return false;\n  if (this.currentPill.horizontal) {\n    let less = pill.idx1 > pill.idx2 ? pill.idx2 : pill.idx1\n    if (this.grid[less-8] && this.grid[less - 8].classList.length > 1){\n      return false\n    }\n  }\n  else{\n    let greater = pill.idx1 < pill.idx2 ? pill.idx2 : pill.idx1\n    if ((greater+1)%8 === 0 || this.grid[greater + 1].classList.length > 1){\n      return false\n    }\n  }\n  return true\n}\n\nGame.prototype.checkRemove = function checkRemove(idx){\n    return this.inefhorizontalCheck(idx).concat(this.inefVerticalCheck(idx))   \n}\n\nGame.prototype.inefhorizontalCheck = function inefhorizontalCheck(idx) {\n  let start1 = (idx - (idx%8))\n  let streak = []\n  let toRemove = []\n  let color = null\n  for (i=start1; i<start1+8; i++){\n    if (this.grid[i].classList.length > 1){\n      color = color ? color : this.grid[i].classList.item(2)\n      if (this.grid[i].classList.item(2) === color){\n        streak.push(i)\n      }\n      else {\n        if (streak.length >= 4){ \n          toRemove = toRemove.concat(streak)                       \n        }\n        streak =[]  \n        color = this.grid[i].classList.item(2)\n        streak.push(i)\n      }\n    }\n    else {\n      if (streak.length >= 4){\n        toRemove = toRemove.concat(streak)                       \n      }\n      streak =[] \n      color = null\n    }\n  }\n  if (streak.length >= 4){\n    toRemove = toRemove.concat(streak)                       \n  }\n  return toRemove\n};\n\nGame.prototype.inefVerticalCheck = function inefVerticalCheck(idx) {\n  let start1 = (idx%8)\n  let streak = []\n  let toRemove = []\n  let color = null\n  for (i=start1; i<127; i += 8){\n    if (this.grid[i].classList.length > 1){\n      color = color ? color : this.grid[i].classList.item(2)\n      if (this.grid[i].classList.item(2) === color){\n        streak.push(i)\n      }\n      else {\n        if (streak.length >= 4){\n          toRemove = toRemove.concat(streak)                       \n        }\n        streak =[]  \n        color = this.grid[i].classList.item(2)\n        streak.push(i)\n      }\n    }\n    else {\n      if (streak.length >= 4){\n        toRemove = toRemove.concat(streak)                      \n      }\n      streak =[]\n      color = null\n    }\n  }\n  if (streak.length >= 4){\n    toRemove = toRemove.concat(streak)                    \n  }\n  return toRemove\n};\n\n\nGame.prototype.remove = function remove(arr) {\n  arr.forEach(idx => {\n    if (this.grid[idx].classList.contains('virus')) this.virusCount -= 1;\n    this.grid[idx].classList.remove(\n      'virus', 'pill', 'cornflowerblue', 'bisque',\n      'salmon', 'minHor', 'minVer', 'maxHor', 'maxVer', 'floater'\n    )\n  })\n};\n\nGame.prototype.moveObjects = function moveObjects(delta) {\n  let movers = this.pills.concat(this.floaters)\n  if (this.currentPill) {\n    this.currentPill.move()\n  } else if (movers.every(mover => mover.collided)) {\n    this.addPill();} else{\n    for (let i = 120; i>0; i-=8 ){\n      movers.forEach(mover => {\n        if (mover.idx1 >= i && mover.idx1 < i+8){\n          mover.move()\n        }\n      })\n      \n    }\n    // if (!movers.every(mover => mover.collided)) {\n    //   movers.forEach(mover => {\n    //     mover.move()        \n    //     if (mover.collided) doubleCheck.push(mover)\n    //   })\n    //   doubleCheck.forEach(mover => {mover.move()})\n    // } else {\n    // this.addPill()   \n    // }\n  }\n};\n\nGame.prototype.step = function step(delta) {\n  this.checkWin();\n  this.moveObjects();\n  document.getElementById('score').textContent = this.score\n  document.getElementById('virus-count').textContent = this.virusCount\n  if (this.toRemove) {\n    this.score += (this.toRemove.length * 100)\n    this.remove(this.toRemove)\n    this.handleFloaters();\n    this.toRemove = []\n  }\n};\n\nGame.prototype.gameOver = function gameOver(){\n  this.lose = true\n} \n\nGame.prototype.checkWin = function checkWin(){\n  if (this.virusCount === 0) this.win = true\n}\n\nGame.prototype.handleFloaters = function handleFloaters(){\n  this.floaters = this.floaters.filter(floater => {\n    return this.grid[floater.idx1].classList.contains('floater')\n  })\n  this.pills = this.pills.filter(pill => {\n   let list1 = this.grid[pill.idx1].classList.contains('pill')\n   let list2 = this.grid[pill.idx2].classList.contains('pill')\n   if (!list1 || !list2){\n      if (!list1 && !list2){\n        return false\n      } else if (!list1){\n        this.floaters.push(new Floater({game: pill.game, color: pill.color2, idx: pill.idx2, grid: this.grid}))\n        return false\n      } else if (!list2){\n        this.floaters.push(new Floater({game: pill.game, color: pill.color1, idx: pill.idx1, grid: this.grid}))\n        return false\n      }\n   }\n   return true\n  })\n\n}\n\n\n\n\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView() {\n  this.game = null;\n  this.interval = 500\n  this.grid = document.getElementsByClassName('grid-square-square')\n  this.levelUp = 0\n  this.music = null\n  this.debug = this.debug.bind(this)\n  this.topScore = 10000\n}\n\nGameView.MOVES = {\n  left: -1,\n  down: 8,\n  right: 1,\n};\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers() {\n  key.unbind('space')\n  key.unbind('left')\n  key.unbind('right')\n  key.unbind('down')\n  let that = this\n  key('a', this.debug)\n  if (this.game.currentPill){\n    let pill = this.game.currentPill\n  Object.keys(GameView.MOVES).forEach(function(k)  {\n    const move = GameView.MOVES[k];\n     key(k, function () { pill.control(move); });\n  });\n\n    key(\"space\", function () { pill.rotate(); });\n  }\n};\nGameView.prototype.debug = function debug(){\n  debugger\n}\n\nGameView.prototype.start = function start() {\n  switchScreen()\n  this.setSpeedMusic()\n  let thisLevel = document.getElementById('level-slider').value - 0\n  thisLevel += this.levelUp\n  this.game = new Game(this.grid, thisLevel); \n  document.getElementById('lvl').textContent = thisLevel\n  document.getElementById('top-score').textContent = this.topScore\n  this.music.load()\n  var gameLoop = setInterval(() => {\n    \n    this.music.play()\n    this.game.step(); \n    this.bindKeyHandlers();\n    if (this.game.lose) {\n      this.music.pause()\n      this.clearGrid()\n      this.game = null\n      clearInterval(gameLoop)\n      switchScreen()\n      this.splash()\n    } else if (this.game.win) {\n      this.music.pause()\n      key.unbind('space')\n      this.clearGrid()\n      this.topScore = this.topScore > this.game.score ? this.topScore : this.game.score\n      this.game = null\n      clearInterval(gameLoop)\n      document.getElementById('next-level-div').classList.toggle('hidden')\n      key(\"space\",  this.nextLevel.bind(this));\n    }\n  }, this.interval);\n};\n\nGameView.prototype.nextLevel = function nextLevel(){\n  document.getElementById('next-level-div').classList.toggle('hidden')\n  this.levelUp += 1\n  switchScreen()\n  this.start()\n}\n\nGameView.prototype.splash = function splash(){ \n  key(\"space\",  this.start.bind(this));\n}\n\nGameView.prototype.setSpeedMusic = function setSpeedMusic(){\n  this.music = document.getElementById(Array.from(document.getElementById('music-picker-div').children).filter(ele => ele.checked === true)[0].value)\n  let speed = Array.from(document.getElementById('speed-picker-div').children).filter(ele => ele.checked === true)[0]\n  this.interval = speed.value - 0\n  document.getElementById('speed').innerText = speed.nextElementSibling.innerText\n}\n\nGameView.prototype.clearGrid = function clearGrid(){\n  Array.from(this.grid).forEach(ele => {\n    ele.classList.remove(\n      'virus', 'pill', 'cornflowerblue', 'bisque',\n      'salmon', 'minHor', 'minVer', 'maxHor', 'maxVer', 'floater'\n    )})\n\n}\n\nfunction switchScreen(){\n  Array.from(document.getElementsByClassName('toHide')).forEach(ele => ele.classList.toggle('hidden'))\n  key.unbind('space')\n  key.unbind('left')\n  key.unbind('right')\n  key.unbind('down')\n}\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\")\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    let fever = document.getElementById('fever')\n    let chill = document.getElementById('chill')\n    chill.volume = 0.1\n    fever.volume = 0.1\n    let slider = document.getElementById('level-slider')\n    // debugger\n    let radio = Array.from(document.getElementsByTagName(\"input\"))\n    radio.slice(1, radio.length).forEach(input => {\n      input.addEventListener(\"mousedown\", function(event) {\n        event.preventDefault()\n      })\n    })\n    slider.addEventListener( 'input', function (event) {\n      document.getElementById('level-value').textContent =  slider.value\n    })\n    new GameView().splash();\n  });\n  \n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/pill.js":
/*!*********************!*\
  !*** ./src/pill.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval(" \nfunction Pill(options){\n    this.color1 = randomColor()\n    this.color2 = randomColor()\n    this.idx1 = 3\n    this.idx2 = 4\n    this.rot1 = 2\n    this.rot2 = 0\n    this.game = options.game;\n    this.collided = false\n    this.horizontal = true\n    this.placeOnGrid()\n    \n}\n\nPill.prototype.placeOnGrid = function placeOnGrid(){ \n    let squares;\n    squares = document.getElementsByClassName('grid-square-square')  \n    squares[this.idx1].classList.toggle(`pill`)\n    squares[this.idx2].classList.toggle(`pill`)\n    squares[this.idx1].classList.toggle(`${this.color1}`)\n    squares[this.idx2].classList.toggle(`${this.color2}`)\n    let min = this.idx1 < this.idx2 ? this.idx1 : this.idx2\n    let max = this.idx1 > this.idx2 ? this.idx1 : this.idx2\n    if (this.horizontal){\n        squares[min].classList.toggle(`minHor`)\n        squares[max].classList.toggle(`maxHor`)\n    } else {\n        squares[min].classList.toggle(`minVer`)\n        squares[max].classList.toggle(`maxVer`)  \n    }\n    \n}\n\nPill.prototype.move = function move() {\n    this.game.checkCollisions(this)\n\n    this.placeOnGrid()\n    if(!this.collided){       \n        this.idx1 += 8\n        this.idx2 += 8       \n    }\n    this.placeOnGrid()  \n}\n\nPill.prototype.control = function control(move){  \n    if(!this.collided){\n        this.placeOnGrid()\n        if (this.game.checkMove(move) && !this.collided){\n            this.idx1 += move\n            this.idx2 += move\n        }\n        this.placeOnGrid()\n        \n    }\n}\n\nPill.prototype.rotate = function rotate(move){   \n    if(!this.collided){\n        this.placeOnGrid()\n        if (this.game.checkRotate()){\n            let rotatations = [ -9, 8, 0, 1]\n            this.idx1 += rotatations[this.rot1]\n            this.idx2 += rotatations[this.rot2]\n            this.rot1 = Math.round((this.rot1 + 1 ) % 4 )   \n            this.rot2 = Math.round((this.rot2 + 1 ) % 4 ) \n            this.horizontal = this.horizontal ? false : true;\n        }\n        this.placeOnGrid()    \n    }\n}\n\n\nfunction randomColor() {\n    const possibleColors = ['cornflowerblue', 'salmon', 'bisque']  \n    let color = possibleColors[Math.floor((Math.random() * 3))];\n    return color;\n}\n\n\nmodule.exports = Pill; \n\n//# sourceURL=webpack:///./src/pill.js?");

/***/ }),

/***/ "./src/virus.js":
/*!**********************!*\
  !*** ./src/virus.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction Virus(options){\n    this.game = options.game;\n    this.color = randomColor();\n    this.idx = this.randomPosition()\n}\n\n  Virus.prototype.randomPosition =  function randomPosition(){\n        let x = Math.round(Math.random() * 7) + 1;\n        let y = Math.round(Math.random() * 10) + 5;\n        let idx =  (y * 8 - 1) + x\n        let squares = document.getElementsByClassName('grid-square-square')\n        if (squares[idx].classList.contains('virus')){\n            return randomPosition()\n        }\n        else{  \n            squares[idx].classList.add('virus', `${this.color}`)\n        }\n        let x2 = Math.floor(200 + (x * 20))\n        let y2 = Math.floor(100 + (y * 20))\n        return [x2, y2]\n  }\n\n \n  function randomColor() {\n    const possibleColors = ['cornflowerblue', 'salmon', 'bisque']  \n    color = possibleColors[Math.floor((Math.random() * 3))];\n    return color;\n  }\n\nmodule.exports = Virus;\n\n//# sourceURL=webpack:///./src/virus.js?");

/***/ })

/******/ });