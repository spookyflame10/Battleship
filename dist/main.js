/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/Gameboard */ "./src/factories/Gameboard.js");
/* harmony import */ var _factories_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/Player */ "./src/factories/Player.js");
/* harmony import */ var _factories_Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/Ship */ "./src/factories/Ship.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameController */ "./src/gameController.js");





const UI = (() => {
  const ships = [];
  const carrier = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"](5);
  const battleship = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"](4);
  const destroyer = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"](3);
  const submarine = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"](3);
  const patrolBoat = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"](2);
  ships.push(carrier, battleship, destroyer, submarine, patrolBoat);
  let xAxis = true;
  function initialUI() {
    const board1 = document.querySelector(".player");
    const board2 = document.querySelector(".computer");
    makeBoard(board1);
    makeBoard(board2);
    displayPlayerModal();
    // initializeEventListeners();
  }

  function displayPlayerModal() {
    const playerModal = document.querySelector('.playerModal');
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('active');
    playerModal.classList.add('active');
    const board = document.querySelector(".boardModal");
    makeBoard(board);
    initializeModalEventListeners();
  }
  function initializeModalEventListeners() {
    const board = document.querySelector(".boardModal");
    const button = document.querySelector(".rotate");
    const ship = document.querySelector(".ship");
    for (const child of board.children) {
      child.addEventListener("mouseover", cellHovered);
      child.addEventListener("click", modalBoardClick);
    }
    button.onclick = () => {
      xAxis = !xAxis;
    };
  }

  // function clearGameBoard(board) {
  //   // board.innerHTML = '';
  // }
  function displayShips(gamebd, name) {
    for (let i = 0; i < gamebd.size; i++) {
      for (let j = 0; j < gamebd.size; j++) {
        const dataCell = document.querySelector(`.${name}>[data-x="${i}"][data-y="${j}"]`);
        if (gamebd.board[i][j]) {
          dataCell.setAttribute("id", "gray");
        }
      }
    }
  }
  function displayGameBoard(gamebd, name) {
    for (let i = 0; i < gamebd.size; i++) {
      for (let j = 0; j < gamebd.size; j++) {
        const dataCell = document.querySelector(`.${name}>[data-x="${i}"][data-y="${j}"]`);
        if (gamebd.storage[i][j] === 1) {
          dataCell.setAttribute("id", "miss");
        } else if (gamebd.storage[i][j] === 2) {
          dataCell.setAttribute("id", "hit");
        }
      }
    }
  }
  function clearClasses(board) {
    for (const child of board.children) {
      child.classList = child.classList[0];
    }
  }
  function cellClicked(e) {
    const boardModal = document.querySelector(".boardModal");
    const playerBoard = document.querySelector(".player");
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    if (e.target.parentElement === boardModal || e.target.parentElement === playerBoard) {
      return false;
    }
    if (_index__WEBPACK_IMPORTED_MODULE_3__.computer.gameboard.receiveAttack([x, y])) {
      displayGameBoard(_index__WEBPACK_IMPORTED_MODULE_3__.computer.gameboard, "computer");
      _index__WEBPACK_IMPORTED_MODULE_3__.player.gameboard.randomAttack();
      displayGameBoard(_index__WEBPACK_IMPORTED_MODULE_3__.player.gameboard, "player");
    }
    if (_index__WEBPACK_IMPORTED_MODULE_3__.player.gameboard.isGameOver() || _index__WEBPACK_IMPORTED_MODULE_3__.computer.gameboard.isGameOver()) {
      const overlay = document.querySelector(".overlay");
      const endModal = document.querySelector(".endGameModal");
      const result = document.querySelector(".result");
      const restartButton = document.querySelector(".restart");
      displayShips(_index__WEBPACK_IMPORTED_MODULE_3__.computer.gameboard, "computer");
      overlay.classList.add("active");
      endModal.classList.add("active");
      _index__WEBPACK_IMPORTED_MODULE_3__.player.gameboard.isGameOver() ? result.textContent = "You Lose" : result.textContent = "You Won";
      restartButton.onclick = () => restart();
    }
  }
  function gameStart() {
    _index__WEBPACK_IMPORTED_MODULE_3__.computer.randomPlaceShips();
    displayShips(_index__WEBPACK_IMPORTED_MODULE_3__.player.gameboard, "player");
    // gameLoop();
  }

  function modalBoardClick(e) {
    const playerModal = document.querySelector(".playerModal");
    const overlay = document.querySelector(".overlay");
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    if (_index__WEBPACK_IMPORTED_MODULE_3__.gameboard.placeShip([x, y], ships[ships.length - 1], xAxis)) {
      displayShips(_index__WEBPACK_IMPORTED_MODULE_3__.gameboard, "boardModal");
      ships.pop();
    }
    if (ships.length === 0) {
      // remove modal
      playerModal.classList.remove("active");
      overlay.classList.remove("active");
      _index__WEBPACK_IMPORTED_MODULE_3__.player.gameboard.board = _index__WEBPACK_IMPORTED_MODULE_3__.gameboard.board;
      gameStart();
    }
  }
  function cellHovered(e) {
    const board = document.querySelector(".boardModal");
    clearClasses(board);
    if (e.target.parentElement !== board) {
      return;
    }
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    let dataCell = document.querySelector(`.boardModal>[data-x="${x}"][data-y="${y}"]`);
    if (_index__WEBPACK_IMPORTED_MODULE_3__.gameboard.isPlacementPossible(ships[ships.length - 1], [x, y], xAxis)) {
      _index__WEBPACK_IMPORTED_MODULE_3__.gameboard.getShipCoords([x, y], ships[ships.length - 1], xAxis).forEach(coord => {
        dataCell = document.querySelector(`.boardModal>[data-x="${coord[0]}"][data-y="${coord[1]}"]`);
        dataCell.classList.add("blue");
      });
    } else dataCell.classList.add("red");
  }
  // const getDataCell = (x, y) =>document.querySelector(`[data-x="${x}"][data-y="${y}"]`)

  function makeBoard(board) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = i;
        cell.dataset.y = j;
        cell.setAttribute("id", "cell");
        cell.addEventListener("click", cellClicked);
        // cell.addEventListener('mouseover', cellHovered);
        board.appendChild(cell);
      }
    }
  }
  function restart() {
    window.location.reload();
    // not working
    // const endModal = document.querySelector(".endGameModal");
    // const playerBoard = document.querySelector('.player');
    // const computerBoard = document.querySelector('.computer');
    // const overlay = document.querySelector(".overlay");
    // playerBoard.innerHTML = '';
    // computerBoard.innerHTML = '';
    // endModal.classList.remove("active");
    // overlay.classList.remove('active');
    // player.gameboard.clear();
    // computer.gameboard.clear();
    // gameboard.clear();
    // initialUI();
  }

  return {
    initialUI,
    displayGameBoard,
    displayShips
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);

/***/ }),

