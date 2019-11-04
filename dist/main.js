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

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (50:27)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| \\n| GameView.prototype.clearGrid = function clearGrid(){\\n>   this.grid.forEach(ele => )\\n| }\\n| \");\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\")\nconst Pill = __webpack_require__(/*! ./pill */ \"./src/pill.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {``\n    var vid = document.getElementById(\"fever\");\n    vid.volume = 0.0;\n    new GameView().splash();\n  });\n  \n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/pill.js":
/*!*********************!*\
  !*** ./src/pill.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval(" \nfunction Pill(options){\n    this.color1 = randomColor()\n    this.color2 = randomColor()\n    this.idx1 = 3\n    this.idx2 = 4\n    this.rot1 = 2\n    this.rot2 = 0\n    this.game = options.game;\n    this.collided = false\n    this.horizontal = true\n    this.placeOnGrid()\n}\n\nPill.prototype.placeOnGrid = function placeOnGrid(){ \n    let squares;\n    squares = document.getElementsByClassName('grid-square-square')  \n    squares[this.idx1].classList.toggle(`${this.color1}`)\n    squares[this.idx2].classList.toggle(`${this.color2}`)\n}\n\nPill.prototype.move = function move() {\n    if(!this.collided){\n        this.placeOnGrid()\n        if (!this.collided){\n            this.idx1 += 8\n            this.idx2 += 8\n        }\n    }\n    this.placeOnGrid()  \n    this.game.checkCollisions()\n}\n\nPill.prototype.control = function control(move){  \n    if(!this.collided){\n        this.placeOnGrid()\n        if (this.game.checkMove(move) && !this.collided){\n            this.idx1 += move\n            this.idx2 += move\n        }\n        this.placeOnGrid()\n        this.game.checkCollisions()\n    }\n}\n\nPill.prototype.rotate = function rotate(move){   \n    if(!this.collided){\n        this.placeOnGrid()\n        if (this.game.checkRotate()){\n            let rotatations = [ -9, 8, 0, 1]\n            this.idx1 += rotatations[this.rot1]\n            this.idx2 += rotatations[this.rot2]\n            this.rot1 = Math.round((this.rot1 + 1 ) % 4 )   \n            this.rot2 = Math.round((this.rot2 + 1 ) % 4 ) \n            this.horizontal = this.horizontal ? false : true;\n        }\n        this.placeOnGrid()    \n        this.game.checkCollisions()\n    }\n}\n\n// function convertToGridIdx(pos){\n//     let idx = (((pos[0]-200)/20) + ((pos[1]-100)/20)/8) -1\n//     return idx\n// }\n\nfunction randomColor() {\n    const possibleColors = ['cornflowerblue', 'salmon', 'bisque']  \n    let color = possibleColors[Math.floor((Math.random() * 3))];\n    return color;\n}\n\n\nmodule.exports = Pill; \n\n//# sourceURL=webpack:///./src/pill.js?");

/***/ })

/******/ });