/***/ "./src/factories/Gameboard.js":
/*!************************************!*\
  !*** ./src/factories/Gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/factories/Ship.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

class Gameboard {
  // board to store ships

  // 0 is unmarked, 1 is missed, 2 is hit
  // board to store misses and attacks

  constructor(size) {
    _defineProperty(this, "board", []);
    _defineProperty(this, "storage", []);
    this.size = size;
    this.initialize();
  }
  initialize() {
    for (let i = 0; i < this.size; i++) {
      const arr = [];
      const arr2 = [];
      for (let j = 0; j < this.size; j++) {
        arr.push(0);
        arr2.push(0);
      }
      this.board.push(arr);
      this.storage.push(arr2);
    }
  }
  clear() {
    this.board = [];
    this.storage = [];
    this.initialize();
  }
  placeShip(coord, ship, xAxis) {
    if (!this.isPlacementPossible(ship, coord, xAxis)) return false;
    if (xAxis) {
      for (let i = 0; i < ship.length; i++) {
        this.board[coord[0]][coord[1] + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[coord[0] + i][coord[1]] = ship;
      }
    }
    return true;
  }
  isPlacementPossible(ship, coord, xAxis) {
    const x = coord[0];
    const y = coord[1];
    const {
      size
    } = this;
    // position is out of bounds
    if (x < 0 || x > size - 1 || y < 0 || y > size - 1) return false;
    // ship doesn't fit on board
    if (xAxis) {
      if (y + ship.length > size) return false;
    } else if (x + ship.length > size) return false;
    // if the board value already has ship return false
    if (xAxis) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][y + i]) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x + i][y]) return false;
      }
    }
    return true;
  }
  isEmpty() {
    const {
      size
    } = this;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.board[i][j] !== 0) return false;
      }
    }
    return true;
  }

  // for computer
  randomPlaceShips() {
    if (!this.isEmpty()) return;
    const ships = [];
    const carrier = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](5);
    const battleship = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](4);
    const destroyer = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](3);
    const submarine = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](3);
    const patrolBoat = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](2);
    ships.push(carrier, battleship, destroyer, submarine, patrolBoat);
    let succesfulPlacements = 0;
    while (succesfulPlacements < 5) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const xAxis = Math.floor(Math.random() * 2) === 1;
      if (this.placeShip([x, y], ships[succesfulPlacements], xAxis)) {
        succesfulPlacements++;
      }
    }
  }
  receiveAttack(coord) {
    const x = coord[0];
    const y = coord[1];
    if (this.canAttack(coord)) {
      const boardCell = this.board[x][y];
      if (boardCell) {
        this.board[x][y].hit();
        this.storage[x][y] = 2;
        return true; // hit
      }

      this.storage[x][y] = 1;
      return true; // missed
    }

    return false; // clicked on cell with thing inside
  }

  randomAttack() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (this.storage[x][y]) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    this.receiveAttack([x, y]);
  }
  canAttack(coord) {
    const x = coord[0];
    const y = coord[1];
    const {
      size
    } = this;
    // position is out of bounds
    if (x < 0 || x > size - 1 || y < 0 || y > size - 1) return false;
    const storageCell = this.storage[x][y];
    return !storageCell;
  }
  getShipCoords(coord, ship, xAxis) {
    const result = [];
    if (xAxis) {
      for (let i = 0; i < ship.length; i++) {
        result.push([coord[0], coord[1] + i]);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        result.push([coord[0] + i, coord[1]]);
      }
    }
    return result;
  }
  isGameOver() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j]) {
          if (!this.board[i][j].isSunk()) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

/***/ }),

/***/ "./src/factories/Player.js":
/*!*********************************!*\
  !*** ./src/factories/Player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/factories/Gameboard.js");

class Player {
  constructor(name, playing, size) {
    this.name = name;
    this.playing = playing;
    this.gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__["default"](size);
  }
  receiveAttack(coord) {
    return this.gameboard.receiveAttack(coord);
  }
  randomAttack() {
    this.gameboard.randomAttack();
  }
  endTurn() {
    this.playing = !this.playing;
  }
  placeShip(coord, ship, xAxis) {
    return this.gameboard.placeShip(coord, ship, xAxis);
  }
  randomPlaceShips() {
    this.gameboard.randomPlaceShips();
  }
  isPlacementPossible(ship, coord, xAxis) {
    return this.gameboard.isPlacementPossible(ship, coord, xAxis);
  }
  getShipCoords(coord, ship, xAxis) {
    return this.gameboard.getShipCoords(coord, ship, xAxis);
  }
}

/***/ }),

/***/ "./src/factories/Ship.js":
/*!*******************************!*\
  !*** ./src/factories/Ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = function () {
  let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  let hits = 0;
  const getHits = () => hits;
  function hit() {
    if (hits >= length) {
      return;
    }
    hits++;
  }
  const isSunk = () => hits >= length;
  return {
    length,
    getHits,
    hit,
    isSunk
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/gameController.js":
/*!*******************************!*\
  !*** ./src/gameController.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/Gameboard */ "./src/factories/Gameboard.js");
/* harmony import */ var _factories_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/Player */ "./src/factories/Player.js");
/* harmony import */ var _factories_Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/Ship */ "./src/factories/Ship.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI */ "./src/UI.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index */ "./src/index.js");





const gameController = (() => {
  function gameStart() {
    // maybe put this in UI
    _index__WEBPACK_IMPORTED_MODULE_4__.computer.randomPlaceShips();
    _UI__WEBPACK_IMPORTED_MODULE_3__["default"].displayShips(_index__WEBPACK_IMPORTED_MODULE_4__.player.gameboard, 'player');
    _UI__WEBPACK_IMPORTED_MODULE_3__["default"].displayShips(_index__WEBPACK_IMPORTED_MODULE_4__.computer.gameboard, 'computer');
    gameLoop();
  }
  function gameLoop() {
    while (!_index__WEBPACK_IMPORTED_MODULE_4__.player.gameboard.isGameOver && !_index__WEBPACK_IMPORTED_MODULE_4__.computer.gameboard.isGameOver) {
      if (_index__WEBPACK_IMPORTED_MODULE_4__.player.playing) {
        _index__WEBPACK_IMPORTED_MODULE_4__.player;
      }
    }
  }
  return {
    gameStart
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameController);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computer": () => (/* binding */ computer),
/* harmony export */   "gameboard": () => (/* binding */ gameboard),
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _factories_Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/Gameboard */ "./src/factories/Gameboard.js");
/* harmony import */ var _factories_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/Player */ "./src/factories/Player.js");
/* harmony import */ var _factories_Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/Ship */ "./src/factories/Ship.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI */ "./src/UI.js");
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/style.css */ "./src/styles/style.css");





const player = new _factories_Player__WEBPACK_IMPORTED_MODULE_1__["default"]('p1', true, 10);
const computer = new _factories_Player__WEBPACK_IMPORTED_MODULE_1__["default"]('computer', false, 10);
const gameboard = new _factories_Gameboard__WEBPACK_IMPORTED_MODULE_0__["default"](10);
const mode = document.querySelector('.mode');
mode.onclick = () => {
  mode.classList.toggle('clicked');
  document.body.classList.toggle('light');
};
_UI__WEBPACK_IMPORTED_MODULE_3__["default"].initialUI();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Norse-Bold.otf */ "./src/fonts/Norse-Bold.otf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"Norse\";\n  src: local(\"Norse\") url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n:root {\n  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --shadow2: 2px 0px 2px rgba(0, 0, 0, 0.2);\n  --shadow-lg: 2px 10px 15px 10px rgb(0 0 0 / 0.4),\n    0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --boards: rgb(31, 30, 30);\n  --playerModal: rgb(51, 69, 70);\n  --backgroundColor: rgb(95, 88, 88);\n  --border: 1px solid rgb(255, 255, 255);\n  --hit: rgb(179, 24, 24);\n  --miss: rgb(34, 169, 81);\n  --color: white;\n}\n\nbody.light {\n  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --shadow2: 2px 0px 2px rgba(0, 0, 0, 0.2);\n  --shadow-lg: 2px 10px 15px 10px rgb(0 0 0 / 0.4),\n    0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --boards: rgb(241, 237, 237);\n  --playerModal: rgb(37, 53, 55);\n  --backgroundColor: white;\n  --border: 1px solid black;\n  --hit: red;\n  --miss: rgb(71, 254, 135);\n  --color: black;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background-color: var(--backgroundColor);\n  color: var(--color);\n  font-family: \"Norse\";\n}\n\n.cell {\n  font-size: 20px;\n  font-weight: 900;\n  color: rgb(0, 0, 0);\n  border: var(--border);\n  box-sizing: border-box;\n  transition: background-color 0.2s ease-in-out;\n}\n\n.container {\n  display: grid;\n  justify-items: center;\n  gap: 50px;\n  width: 100vw;\n}\n.container .title {\n  padding-top: 100px;\n  font-size: 5em;\n  font-weight: 900;\n}\n.container .boards {\n  display: flex;\n  justify-content: center;\n  gap: 3em;\n  flex-wrap: wrap;\n  flex-shrink: 0;\n}\n\n.computer {\n  cursor: pointer;\n}\n.computer > div#cell:hover {\n  background-color: rgb(70, 187, 246);\n}\n\n.board {\n  display: grid;\n  width: calc(20vw + 150px);\n  height: calc(20vw + 150px);\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n  border: var(--border);\n  box-shadow: var(--shadow);\n  background-color: var(--boards);\n}\n\n.playerModal {\n  transform: translate(-50%, -50%) scale(0);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  z-index: 2;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--playerModal);\n  gap: 30px;\n  padding: 40px;\n  font-size: 35px;\n  border-radius: 20px;\n  color: white;\n}\n.playerModal .welcome {\n  font-weight: 900;\n}\n.playerModal span.ship {\n  text-decoration: underline;\n}\n.playerModal .boardModal {\n  width: 20vw;\n  height: 20vw;\n}\n.playerModal button {\n  padding: 10px 15px;\n  border-radius: 10px;\n  background-color: rgb(182, 182, 32);\n  font-weight: 900;\n  font-size: 20px;\n}\n.playerModal.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.overlay {\n  display: none;\n  width: 100%; /* Full width */\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: rgba(37, 53, 55, 0.3);\n  align-content: center;\n}\n.overlay.active {\n  display: block;\n}\n\n.red {\n  background-color: rgb(240, 62, 13);\n}\n\n.blue {\n  background-color: rgb(90, 197, 255);\n}\n\n#gray {\n  background-color: gray;\n}\n\n#hit {\n  background-color: var(--hit);\n}\n\n#miss {\n  background-color: var(--miss);\n}\n\n.endGameModal {\n  transform: translate(-50%, -50%) scale(0);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  z-index: 2;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--playerModal);\n  gap: 30px;\n  padding: 40px;\n  font-size: 25px;\n  border-radius: 20px;\n  color: white;\n}\n.endGameModal .welcome {\n  font-weight: 900;\n}\n.endGameModal span.ship {\n  text-decoration: underline;\n}\n.endGameModal button {\n  padding: 10px 15px;\n  border-radius: 10px;\n  background-color: rgb(182, 182, 32);\n  font-weight: 900;\n}\n.endGameModal.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.mode {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background-color: rgb(36, 90, 107);\n  padding: 4px;\n  border-radius: 50px;\n  gap: 15px;\n  cursor: pointer;\n  transition: all 200ms ease-in-out;\n  color: white;\n}\n.mode .ball {\n  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);\n  padding: 15px;\n  border-radius: 50%;\n  background-color: rgb(255, 255, 255);\n  position: absolute;\n  left: 0;\n  transition: transform 200ms ease-in-out;\n}\n.mode.clicked {\n  color: rgb(0, 0, 0);\n  background-color: rgb(230, 230, 230);\n}\n.mode.clicked .ball {\n  transform: translateX(43px);\n}/*# sourceMappingURL=style.css.map */", "",{"version":3,"sources":["webpack://./src/styles/style.scss","webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA;EACE,oBAAA;EACA,2DAAA;ACCF;ADCA;EACE,0EAAA;EACA,yCAAA;EACA;mCAAA;EAEA,yBAAA;EACA,8BAAA;EACA,kCAAA;EACA,sCAAA;EACA,uBAAA;EACA,wBAAA;EACA,cAAA;ACCF;;ADCA;EACE,0EAAA;EACA,yCAAA;EACA;mCAAA;EAEA,4BAAA;EACA,8BAAA;EACA,wBAAA;EACA,yBAAA;EACA,UAAA;EACA,yBAAA;EACA,cAAA;ACEF;;ADAA;EACE,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,wBAAA;EACA,wCAAA;EACA,mBAAA;EACA,oBAAA;ACGF;;ADDA;EACE,eAAA;EACA,gBAAA;EACA,mBAAA;EACA,qBAAA;EACA,sBAAA;EACA,6CAAA;ACIF;;ADFA;EACE,aAAA;EACA,qBAAA;EACA,SAAA;EACA,YAAA;ACKF;ADJE;EACE,kBAAA;EACA,cAAA;EACA,gBAAA;ACMJ;ADJE;EACE,aAAA;EACA,uBAAA;EACA,QAAA;EACA,eAAA;EACA,cAAA;ACMJ;;ADHA;EACE,eAAA;ACMF;ADLE;EACE,mCAAA;ACOJ;;ADJA;EACE,aAAA;EACA,yBAAA;EACA,0BAAA;EACA,mCAAA;EACA,sCAAA;EACA,qBAAA;EACA,yBAAA;EACA,+BAAA;ACOF;;ADLA;EACE,yCAAA;EACA,eAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,oCAAA;EACA,SAAA;EACA,aAAA;EACA,eAAA;EACA,mBAAA;EACA,YAAA;ACQF;ADPE;EACE,gBAAA;ACSJ;ADPE;EACE,0BAAA;ACSJ;ADPE;EACE,WAAA;EACA,YAAA;ACSJ;ADPE;EACE,kBAAA;EACA,mBAAA;EACA,mCAAA;EACA,gBAAA;EACA,eAAA;ACSJ;ADPE;EACE,yCAAA;ACSJ;;ADLA;EACE,aAAA;EACA,WAAA,EAAA,eAAA;EACA,YAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,uCAAA;EACA,qBAAA;ACQF;ADPE;EACE,cAAA;ACSJ;;ADNA;EACE,kCAAA;ACSF;;ADPA;EACE,mCAAA;ACUF;;ADRA;EACE,sBAAA;ACWF;;ADTA;EACE,4BAAA;ACYF;;ADVA;EACE,6BAAA;ACaF;;ADXA;EACE,yCAAA;EACA,eAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,oCAAA;EACA,SAAA;EACA,aAAA;EACA,eAAA;EACA,mBAAA;EACA,YAAA;ACcF;ADbE;EACE,gBAAA;ACeJ;ADbE;EACE,0BAAA;ACeJ;ADbE;EACE,kBAAA;EACA,mBAAA;EACA,mCAAA;EACA,gBAAA;ACeJ;ADbE;EACE,yCAAA;ACeJ;;ADZA;EAEE,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,kCAAA;EACA,YAAA;EACA,mBAAA;EACA,SAAA;EACA,eAAA;EACA,iCAAA;EACA,YAAA;ACcF;ADbE;EACE,+CAAA;EACA,aAAA;EACA,kBAAA;EACA,oCAAA;EACA,kBAAA;EACA,OAAA;EACA,uCAAA;ACeJ;ADbE;EACE,mBAAA;EACA,oCAAA;ACeJ;ADbE;EACE,2BAAA;ACeJ,CAAA,oCAAA","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/fonts/Norse-Bold.otf":
/*!**********************************!*\
  !*** ./src/fonts/Norse-Bold.otf ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5efe60ef5042faec1224.otf";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0eWxlLmNzcz9mZjk0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9mYWN0b3JpZXMvR2FtZWJvYXJkXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2ZhY3Rvcmllcy9QbGF5ZXJcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL2ZhY3Rvcmllcy9TaGlwXCI7XG5pbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyLCBnYW1lYm9hcmQgfSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL2dhbWVDb250cm9sbGVyXCI7XG5cbmNvbnN0IFVJID0gKCgpID0+IHtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XG4gIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcbiAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKDIpO1xuICBzaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0KTtcbiAgbGV0IHhBeGlzID0gdHJ1ZTtcblxuICBmdW5jdGlvbiBpbml0aWFsVUkoKSB7XG4gICAgY29uc3QgYm9hcmQxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJcIik7XG4gICAgY29uc3QgYm9hcmQyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlclwiKTtcbiAgICBtYWtlQm9hcmQoYm9hcmQxKTtcbiAgICBtYWtlQm9hcmQoYm9hcmQyKTtcbiAgICBkaXNwbGF5UGxheWVyTW9kYWwoKTtcbiAgICAvLyBpbml0aWFsaXplRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuICBmdW5jdGlvbiBkaXNwbGF5UGxheWVyTW9kYWwoKSB7XG4gICAgY29uc3QgcGxheWVyTW9kYWwgPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJNb2RhbCcpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgcGxheWVyTW9kYWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkTW9kYWxcIik7XG4gICAgbWFrZUJvYXJkKGJvYXJkKTtcbiAgICBpbml0aWFsaXplTW9kYWxFdmVudExpc3RlbmVycygpO1xuICB9XG4gIGZ1bmN0aW9uIGluaXRpYWxpemVNb2RhbEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZE1vZGFsXCIpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm90YXRlXCIpO1xuICAgIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBcIik7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBib2FyZC5jaGlsZHJlbikge1xuICAgICAgY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBjZWxsSG92ZXJlZCk7XG4gICAgICBjaGlsZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kYWxCb2FyZENsaWNrKTtcbiAgICB9XG4gICAgYnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICB4QXhpcyA9ICF4QXhpcztcbiAgICB9O1xuICB9XG5cbiAgLy8gZnVuY3Rpb24gY2xlYXJHYW1lQm9hcmQoYm9hcmQpIHtcbiAgLy8gICAvLyBib2FyZC5pbm5lckhUTUwgPSAnJztcbiAgLy8gfVxuICBmdW5jdGlvbiBkaXNwbGF5U2hpcHMoZ2FtZWJkLCBuYW1lKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYmQuc2l6ZTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWViZC5zaXplOyBqKyspIHtcbiAgICAgICAgY29uc3QgZGF0YUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuJHtuYW1lfT5bZGF0YS14PVwiJHtpfVwiXVtkYXRhLXk9XCIke2p9XCJdYFxuICAgICAgICApO1xuICAgICAgICBpZiAoZ2FtZWJkLmJvYXJkW2ldW2pdKSB7XG4gICAgICAgICAgZGF0YUNlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJncmF5XCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGRpc3BsYXlHYW1lQm9hcmQoZ2FtZWJkLCBuYW1lKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYmQuc2l6ZTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWViZC5zaXplOyBqKyspIHtcbiAgICAgICAgY29uc3QgZGF0YUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuJHtuYW1lfT5bZGF0YS14PVwiJHtpfVwiXVtkYXRhLXk9XCIke2p9XCJdYFxuICAgICAgICApO1xuICAgICAgICBpZiAoZ2FtZWJkLnN0b3JhZ2VbaV1bal0gPT09IDEpIHtcbiAgICAgICAgICBkYXRhQ2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1pc3NcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2FtZWJkLnN0b3JhZ2VbaV1bal0gPT09IDIpIHtcbiAgICAgICAgICBkYXRhQ2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImhpdFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBjbGVhckNsYXNzZXMoYm9hcmQpIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGJvYXJkLmNoaWxkcmVuKSB7XG4gICAgICBjaGlsZC5jbGFzc0xpc3QgPSBjaGlsZC5jbGFzc0xpc3RbMF07XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNlbGxDbGlja2VkKGUpIHtcbiAgICBjb25zdCBib2FyZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZE1vZGFsXCIpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJcIik7XG4gICAgY29uc3QgeCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQueCwgMTApO1xuICAgIGNvbnN0IHkgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnksIDEwKTtcbiAgICBpZiAoXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50ID09PSBib2FyZE1vZGFsIHx8XG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50ID09PSBwbGF5ZXJCb2FyZFxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoY29tcHV0ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW3gsIHldKSkge1xuICAgICAgZGlzcGxheUdhbWVCb2FyZChjb21wdXRlci5nYW1lYm9hcmQsIFwiY29tcHV0ZXJcIik7XG4gICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnJhbmRvbUF0dGFjaygpO1xuICAgICAgZGlzcGxheUdhbWVCb2FyZChwbGF5ZXIuZ2FtZWJvYXJkLCBcInBsYXllclwiKTtcbiAgICB9XG4gICAgaWYgKHBsYXllci5nYW1lYm9hcmQuaXNHYW1lT3ZlcigpIHx8IGNvbXB1dGVyLmdhbWVib2FyZC5pc0dhbWVPdmVyKCkpIHtcbiAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG4gICAgICBjb25zdCBlbmRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW5kR2FtZU1vZGFsXCIpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRcIik7XG4gICAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN0YXJ0XCIpO1xuICAgICAgZGlzcGxheVNoaXBzKGNvbXB1dGVyLmdhbWVib2FyZCwgXCJjb21wdXRlclwiKTtcbiAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgIGVuZE1vZGFsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICBwbGF5ZXIuZ2FtZWJvYXJkLmlzR2FtZU92ZXIoKVxuICAgICAgICA/IChyZXN1bHQudGV4dENvbnRlbnQgPSBcIllvdSBMb3NlXCIpXG4gICAgICAgIDogKHJlc3VsdC50ZXh0Q29udGVudCA9IFwiWW91IFdvblwiKTtcbiAgICAgIHJlc3RhcnRCdXR0b24ub25jbGljayA9ICgpID0+IHJlc3RhcnQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnYW1lU3RhcnQoKSB7XG4gICAgY29tcHV0ZXIucmFuZG9tUGxhY2VTaGlwcygpO1xuICAgIGRpc3BsYXlTaGlwcyhwbGF5ZXIuZ2FtZWJvYXJkLCBcInBsYXllclwiKTtcbiAgICAvLyBnYW1lTG9vcCgpO1xuICB9XG4gIGZ1bmN0aW9uIG1vZGFsQm9hcmRDbGljayhlKSB7XG4gICAgY29uc3QgcGxheWVyTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllck1vZGFsXCIpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG4gICAgY29uc3QgeCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQueCwgMTApO1xuICAgIGNvbnN0IHkgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnksIDEwKTtcbiAgICBpZiAoZ2FtZWJvYXJkLnBsYWNlU2hpcChbeCwgeV0sIHNoaXBzW3NoaXBzLmxlbmd0aCAtIDFdLCB4QXhpcykpIHtcbiAgICAgIGRpc3BsYXlTaGlwcyhnYW1lYm9hcmQsIFwiYm9hcmRNb2RhbFwiKTtcbiAgICAgIHNoaXBzLnBvcCgpO1xuICAgIH1cbiAgICBpZiAoc2hpcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyByZW1vdmUgbW9kYWxcbiAgICAgIHBsYXllck1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkID0gZ2FtZWJvYXJkLmJvYXJkO1xuICAgICAgZ2FtZVN0YXJ0KCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNlbGxIb3ZlcmVkKGUpIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRNb2RhbFwiKTtcbiAgICBjbGVhckNsYXNzZXMoYm9hcmQpO1xuICAgIGlmIChlLnRhcmdldC5wYXJlbnRFbGVtZW50ICE9PSBib2FyZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB4ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC54LCAxMCk7XG4gICAgY29uc3QgeSA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQueSwgMTApO1xuICAgIGxldCBkYXRhQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLmJvYXJkTW9kYWw+W2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWBcbiAgICApO1xuICAgIGlmIChnYW1lYm9hcmQuaXNQbGFjZW1lbnRQb3NzaWJsZShzaGlwc1tzaGlwcy5sZW5ndGggLSAxXSwgW3gsIHldLCB4QXhpcykpIHtcbiAgICAgIGdhbWVib2FyZFxuICAgICAgICAuZ2V0U2hpcENvb3JkcyhbeCwgeV0sIHNoaXBzW3NoaXBzLmxlbmd0aCAtIDFdLCB4QXhpcylcbiAgICAgICAgLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICAgICAgZGF0YUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYC5ib2FyZE1vZGFsPltkYXRhLXg9XCIke2Nvb3JkWzBdfVwiXVtkYXRhLXk9XCIke2Nvb3JkWzFdfVwiXWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGRhdGFDZWxsLmNsYXNzTGlzdC5hZGQoXCJibHVlXCIpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgZGF0YUNlbGwuY2xhc3NMaXN0LmFkZChcInJlZFwiKTtcbiAgfVxuICAvLyBjb25zdCBnZXREYXRhQ2VsbCA9ICh4LCB5KSA9PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gKVxuXG4gIGZ1bmN0aW9uIG1ha2VCb2FyZChib2FyZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgICBjZWxsLmRhdGFzZXQueCA9IGk7XG4gICAgICAgIGNlbGwuZGF0YXNldC55ID0gajtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNlbGxcIik7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNlbGxDbGlja2VkKTtcbiAgICAgICAgLy8gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBjZWxsSG92ZXJlZCk7XG4gICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAvLyBub3Qgd29ya2luZ1xuICAgIC8vIGNvbnN0IGVuZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbmRHYW1lTW9kYWxcIik7XG4gICAgLy8gY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyJyk7XG4gICAgLy8gY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlcicpO1xuICAgIC8vIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG4gICAgLy8gcGxheWVyQm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gICAgLy8gY29tcHV0ZXJCb2FyZC5pbm5lckhUTUwgPSAnJztcbiAgICAvLyBlbmRNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIC8vIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgLy8gcGxheWVyLmdhbWVib2FyZC5jbGVhcigpO1xuICAgIC8vIGNvbXB1dGVyLmdhbWVib2FyZC5jbGVhcigpO1xuICAgIC8vIGdhbWVib2FyZC5jbGVhcigpO1xuICAgIC8vIGluaXRpYWxVSSgpO1xuICB9XG4gIHJldHVybiB7IGluaXRpYWxVSSwgZGlzcGxheUdhbWVCb2FyZCwgZGlzcGxheVNoaXBzIH07XG59KSgpO1xuZXhwb3J0IGRlZmF1bHQgVUk7XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGJvYXJkID0gW107IC8vIGJvYXJkIHRvIHN0b3JlIHNoaXBzXG5cbiAgLy8gMCBpcyB1bm1hcmtlZCwgMSBpcyBtaXNzZWQsIDIgaXMgaGl0XG4gIHN0b3JhZ2UgPSBbXTsgLy8gYm9hcmQgdG8gc3RvcmUgbWlzc2VzIGFuZCBhdHRhY2tzXG5cbiAgY29uc3RydWN0b3Ioc2l6ZSkge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBpbml0aWFsaXplKCl7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpemU7IGkrKykge1xuICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICBjb25zdCBhcnIyID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2l6ZTsgaisrKSB7XG4gICAgICAgIGFyci5wdXNoKDApO1xuICAgICAgICBhcnIyLnB1c2goMCk7XG4gICAgICB9XG4gICAgICB0aGlzLmJvYXJkLnB1c2goYXJyKTtcbiAgICAgIHRoaXMuc3RvcmFnZS5wdXNoKGFycjIpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyKCl7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIHRoaXMuc3RvcmFnZSA9IFtdXG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBwbGFjZVNoaXAoY29vcmQsIHNoaXAsIHhBeGlzKSB7XG4gICAgaWYgKCF0aGlzLmlzUGxhY2VtZW50UG9zc2libGUoc2hpcCwgY29vcmQsIHhBeGlzKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh4QXhpcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbY29vcmRbMF1dW2Nvb3JkWzFdICsgaV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtjb29yZFswXSArIGldW2Nvb3JkWzFdXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNQbGFjZW1lbnRQb3NzaWJsZShzaGlwLCBjb29yZCwgeEF4aXMpIHtcbiAgICBjb25zdCB4ID0gY29vcmRbMF07XG4gICAgY29uc3QgeSA9IGNvb3JkWzFdO1xuICAgIGNvbnN0IHsgc2l6ZSB9ID0gdGhpcztcbiAgICAvLyBwb3NpdGlvbiBpcyBvdXQgb2YgYm91bmRzXG4gICAgaWYgKHggPCAwIHx8IHggPiBzaXplIC0gMSB8fCB5IDwgMCB8fCB5ID4gc2l6ZSAtIDEpIHJldHVybiBmYWxzZTtcbiAgICAvLyBzaGlwIGRvZXNuJ3QgZml0IG9uIGJvYXJkXG4gICAgaWYgKHhBeGlzKSB7XG4gICAgICBpZiAoeSArIHNoaXAubGVuZ3RoID4gc2l6ZSkgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoeCArIHNoaXAubGVuZ3RoID4gc2l6ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGlmIHRoZSBib2FyZCB2YWx1ZSBhbHJlYWR5IGhhcyBzaGlwIHJldHVybiBmYWxzZVxuICAgIGlmICh4QXhpcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3hdW3kraV0pIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3graV1beV0pIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IHsgc2l6ZSB9ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbaV1bal0gIT09IDApIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgLy8gZm9yIGNvbXB1dGVyXG4gIHJhbmRvbVBsYWNlU2hpcHMoKSB7XG4gICAgaWYgKCF0aGlzLmlzRW1wdHkoKSkgcmV0dXJuXG4gICAgY29uc3Qgc2hpcHMgPSBbXVxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KVxuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KVxuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDMpXG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMylcbiAgICBjb25zdCBwYXRyb2xCb2F0ID0gbmV3IFNoaXAoMilcbiAgICBzaGlwcy5wdXNoKGNhcnJpZXIsIGJhdHRsZXNoaXAsIGRlc3Ryb3llciwgc3VibWFyaW5lLCBwYXRyb2xCb2F0KVxuXG4gICAgbGV0IHN1Y2Nlc2Z1bFBsYWNlbWVudHMgPSAwXG5cbiAgICB3aGlsZSAoc3VjY2VzZnVsUGxhY2VtZW50cyA8IDUpIHtcbiAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcbiAgICAgIGNvbnN0IHhBeGlzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMikgPT09IDFcblxuICAgICAgaWYgKHRoaXMucGxhY2VTaGlwKFt4LHldLCBzaGlwc1tzdWNjZXNmdWxQbGFjZW1lbnRzXSx4QXhpcykpe1xuICAgICAgICBzdWNjZXNmdWxQbGFjZW1lbnRzKys7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZCkge1xuICAgIGNvbnN0IHggPSBjb29yZFswXTtcbiAgICBjb25zdCB5ID0gY29vcmRbMV07XG5cbiAgICBpZiAodGhpcy5jYW5BdHRhY2soY29vcmQpKSB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSB0aGlzLmJvYXJkW3hdW3ldO1xuICAgICAgaWYgKGJvYXJkQ2VsbCkge1xuICAgICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xuICAgICAgICB0aGlzLnN0b3JhZ2VbeF1beV0gPSAyO1xuICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gaGl0XG4gICAgICB9XG4gICAgICB0aGlzLnN0b3JhZ2VbeF1beV0gPSAxO1xuICAgICAgcmV0dXJuIHRydWU7IC8vIG1pc3NlZFxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7IC8vIGNsaWNrZWQgb24gY2VsbCB3aXRoIHRoaW5nIGluc2lkZVxuICB9XG5cbiAgcmFuZG9tQXR0YWNrKCkge1xuICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcbiAgICB3aGlsZSAodGhpcy5zdG9yYWdlW3hdW3ldKSB7XG4gICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gICAgfVxuICAgIHRoaXMucmVjZWl2ZUF0dGFjayhbeCwgeV0pXG4gIH1cblxuICBjYW5BdHRhY2soY29vcmQpIHtcbiAgICBjb25zdCB4ID0gY29vcmRbMF07XG4gICAgY29uc3QgeSA9IGNvb3JkWzFdO1xuICAgIGNvbnN0IHsgc2l6ZSB9ID0gdGhpcztcbiAgICAvLyBwb3NpdGlvbiBpcyBvdXQgb2YgYm91bmRzXG4gICAgaWYgKHggPCAwIHx8IHggPiBzaXplIC0gMSB8fCB5IDwgMCB8fCB5ID4gc2l6ZSAtIDEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzdG9yYWdlQ2VsbCA9IHRoaXMuc3RvcmFnZVt4XVt5XTtcbiAgICByZXR1cm4gIXN0b3JhZ2VDZWxsO1xuICB9XG5cbiAgZ2V0U2hpcENvb3Jkcyhjb29yZCwgc2hpcCwgeEF4aXMpIHtcbiAgICBjb25zdCByZXN1bHQgPVtdO1xuICAgIGlmICh4QXhpcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKFtjb29yZFswXSwgY29vcmRbMV0raV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goW2Nvb3JkWzBdK2ksIGNvb3JkWzFdXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpc0dhbWVPdmVyKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5zaXplOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbaV1bal0pIHtcbiAgICAgICAgICBpZiAoIXRoaXMuYm9hcmRbaV1bal0uaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxufVxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgcGxheWluZywgc2l6ZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wbGF5aW5nID0gcGxheWluZztcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoc2l6ZSk7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3JkKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpO1xuICB9XG5cbiAgcmFuZG9tQXR0YWNrKCkge3RoaXMuZ2FtZWJvYXJkLnJhbmRvbUF0dGFjaygpfVxuXG4gIGVuZFR1cm4oKSB7XG4gICAgdGhpcy5wbGF5aW5nID0gIXRoaXMucGxheWluZztcbiAgfVxuXG4gIHBsYWNlU2hpcChjb29yZCwgc2hpcCwgeEF4aXMpe1xuICAgIHJldHVybiB0aGlzLmdhbWVib2FyZC5wbGFjZVNoaXAoY29vcmQsIHNoaXAsIHhBeGlzKTtcbiAgfVxuXG4gIHJhbmRvbVBsYWNlU2hpcHMoKXt0aGlzLmdhbWVib2FyZC5yYW5kb21QbGFjZVNoaXBzKCl9O1xuXG4gIGlzUGxhY2VtZW50UG9zc2libGUoc2hpcCwgY29vcmQsIHhBeGlzKXtcbiAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmQuaXNQbGFjZW1lbnRQb3NzaWJsZShzaGlwLCBjb29yZCwgeEF4aXMpO1xuICB9XG5cbiAgZ2V0U2hpcENvb3Jkcyhjb29yZCwgc2hpcCwgeEF4aXMpe3JldHVybiB0aGlzLmdhbWVib2FyZC5nZXRTaGlwQ29vcmRzKCBjb29yZCwgc2hpcCwgeEF4aXMpfTtcbn1cbiIsIlxuY29uc3QgU2hpcCA9IChsZW5ndGggPSBudWxsKT0+e1xuICAgIGxldCBoaXRzID0wO1xuICAgIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzO1xuICAgIGZ1bmN0aW9uIGhpdCgpe1xuICAgICAgICBpZihoaXRzPj1sZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGhpdHMrKztcbiAgICB9XG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4gaGl0cyA+PSBsZW5ndGg7XG4gICAgcmV0dXJuIHtsZW5ndGgsZ2V0SGl0cywgaGl0LCBpc1N1bmt9O1xufVxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZmFjdG9yaWVzL0dhbWVib2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vZmFjdG9yaWVzL1BsYXllcic7XG5pbXBvcnQgU2hpcCBmcm9tICcuL2ZhY3Rvcmllcy9TaGlwJztcbmltcG9ydCBVSSBmcm9tICcuL1VJJztcbmltcG9ydCB7IHBsYXllciwgY29tcHV0ZXJ9IGZyb20gXCIuL2luZGV4XCI7XG5cbmNvbnN0IGdhbWVDb250cm9sbGVyID0gKCgpID0+IHtcbiAgICBmdW5jdGlvbiBnYW1lU3RhcnQoKXtcbiAgICAgICAgLy8gbWF5YmUgcHV0IHRoaXMgaW4gVUlcbiAgICAgICAgY29tcHV0ZXIucmFuZG9tUGxhY2VTaGlwcygpO1xuICAgICAgICBVSS5kaXNwbGF5U2hpcHMocGxheWVyLmdhbWVib2FyZCwgJ3BsYXllcicpO1xuICAgICAgICBVSS5kaXNwbGF5U2hpcHMoY29tcHV0ZXIuZ2FtZWJvYXJkLCAnY29tcHV0ZXInKTtcbiAgICAgICAgZ2FtZUxvb3AoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2FtZUxvb3AoKXtcbiAgICAgICAgd2hpbGUoIXBsYXllci5nYW1lYm9hcmQuaXNHYW1lT3ZlciAmJiAhY29tcHV0ZXIuZ2FtZWJvYXJkLmlzR2FtZU92ZXIpe1xuICAgICAgICAgICAgaWYocGxheWVyLnBsYXlpbmcpe1xuICAgICAgICAgICAgICAgIHBsYXllclxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtnYW1lU3RhcnR9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbnRyb2xsZXI7IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2ZhY3Rvcmllcy9HYW1lYm9hcmQnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL2ZhY3Rvcmllcy9QbGF5ZXInO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9mYWN0b3JpZXMvU2hpcCc7XG5pbXBvcnQgVUkgZnJvbSAnLi9VSSc7XG5pbXBvcnQgJy4vc3R5bGVzL3N0eWxlLmNzcyc7XG5cbmV4cG9ydCBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCdwMScsIHRydWUsIDEwKTtcbmV4cG9ydCBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoJ2NvbXB1dGVyJywgZmFsc2UsIDEwKTtcbmV4cG9ydCBjb25zdCBnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKDEwKTtcbmNvbnN0IG1vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZScpO1xubW9kZS5vbmNsaWNrID0gKCk9PntcbiAgICBtb2RlLmNsYXNzTGlzdC50b2dnbGUoJ2NsaWNrZWQnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2xpZ2h0Jyk7XG4gIH1cbiAgXG5VSS5pbml0aWFsVUkoKTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuLi9mb250cy9Ob3JzZS1Cb2xkLm90ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJOb3JzZVxcXCI7XFxuICBzcmM6IGxvY2FsKFxcXCJOb3JzZVxcXCIpIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxufVxcbjpyb290IHtcXG4gIC0tc2hhZG93OiAwIDRweCA2cHggLTFweCByZ2IoMCAwIDAgLyAwLjEpLCAwIDJweCA0cHggLTJweCByZ2IoMCAwIDAgLyAwLjEpO1xcbiAgLS1zaGFkb3cyOiAycHggMHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICAtLXNoYWRvdy1sZzogMnB4IDEwcHggMTVweCAxMHB4IHJnYigwIDAgMCAvIDAuNCksXFxuICAgIDAgNHB4IDZweCAtNHB4IHJnYigwIDAgMCAvIDAuMSk7XFxuICAtLWJvYXJkczogcmdiKDMxLCAzMCwgMzApO1xcbiAgLS1wbGF5ZXJNb2RhbDogcmdiKDUxLCA2OSwgNzApO1xcbiAgLS1iYWNrZ3JvdW5kQ29sb3I6IHJnYig5NSwgODgsIDg4KTtcXG4gIC0tYm9yZGVyOiAxcHggc29saWQgcmdiKDI1NSwgMjU1LCAyNTUpO1xcbiAgLS1oaXQ6IHJnYigxNzksIDI0LCAyNCk7XFxuICAtLW1pc3M6IHJnYigzNCwgMTY5LCA4MSk7XFxuICAtLWNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuYm9keS5saWdodCB7XFxuICAtLXNoYWRvdzogMCA0cHggNnB4IC0xcHggcmdiKDAgMCAwIC8gMC4xKSwgMCAycHggNHB4IC0ycHggcmdiKDAgMCAwIC8gMC4xKTtcXG4gIC0tc2hhZG93MjogMnB4IDBweCAycHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgLS1zaGFkb3ctbGc6IDJweCAxMHB4IDE1cHggMTBweCByZ2IoMCAwIDAgLyAwLjQpLFxcbiAgICAwIDRweCA2cHggLTRweCByZ2IoMCAwIDAgLyAwLjEpO1xcbiAgLS1ib2FyZHM6IHJnYigyNDEsIDIzNywgMjM3KTtcXG4gIC0tcGxheWVyTW9kYWw6IHJnYigzNywgNTMsIDU1KTtcXG4gIC0tYmFja2dyb3VuZENvbG9yOiB3aGl0ZTtcXG4gIC0tYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAtLWhpdDogcmVkO1xcbiAgLS1taXNzOiByZ2IoNzEsIDI1NCwgMTM1KTtcXG4gIC0tY29sb3I6IGJsYWNrO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kQ29sb3IpO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yKTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTm9yc2VcXFwiO1xcbn1cXG5cXG4uY2VsbCB7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIGJvcmRlcjogdmFyKC0tYm9yZGVyKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogNTBweDtcXG4gIHdpZHRoOiAxMDB2dztcXG59XFxuLmNvbnRhaW5lciAudGl0bGUge1xcbiAgcGFkZGluZy10b3A6IDEwMHB4O1xcbiAgZm9udC1zaXplOiA1ZW07XFxuICBmb250LXdlaWdodDogOTAwO1xcbn1cXG4uY29udGFpbmVyIC5ib2FyZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAzZW07XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBmbGV4LXNocmluazogMDtcXG59XFxuXFxuLmNvbXB1dGVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmNvbXB1dGVyID4gZGl2I2NlbGw6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDcwLCAxODcsIDI0Nik7XFxufVxcblxcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgd2lkdGg6IGNhbGMoMjB2dyArIDE1MHB4KTtcXG4gIGhlaWdodDogY2FsYygyMHZ3ICsgMTUwcHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGJvcmRlcjogdmFyKC0tYm9yZGVyKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXNoYWRvdyk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ib2FyZHMpO1xcbn1cXG5cXG4ucGxheWVyTW9kYWwge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCk7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHotaW5kZXg6IDI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBsYXllck1vZGFsKTtcXG4gIGdhcDogMzBweDtcXG4gIHBhZGRpbmc6IDQwcHg7XFxuICBmb250LXNpemU6IDM1cHg7XFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4ucGxheWVyTW9kYWwgLndlbGNvbWUge1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG59XFxuLnBsYXllck1vZGFsIHNwYW4uc2hpcCB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuLnBsYXllck1vZGFsIC5ib2FyZE1vZGFsIHtcXG4gIHdpZHRoOiAyMHZ3O1xcbiAgaGVpZ2h0OiAyMHZ3O1xcbn1cXG4ucGxheWVyTW9kYWwgYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgyLCAxODIsIDMyKTtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBmb250LXNpemU6IDIwcHg7XFxufVxcbi5wbGF5ZXJNb2RhbC5hY3RpdmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSk7XFxufVxcblxcbi5vdmVybGF5IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB3aWR0aDogMTAwJTsgLyogRnVsbCB3aWR0aCAqL1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzcsIDUzLCA1NSwgMC4zKTtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLm92ZXJsYXkuYWN0aXZlIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4ucmVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDYyLCAxMyk7XFxufVxcblxcbi5ibHVlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig5MCwgMTk3LCAyNTUpO1xcbn1cXG5cXG4jZ3JheSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbn1cXG5cXG4jaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhpdCk7XFxufVxcblxcbiNtaXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1pc3MpO1xcbn1cXG5cXG4uZW5kR2FtZU1vZGFsIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB6LWluZGV4OiAyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wbGF5ZXJNb2RhbCk7XFxuICBnYXA6IDMwcHg7XFxuICBwYWRkaW5nOiA0MHB4O1xcbiAgZm9udC1zaXplOiAyNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuLmVuZEdhbWVNb2RhbCAud2VsY29tZSB7XFxuICBmb250LXdlaWdodDogOTAwO1xcbn1cXG4uZW5kR2FtZU1vZGFsIHNwYW4uc2hpcCB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuLmVuZEdhbWVNb2RhbCBidXR0b24ge1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxODIsIDE4MiwgMzIpO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG59XFxuLmVuZEdhbWVNb2RhbC5hY3RpdmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSk7XFxufVxcblxcbi5tb2RlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDM2LCA5MCwgMTA3KTtcXG4gIHBhZGRpbmc6IDRweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxuICBnYXA6IDE1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbi5tb2RlIC5iYWxsIHtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcbi5tb2RlLmNsaWNrZWQge1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzAsIDIzMCwgMjMwKTtcXG59XFxuLm1vZGUuY2xpY2tlZCAuYmFsbCB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDNweCk7XFxufS8qIyBzb3VyY2VNYXBwaW5nVVJMPXN0eWxlLmNzcy5tYXAgKi9cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3N0eWxlLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usb0JBQUE7RUFDQSwyREFBQTtBQ0NGO0FEQ0E7RUFDRSwwRUFBQTtFQUNBLHlDQUFBO0VBQ0E7bUNBQUE7RUFFQSx5QkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0NBQUE7RUFDQSxzQ0FBQTtFQUNBLHVCQUFBO0VBQ0Esd0JBQUE7RUFDQSxjQUFBO0FDQ0Y7O0FEQ0E7RUFDRSwwRUFBQTtFQUNBLHlDQUFBO0VBQ0E7bUNBQUE7RUFFQSw0QkFBQTtFQUNBLDhCQUFBO0VBQ0Esd0JBQUE7RUFDQSx5QkFBQTtFQUNBLFVBQUE7RUFDQSx5QkFBQTtFQUNBLGNBQUE7QUNFRjs7QURBQTtFQUNFLFNBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7RUFDQSx3QkFBQTtFQUNBLHdDQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtBQ0dGOztBRERBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0EsNkNBQUE7QUNJRjs7QURGQTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0FDS0Y7QURKRTtFQUNFLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FDTUo7QURKRTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQ01KOztBREhBO0VBQ0UsZUFBQTtBQ01GO0FETEU7RUFDRSxtQ0FBQTtBQ09KOztBREpBO0VBQ0UsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsMEJBQUE7RUFDQSxtQ0FBQTtFQUNBLHNDQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtFQUNBLCtCQUFBO0FDT0Y7O0FETEE7RUFDRSx5Q0FBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0NBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUNRRjtBRFBFO0VBQ0UsZ0JBQUE7QUNTSjtBRFBFO0VBQ0UsMEJBQUE7QUNTSjtBRFBFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUNTSjtBRFBFO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1DQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FDU0o7QURQRTtFQUNFLHlDQUFBO0FDU0o7O0FETEE7RUFDRSxhQUFBO0VBQ0EsV0FBQSxFQUFBLGVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLHVDQUFBO0VBQ0EscUJBQUE7QUNRRjtBRFBFO0VBQ0UsY0FBQTtBQ1NKOztBRE5BO0VBQ0Usa0NBQUE7QUNTRjs7QURQQTtFQUNFLG1DQUFBO0FDVUY7O0FEUkE7RUFDRSxzQkFBQTtBQ1dGOztBRFRBO0VBQ0UsNEJBQUE7QUNZRjs7QURWQTtFQUNFLDZCQUFBO0FDYUY7O0FEWEE7RUFDRSx5Q0FBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0NBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUNjRjtBRGJFO0VBQ0UsZ0JBQUE7QUNlSjtBRGJFO0VBQ0UsMEJBQUE7QUNlSjtBRGJFO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1DQUFBO0VBQ0EsZ0JBQUE7QUNlSjtBRGJFO0VBQ0UseUNBQUE7QUNlSjs7QURaQTtFQUVFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQ0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0VBQ0EsaUNBQUE7RUFDQSxZQUFBO0FDY0Y7QURiRTtFQUNFLCtDQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSx1Q0FBQTtBQ2VKO0FEYkU7RUFDRSxtQkFBQTtFQUNBLG9DQUFBO0FDZUo7QURiRTtFQUNFLDJCQUFBO0FDZUosQ0FBQSxvQ0FBQVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJQbGF5ZXIiLCJTaGlwIiwicGxheWVyIiwiY29tcHV0ZXIiLCJnYW1lYm9hcmQiLCJnYW1lQ29udHJvbGxlciIsIlVJIiwic2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJwdXNoIiwieEF4aXMiLCJpbml0aWFsVUkiLCJib2FyZDEiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJib2FyZDIiLCJtYWtlQm9hcmQiLCJkaXNwbGF5UGxheWVyTW9kYWwiLCJwbGF5ZXJNb2RhbCIsIm92ZXJsYXkiLCJjbGFzc0xpc3QiLCJhZGQiLCJib2FyZCIsImluaXRpYWxpemVNb2RhbEV2ZW50TGlzdGVuZXJzIiwiYnV0dG9uIiwic2hpcCIsImNoaWxkIiwiY2hpbGRyZW4iLCJhZGRFdmVudExpc3RlbmVyIiwiY2VsbEhvdmVyZWQiLCJtb2RhbEJvYXJkQ2xpY2siLCJvbmNsaWNrIiwiZGlzcGxheVNoaXBzIiwiZ2FtZWJkIiwibmFtZSIsImkiLCJzaXplIiwiaiIsImRhdGFDZWxsIiwic2V0QXR0cmlidXRlIiwiZGlzcGxheUdhbWVCb2FyZCIsInN0b3JhZ2UiLCJjbGVhckNsYXNzZXMiLCJjZWxsQ2xpY2tlZCIsImUiLCJib2FyZE1vZGFsIiwicGxheWVyQm9hcmQiLCJ4IiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJkYXRhc2V0IiwieSIsInBhcmVudEVsZW1lbnQiLCJyZWNlaXZlQXR0YWNrIiwicmFuZG9tQXR0YWNrIiwiaXNHYW1lT3ZlciIsImVuZE1vZGFsIiwicmVzdWx0IiwicmVzdGFydEJ1dHRvbiIsInRleHRDb250ZW50IiwicmVzdGFydCIsImdhbWVTdGFydCIsInJhbmRvbVBsYWNlU2hpcHMiLCJwbGFjZVNoaXAiLCJsZW5ndGgiLCJwb3AiLCJyZW1vdmUiLCJpc1BsYWNlbWVudFBvc3NpYmxlIiwiZ2V0U2hpcENvb3JkcyIsImZvckVhY2giLCJjb29yZCIsImNlbGwiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbnN0cnVjdG9yIiwiaW5pdGlhbGl6ZSIsImFyciIsImFycjIiLCJjbGVhciIsImlzRW1wdHkiLCJzdWNjZXNmdWxQbGFjZW1lbnRzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY2FuQXR0YWNrIiwiYm9hcmRDZWxsIiwiaGl0Iiwic3RvcmFnZUNlbGwiLCJpc1N1bmsiLCJwbGF5aW5nIiwiZW5kVHVybiIsImhpdHMiLCJnZXRIaXRzIiwiZ2FtZUxvb3AiLCJtb2RlIiwidG9nZ2xlIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=