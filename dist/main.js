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
  function clearGameBoard(board) {
    // board.innerHTML = '';
  }
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"Norse\";\n  src: local(\"Norse\") url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n:root {\n  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --shadow2: 2px 0px 2px rgba(0, 0, 0, 0.2);\n  --shadow-lg: 2px 10px 15px 10px rgb(0 0 0 / 0.4),\n    0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --boards: rgb(31, 30, 30);\n  --playerModal: rgb(17, 30, 31);\n  --backgroundColor: rgb(0, 0, 0);\n  --border: 1px solid rgb(255, 255, 255);\n  --hit: rgb(179, 24, 24);\n  --miss: rgb(34, 169, 81);\n  --color: white;\n}\n\nbody.light {\n  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --shadow2: 2px 0px 2px rgba(0, 0, 0, 0.2);\n  --shadow-lg: 2px 10px 15px 10px rgb(0 0 0 / 0.4),\n    0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --boards: rgb(186, 184, 184);\n  --playerModal: rgb(37, 53, 55);\n  --backgroundColor: white;\n  --border: 1px solid black;\n  --hit: red;\n  --miss: rgb(71, 254, 135);\n  --color: black;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background-color: var(--backgroundColor);\n  color: var(--color);\n  font-family: \"Norse\";\n}\n\n.cell {\n  font-size: 20px;\n  font-weight: 900;\n  color: rgb(0, 0, 0);\n  border: var(--border);\n  box-sizing: border-box;\n}\n\n.container {\n  display: grid;\n  justify-items: center;\n  gap: 50px;\n  width: 100vw;\n}\n.container .title {\n  padding-top: 100px;\n  font-size: 7em;\n  font-weight: 900;\n}\n.container .boards {\n  display: flex;\n  justify-content: center;\n  gap: 40px;\n  flex-wrap: wrap;\n  flex-shrink: 0;\n}\n\n.computer {\n  cursor: pointer;\n}\n.computer > div#cell:hover {\n  background-color: rgb(70, 187, 246);\n}\n\n.board {\n  display: grid;\n  width: calc(20vw + 220px);\n  height: calc(20vw + 220px);\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n  border: var(--border);\n  box-shadow: var(--shadow-lg);\n  background-color: var(--boards);\n}\n\n.playerModal {\n  transform: translate(-50%, -50%) scale(0);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  z-index: 2;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--playerModal);\n  gap: 30px;\n  padding: 40px;\n  font-size: 25px;\n  border-radius: 20px;\n  color: white;\n}\n.playerModal .welcome {\n  font-weight: 900;\n}\n.playerModal span.ship {\n  text-decoration: underline;\n}\n.playerModal button {\n  padding: 10px 15px;\n  border-radius: 10px;\n  background-color: rgb(182, 182, 32);\n  font-weight: 900;\n}\n.playerModal.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.overlay {\n  display: none;\n  width: 100%; /* Full width */\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: rgba(37, 53, 55, 0.3);\n  align-content: center;\n}\n.overlay.active {\n  display: block;\n}\n\n.red {\n  background-color: rgb(240, 62, 13);\n}\n\n.blue {\n  background-color: rgb(70, 187, 246);\n}\n\n#gray {\n  background-color: gray;\n}\n\n#hit {\n  background-color: var(--hit);\n}\n\n#miss {\n  background-color: var(--miss);\n}\n\n.endGameModal {\n  transform: translate(-50%, -50%) scale(0);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  z-index: 2;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--playerModal);\n  gap: 30px;\n  padding: 40px;\n  font-size: 25px;\n  border-radius: 20px;\n  color: white;\n}\n.endGameModal .welcome {\n  font-weight: 900;\n}\n.endGameModal span.ship {\n  text-decoration: underline;\n}\n.endGameModal button {\n  padding: 10px 15px;\n  border-radius: 10px;\n  background-color: rgb(182, 182, 32);\n  font-weight: 900;\n}\n.endGameModal.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.mode {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background-color: rgb(36, 90, 107);\n  padding: 4px;\n  border-radius: 50px;\n  gap: 15px;\n  cursor: pointer;\n  transition: all 200ms ease-in-out;\n  color: white;\n}\n.mode .ball {\n  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);\n  padding: 15px;\n  border-radius: 50%;\n  background-color: rgb(255, 255, 255);\n  position: absolute;\n  left: 0;\n  transition: transform 200ms ease-in-out;\n}\n.mode.clicked {\n  color: rgb(0, 0, 0);\n  background-color: rgb(230, 230, 230);\n}\n.mode.clicked .ball {\n  transform: translateX(43px);\n}/*# sourceMappingURL=style.css.map */", "",{"version":3,"sources":["webpack://./src/styles/style.scss","webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA;EACE,oBAAA;EACA,2DAAA;ACCF;ADCA;EACE,0EAAA;EACA,yCAAA;EACA;mCAAA;EAEA,yBAAA;EACA,8BAAA;EACA,+BAAA;EACA,sCAAA;EACA,uBAAA;EACA,wBAAA;EACA,cAAA;ACCF;;ADCA;EACE,0EAAA;EACA,yCAAA;EACA;mCAAA;EAEA,4BAAA;EACA,8BAAA;EACA,wBAAA;EACA,yBAAA;EACA,UAAA;EACA,yBAAA;EACA,cAAA;ACEF;;ADAA;EACE,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,wBAAA;EACA,wCAAA;EACA,mBAAA;EACA,oBAAA;ACGF;;ADDA;EACE,eAAA;EACA,gBAAA;EACA,mBAAA;EACA,qBAAA;EACA,sBAAA;ACIF;;ADFA;EACE,aAAA;EACA,qBAAA;EACA,SAAA;EACA,YAAA;ACKF;ADJE;EACE,kBAAA;EACA,cAAA;EACA,gBAAA;ACMJ;ADJE;EACE,aAAA;EACA,uBAAA;EACA,SAAA;EACA,eAAA;EACA,cAAA;ACMJ;;ADHA;EACE,eAAA;ACMF;ADLE;EACE,mCAAA;ACOJ;;ADJA;EACE,aAAA;EACA,yBAAA;EACA,0BAAA;EACA,mCAAA;EACA,sCAAA;EACA,qBAAA;EACA,4BAAA;EACA,+BAAA;ACOF;;ADLA;EACE,yCAAA;EACA,eAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,oCAAA;EACA,SAAA;EACA,aAAA;EACA,eAAA;EACA,mBAAA;EACA,YAAA;ACQF;ADPE;EACE,gBAAA;ACSJ;ADPE;EACE,0BAAA;ACSJ;ADPE;EACE,kBAAA;EACA,mBAAA;EACA,mCAAA;EACA,gBAAA;ACSJ;ADPE;EACE,yCAAA;ACSJ;;ADLA;EACE,aAAA;EACA,WAAA,EAAA,eAAA;EACA,YAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,uCAAA;EACA,qBAAA;ACQF;ADPE;EACE,cAAA;ACSJ;;ADNA;EACE,kCAAA;ACSF;;ADPA;EACE,mCAAA;ACUF;;ADRA;EACE,sBAAA;ACWF;;ADTA;EACE,4BAAA;ACYF;;ADVA;EACE,6BAAA;ACaF;;ADXA;EACE,yCAAA;EACA,eAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,oCAAA;EACA,SAAA;EACA,aAAA;EACA,eAAA;EACA,mBAAA;EACA,YAAA;ACcF;ADbE;EACE,gBAAA;ACeJ;ADbE;EACE,0BAAA;ACeJ;ADbE;EACE,kBAAA;EACA,mBAAA;EACA,mCAAA;EACA,gBAAA;ACeJ;ADbE;EACE,yCAAA;ACeJ;;ADZA;EAEE,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,kCAAA;EACA,YAAA;EACA,mBAAA;EACA,SAAA;EACA,eAAA;EACA,iCAAA;EACA,YAAA;ACcF;ADbE;EACE,+CAAA;EACA,aAAA;EACA,kBAAA;EACA,oCAAA;EACA,kBAAA;EACA,OAAA;EACA,uCAAA;ACeJ;ADbE;EACE,mBAAA;EACA,oCAAA;ACeJ;ADbE;EACE,2BAAA;ACeJ,CAAA,oCAAA","sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL1VJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3M/ZmY5NCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZmFjdG9yaWVzL0dhbWVib2FyZFwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9mYWN0b3JpZXMvUGxheWVyXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9mYWN0b3JpZXMvU2hpcFwiO1xuaW1wb3J0IHsgcGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCBnYW1lQ29udHJvbGxlciBmcm9tIFwiLi9nYW1lQ29udHJvbGxlclwiO1xuXG5jb25zdCBVSSA9ICgoKSA9PiB7XG4gIGNvbnN0IHNoaXBzID0gW107XG4gIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQpO1xuICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBuZXcgU2hpcCgyKTtcbiAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdCk7XG4gIGxldCB4QXhpcyA9IHRydWU7XG5cbiAgZnVuY3Rpb24gaW5pdGlhbFVJKCkge1xuICAgIGNvbnN0IGJvYXJkMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyXCIpO1xuICAgIGNvbnN0IGJvYXJkMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJcIik7XG4gICAgbWFrZUJvYXJkKGJvYXJkMSk7XG4gICAgbWFrZUJvYXJkKGJvYXJkMik7XG4gICAgZGlzcGxheVBsYXllck1vZGFsKCk7XG4gICAgLy8gaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cbiAgZnVuY3Rpb24gZGlzcGxheVBsYXllck1vZGFsKCkge1xuICAgIGNvbnN0IHBsYXllck1vZGFsID1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyTW9kYWwnKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIHBsYXllck1vZGFsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZE1vZGFsXCIpO1xuICAgIG1ha2VCb2FyZChib2FyZCk7XG4gICAgaW5pdGlhbGl6ZU1vZGFsRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuICBmdW5jdGlvbiBpbml0aWFsaXplTW9kYWxFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRNb2RhbFwiKTtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvdGF0ZVwiKTtcbiAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwXCIpO1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgYm9hcmQuY2hpbGRyZW4pIHtcbiAgICAgIGNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgY2VsbEhvdmVyZWQpO1xuICAgICAgY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZGFsQm9hcmRDbGljayk7XG4gICAgfVxuICAgIGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgeEF4aXMgPSAheEF4aXM7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyR2FtZUJvYXJkKGJvYXJkKSB7XG4gICAgLy8gYm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gIH1cbiAgZnVuY3Rpb24gZGlzcGxheVNoaXBzKGdhbWViZCwgbmFtZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJkLnNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYmQuc2l6ZTsgaisrKSB7XG4gICAgICAgIGNvbnN0IGRhdGFDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLiR7bmFtZX0+W2RhdGEteD1cIiR7aX1cIl1bZGF0YS15PVwiJHtqfVwiXWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGdhbWViZC5ib2FyZFtpXVtqXSkge1xuICAgICAgICAgIGRhdGFDZWxsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZ3JheVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBkaXNwbGF5R2FtZUJvYXJkKGdhbWViZCwgbmFtZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJkLnNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYmQuc2l6ZTsgaisrKSB7XG4gICAgICAgIGNvbnN0IGRhdGFDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLiR7bmFtZX0+W2RhdGEteD1cIiR7aX1cIl1bZGF0YS15PVwiJHtqfVwiXWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGdhbWViZC5zdG9yYWdlW2ldW2pdID09PSAxKSB7XG4gICAgICAgICAgZGF0YUNlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtaXNzXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGdhbWViZC5zdG9yYWdlW2ldW2pdID09PSAyKSB7XG4gICAgICAgICAgZGF0YUNlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJoaXRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gY2xlYXJDbGFzc2VzKGJvYXJkKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBib2FyZC5jaGlsZHJlbikge1xuICAgICAgY2hpbGQuY2xhc3NMaXN0ID0gY2hpbGQuY2xhc3NMaXN0WzBdO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBjZWxsQ2xpY2tlZChlKSB7XG4gICAgY29uc3QgYm9hcmRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRNb2RhbFwiKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyXCIpO1xuICAgIGNvbnN0IHggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LngsIDEwKTtcbiAgICBjb25zdCB5ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC55LCAxMCk7XG4gICAgaWYgKFxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudCA9PT0gYm9hcmRNb2RhbCB8fFxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudCA9PT0gcGxheWVyQm9hcmRcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGNvbXB1dGVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSkpIHtcbiAgICAgIGRpc3BsYXlHYW1lQm9hcmQoY29tcHV0ZXIuZ2FtZWJvYXJkLCBcImNvbXB1dGVyXCIpO1xuICAgICAgcGxheWVyLmdhbWVib2FyZC5yYW5kb21BdHRhY2soKTtcbiAgICAgIGRpc3BsYXlHYW1lQm9hcmQocGxheWVyLmdhbWVib2FyZCwgXCJwbGF5ZXJcIik7XG4gICAgfVxuICAgIGlmIChwbGF5ZXIuZ2FtZWJvYXJkLmlzR2FtZU92ZXIoKSB8fCBjb21wdXRlci5nYW1lYm9hcmQuaXNHYW1lT3ZlcigpKSB7XG4gICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgICAgY29uc3QgZW5kTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuZEdhbWVNb2RhbFwiKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0XCIpO1xuICAgICAgY29uc3QgcmVzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdGFydFwiKTtcbiAgICAgIGRpc3BsYXlTaGlwcyhjb21wdXRlci5nYW1lYm9hcmQsIFwiY29tcHV0ZXJcIik7XG4gICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICBlbmRNb2RhbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgcGxheWVyLmdhbWVib2FyZC5pc0dhbWVPdmVyKClcbiAgICAgICAgPyAocmVzdWx0LnRleHRDb250ZW50ID0gXCJZb3UgTG9zZVwiKVxuICAgICAgICA6IChyZXN1bHQudGV4dENvbnRlbnQgPSBcIllvdSBXb25cIik7XG4gICAgICByZXN0YXJ0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiByZXN0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2FtZVN0YXJ0KCkge1xuICAgIGNvbXB1dGVyLnJhbmRvbVBsYWNlU2hpcHMoKTtcbiAgICBkaXNwbGF5U2hpcHMocGxheWVyLmdhbWVib2FyZCwgXCJwbGF5ZXJcIik7XG4gICAgLy8gZ2FtZUxvb3AoKTtcbiAgfVxuICBmdW5jdGlvbiBtb2RhbEJvYXJkQ2xpY2soZSkge1xuICAgIGNvbnN0IHBsYXllck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJNb2RhbFwiKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgIGNvbnN0IHggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LngsIDEwKTtcbiAgICBjb25zdCB5ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC55LCAxMCk7XG4gICAgaWYgKGdhbWVib2FyZC5wbGFjZVNoaXAoW3gsIHldLCBzaGlwc1tzaGlwcy5sZW5ndGggLSAxXSwgeEF4aXMpKSB7XG4gICAgICBkaXNwbGF5U2hpcHMoZ2FtZWJvYXJkLCBcImJvYXJkTW9kYWxcIik7XG4gICAgICBzaGlwcy5wb3AoKTtcbiAgICB9XG4gICAgaWYgKHNoaXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gcmVtb3ZlIG1vZGFsXG4gICAgICBwbGF5ZXJNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgcGxheWVyLmdhbWVib2FyZC5ib2FyZCA9IGdhbWVib2FyZC5ib2FyZDtcbiAgICAgIGdhbWVTdGFydCgpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBjZWxsSG92ZXJlZChlKSB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkTW9kYWxcIik7XG4gICAgY2xlYXJDbGFzc2VzKGJvYXJkKTtcbiAgICBpZiAoZS50YXJnZXQucGFyZW50RWxlbWVudCAhPT0gYm9hcmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQueCwgMTApO1xuICAgIGNvbnN0IHkgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnksIDEwKTtcbiAgICBsZXQgZGF0YUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC5ib2FyZE1vZGFsPltkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gXG4gICAgKTtcbiAgICBpZiAoZ2FtZWJvYXJkLmlzUGxhY2VtZW50UG9zc2libGUoc2hpcHNbc2hpcHMubGVuZ3RoIC0gMV0sIFt4LCB5XSwgeEF4aXMpKSB7XG4gICAgICBnYW1lYm9hcmRcbiAgICAgICAgLmdldFNoaXBDb29yZHMoW3gsIHldLCBzaGlwc1tzaGlwcy5sZW5ndGggLSAxXSwgeEF4aXMpXG4gICAgICAgIC5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgICAgIGRhdGFDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAuYm9hcmRNb2RhbD5bZGF0YS14PVwiJHtjb29yZFswXX1cIl1bZGF0YS15PVwiJHtjb29yZFsxXX1cIl1gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBkYXRhQ2VsbC5jbGFzc0xpc3QuYWRkKFwiYmx1ZVwiKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGRhdGFDZWxsLmNsYXNzTGlzdC5hZGQoXCJyZWRcIik7XG4gIH1cbiAgLy8gY29uc3QgZ2V0RGF0YUNlbGwgPSAoeCwgeSkgPT5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PVwiJHt4fVwiXVtkYXRhLXk9XCIke3l9XCJdYClcblxuICBmdW5jdGlvbiBtYWtlQm9hcmQoYm9hcmQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgICAgY2VsbC5kYXRhc2V0LnggPSBpO1xuICAgICAgICBjZWxsLmRhdGFzZXQueSA9IGo7XG4gICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjZWxsXCIpO1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjZWxsQ2xpY2tlZCk7XG4gICAgICAgIC8vIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgY2VsbEhvdmVyZWQpO1xuICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcmVzdGFydCgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgLy8gbm90IHdvcmtpbmdcbiAgICAvLyBjb25zdCBlbmRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW5kR2FtZU1vZGFsXCIpO1xuICAgIC8vIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcicpO1xuICAgIC8vIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXInKTtcbiAgICAvLyBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgIC8vIHBsYXllckJvYXJkLmlubmVySFRNTCA9ICcnO1xuICAgIC8vIGNvbXB1dGVyQm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gICAgLy8gZW5kTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAvLyBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIC8vIHBsYXllci5nYW1lYm9hcmQuY2xlYXIoKTtcbiAgICAvLyBjb21wdXRlci5nYW1lYm9hcmQuY2xlYXIoKTtcbiAgICAvLyBnYW1lYm9hcmQuY2xlYXIoKTtcbiAgICAvLyBpbml0aWFsVUkoKTtcbiAgfVxuICByZXR1cm4geyBpbml0aWFsVUksIGRpc3BsYXlHYW1lQm9hcmQsIGRpc3BsYXlTaGlwcyB9O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IFVJO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBib2FyZCA9IFtdOyAvLyBib2FyZCB0byBzdG9yZSBzaGlwc1xuXG4gIC8vIDAgaXMgdW5tYXJrZWQsIDEgaXMgbWlzc2VkLCAyIGlzIGhpdFxuICBzdG9yYWdlID0gW107IC8vIGJvYXJkIHRvIHN0b3JlIG1pc3NlcyBhbmQgYXR0YWNrc1xuXG4gIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplOyBpKyspIHtcbiAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgY29uc3QgYXJyMiA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnNpemU7IGorKykge1xuICAgICAgICBhcnIucHVzaCgwKTtcbiAgICAgICAgYXJyMi5wdXNoKDApO1xuICAgICAgfVxuICAgICAgdGhpcy5ib2FyZC5wdXNoKGFycik7XG4gICAgICB0aGlzLnN0b3JhZ2UucHVzaChhcnIyKTtcbiAgICB9XG4gIH1cblxuICBjbGVhcigpe1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLnN0b3JhZ2UgPSBbXVxuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgcGxhY2VTaGlwKGNvb3JkLCBzaGlwLCB4QXhpcykge1xuICAgIGlmICghdGhpcy5pc1BsYWNlbWVudFBvc3NpYmxlKHNoaXAsIGNvb3JkLCB4QXhpcykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoeEF4aXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkW2Nvb3JkWzBdXVtjb29yZFsxXSArIGldID0gc2hpcDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbY29vcmRbMF0gKyBpXVtjb29yZFsxXV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzUGxhY2VtZW50UG9zc2libGUoc2hpcCwgY29vcmQsIHhBeGlzKSB7XG4gICAgY29uc3QgeCA9IGNvb3JkWzBdO1xuICAgIGNvbnN0IHkgPSBjb29yZFsxXTtcbiAgICBjb25zdCB7IHNpemUgfSA9IHRoaXM7XG4gICAgLy8gcG9zaXRpb24gaXMgb3V0IG9mIGJvdW5kc1xuICAgIGlmICh4IDwgMCB8fCB4ID4gc2l6ZSAtIDEgfHwgeSA8IDAgfHwgeSA+IHNpemUgLSAxKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gc2hpcCBkb2Vzbid0IGZpdCBvbiBib2FyZFxuICAgIGlmICh4QXhpcykge1xuICAgICAgaWYgKHkgKyBzaGlwLmxlbmd0aCA+IHNpemUpIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHggKyBzaGlwLmxlbmd0aCA+IHNpemUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBpZiB0aGUgYm9hcmQgdmFsdWUgYWxyZWFkeSBoYXMgc2hpcCByZXR1cm4gZmFsc2VcbiAgICBpZiAoeEF4aXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt4XVt5K2ldKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt4K2ldW3ldKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCB7IHNpemUgfSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW2ldW2pdICE9PSAwKSByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8vIGZvciBjb21wdXRlclxuICByYW5kb21QbGFjZVNoaXBzKCkge1xuICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHJldHVyblxuICAgIGNvbnN0IHNoaXBzID0gW11cbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSlcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNClcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgzKVxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMpXG4gICAgY29uc3QgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKDIpXG4gICAgc2hpcHMucHVzaChjYXJyaWVyLCBiYXR0bGVzaGlwLCBkZXN0cm95ZXIsIHN1Ym1hcmluZSwgcGF0cm9sQm9hdClcblxuICAgIGxldCBzdWNjZXNmdWxQbGFjZW1lbnRzID0gMFxuXG4gICAgd2hpbGUgKHN1Y2Nlc2Z1bFBsYWNlbWVudHMgPCA1KSB7XG4gICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gICAgICBjb25zdCB4QXhpcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAxXG5cbiAgICAgIGlmICh0aGlzLnBsYWNlU2hpcChbeCx5XSwgc2hpcHNbc3VjY2VzZnVsUGxhY2VtZW50c10seEF4aXMpKXtcbiAgICAgICAgc3VjY2VzZnVsUGxhY2VtZW50cysrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmQpIHtcbiAgICBjb25zdCB4ID0gY29vcmRbMF07XG4gICAgY29uc3QgeSA9IGNvb3JkWzFdO1xuXG4gICAgaWYgKHRoaXMuY2FuQXR0YWNrKGNvb3JkKSkge1xuICAgICAgY29uc3QgYm9hcmRDZWxsID0gdGhpcy5ib2FyZFt4XVt5XTtcbiAgICAgIGlmIChib2FyZENlbGwpIHtcbiAgICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXQoKTtcbiAgICAgICAgdGhpcy5zdG9yYWdlW3hdW3ldID0gMjtcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIGhpdFxuICAgICAgfVxuICAgICAgdGhpcy5zdG9yYWdlW3hdW3ldID0gMTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyBtaXNzZWRcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBjbGlja2VkIG9uIGNlbGwgd2l0aCB0aGluZyBpbnNpZGVcbiAgfVxuXG4gIHJhbmRvbUF0dGFjaygpIHtcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gICAgd2hpbGUgKHRoaXMuc3RvcmFnZVt4XVt5XSkge1xuICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxuICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxuICAgIH1cbiAgICB0aGlzLnJlY2VpdmVBdHRhY2soW3gsIHldKVxuICB9XG5cbiAgY2FuQXR0YWNrKGNvb3JkKSB7XG4gICAgY29uc3QgeCA9IGNvb3JkWzBdO1xuICAgIGNvbnN0IHkgPSBjb29yZFsxXTtcbiAgICBjb25zdCB7IHNpemUgfSA9IHRoaXM7XG4gICAgLy8gcG9zaXRpb24gaXMgb3V0IG9mIGJvdW5kc1xuICAgIGlmICh4IDwgMCB8fCB4ID4gc2l6ZSAtIDEgfHwgeSA8IDAgfHwgeSA+IHNpemUgLSAxKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qgc3RvcmFnZUNlbGwgPSB0aGlzLnN0b3JhZ2VbeF1beV07XG4gICAgcmV0dXJuICFzdG9yYWdlQ2VsbDtcbiAgfVxuXG4gIGdldFNoaXBDb29yZHMoY29vcmQsIHNoaXAsIHhBeGlzKSB7XG4gICAgY29uc3QgcmVzdWx0ID1bXTtcbiAgICBpZiAoeEF4aXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaChbY29vcmRbMF0sIGNvb3JkWzFdK2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKFtjb29yZFswXStpLCBjb29yZFsxXV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaXNHYW1lT3ZlcigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2l6ZTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2l6ZTsgaisrKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW2ldW2pdKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmJvYXJkW2ldW2pdLmlzU3VuaygpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbn1cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vR2FtZWJvYXJkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHBsYXlpbmcsIHNpemUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGxheWluZyA9IHBsYXlpbmc7XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKHNpemUpO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkKTtcbiAgfVxuXG4gIHJhbmRvbUF0dGFjaygpIHt0aGlzLmdhbWVib2FyZC5yYW5kb21BdHRhY2soKX1cblxuICBlbmRUdXJuKCkge1xuICAgIHRoaXMucGxheWluZyA9ICF0aGlzLnBsYXlpbmc7XG4gIH1cblxuICBwbGFjZVNoaXAoY29vcmQsIHNoaXAsIHhBeGlzKXtcbiAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmQucGxhY2VTaGlwKGNvb3JkLCBzaGlwLCB4QXhpcyk7XG4gIH1cblxuICByYW5kb21QbGFjZVNoaXBzKCl7dGhpcy5nYW1lYm9hcmQucmFuZG9tUGxhY2VTaGlwcygpfTtcblxuICBpc1BsYWNlbWVudFBvc3NpYmxlKHNoaXAsIGNvb3JkLCB4QXhpcyl7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZWJvYXJkLmlzUGxhY2VtZW50UG9zc2libGUoc2hpcCwgY29vcmQsIHhBeGlzKTtcbiAgfVxuXG4gIGdldFNoaXBDb29yZHMoY29vcmQsIHNoaXAsIHhBeGlzKXtyZXR1cm4gdGhpcy5nYW1lYm9hcmQuZ2V0U2hpcENvb3JkcyggY29vcmQsIHNoaXAsIHhBeGlzKX07XG59XG4iLCJcbmNvbnN0IFNoaXAgPSAobGVuZ3RoID0gbnVsbCk9PntcbiAgICBsZXQgaGl0cyA9MDtcbiAgICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcbiAgICBmdW5jdGlvbiBoaXQoKXtcbiAgICAgICAgaWYoaGl0cz49bGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBoaXRzKys7XG4gICAgfVxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IGhpdHMgPj0gbGVuZ3RoO1xuICAgIHJldHVybiB7bGVuZ3RoLGdldEhpdHMsIGhpdCwgaXNTdW5rfTtcbn1cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2ZhY3Rvcmllcy9HYW1lYm9hcmQnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL2ZhY3Rvcmllcy9QbGF5ZXInO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9mYWN0b3JpZXMvU2hpcCc7XG5pbXBvcnQgVUkgZnJvbSAnLi9VSSc7XG5pbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyfSBmcm9tIFwiLi9pbmRleFwiO1xuXG5jb25zdCBnYW1lQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gICAgZnVuY3Rpb24gZ2FtZVN0YXJ0KCl7XG4gICAgICAgIC8vIG1heWJlIHB1dCB0aGlzIGluIFVJXG4gICAgICAgIGNvbXB1dGVyLnJhbmRvbVBsYWNlU2hpcHMoKTtcbiAgICAgICAgVUkuZGlzcGxheVNoaXBzKHBsYXllci5nYW1lYm9hcmQsICdwbGF5ZXInKTtcbiAgICAgICAgVUkuZGlzcGxheVNoaXBzKGNvbXB1dGVyLmdhbWVib2FyZCwgJ2NvbXB1dGVyJyk7XG4gICAgICAgIGdhbWVMb29wKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdhbWVMb29wKCl7XG4gICAgICAgIHdoaWxlKCFwbGF5ZXIuZ2FtZWJvYXJkLmlzR2FtZU92ZXIgJiYgIWNvbXB1dGVyLmdhbWVib2FyZC5pc0dhbWVPdmVyKXtcbiAgICAgICAgICAgIGlmKHBsYXllci5wbGF5aW5nKXtcbiAgICAgICAgICAgICAgICBwbGF5ZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7Z2FtZVN0YXJ0fTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sbGVyOyIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9mYWN0b3JpZXMvR2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9mYWN0b3JpZXMvUGxheWVyJztcbmltcG9ydCBTaGlwIGZyb20gJy4vZmFjdG9yaWVzL1NoaXAnO1xuaW1wb3J0IFVJIGZyb20gJy4vVUknO1xuaW1wb3J0ICcuL3N0eWxlcy9zdHlsZS5jc3MnO1xuXG5leHBvcnQgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigncDEnLCB0cnVlLCAxMCk7XG5leHBvcnQgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdjb21wdXRlcicsIGZhbHNlLCAxMCk7XG5leHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgxMCk7XG5jb25zdCBtb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGUnKTtcbm1vZGUub25jbGljayA9ICgpPT57XG4gICAgbW9kZS5jbGFzc0xpc3QudG9nZ2xlKCdjbGlja2VkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdsaWdodCcpO1xuICB9XG4gIFxuVUkuaW5pdGlhbFVJKCk7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vZm9udHMvTm9yc2UtQm9sZC5vdGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTm9yc2VcXFwiO1xcbiAgc3JjOiBsb2NhbChcXFwiTm9yc2VcXFwiKSB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcbn1cXG46cm9vdCB7XFxuICAtLXNoYWRvdzogMCA0cHggNnB4IC0xcHggcmdiKDAgMCAwIC8gMC4xKSwgMCAycHggNHB4IC0ycHggcmdiKDAgMCAwIC8gMC4xKTtcXG4gIC0tc2hhZG93MjogMnB4IDBweCAycHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgLS1zaGFkb3ctbGc6IDJweCAxMHB4IDE1cHggMTBweCByZ2IoMCAwIDAgLyAwLjQpLFxcbiAgICAwIDRweCA2cHggLTRweCByZ2IoMCAwIDAgLyAwLjEpO1xcbiAgLS1ib2FyZHM6IHJnYigzMSwgMzAsIDMwKTtcXG4gIC0tcGxheWVyTW9kYWw6IHJnYigxNywgMzAsIDMxKTtcXG4gIC0tYmFja2dyb3VuZENvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICAtLWJvcmRlcjogMXB4IHNvbGlkIHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gIC0taGl0OiByZ2IoMTc5LCAyNCwgMjQpO1xcbiAgLS1taXNzOiByZ2IoMzQsIDE2OSwgODEpO1xcbiAgLS1jb2xvcjogd2hpdGU7XFxufVxcblxcbmJvZHkubGlnaHQge1xcbiAgLS1zaGFkb3c6IDAgNHB4IDZweCAtMXB4IHJnYigwIDAgMCAvIDAuMSksIDAgMnB4IDRweCAtMnB4IHJnYigwIDAgMCAvIDAuMSk7XFxuICAtLXNoYWRvdzI6IDJweCAwcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIC0tc2hhZG93LWxnOiAycHggMTBweCAxNXB4IDEwcHggcmdiKDAgMCAwIC8gMC40KSxcXG4gICAgMCA0cHggNnB4IC00cHggcmdiKDAgMCAwIC8gMC4xKTtcXG4gIC0tYm9hcmRzOiByZ2IoMTg2LCAxODQsIDE4NCk7XFxuICAtLXBsYXllck1vZGFsOiByZ2IoMzcsIDUzLCA1NSk7XFxuICAtLWJhY2tncm91bmRDb2xvcjogd2hpdGU7XFxuICAtLWJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgLS1oaXQ6IHJlZDtcXG4gIC0tbWlzczogcmdiKDcxLCAyNTQsIDEzNSk7XFxuICAtLWNvbG9yOiBibGFjaztcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZENvbG9yKTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvcik7XFxuICBmb250LWZhbWlseTogXFxcIk5vcnNlXFxcIjtcXG59XFxuXFxuLmNlbGwge1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XFxuICBib3JkZXI6IHZhcigtLWJvcmRlcik7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDUwcHg7XFxuICB3aWR0aDogMTAwdnc7XFxufVxcbi5jb250YWluZXIgLnRpdGxlIHtcXG4gIHBhZGRpbmctdG9wOiAxMDBweDtcXG4gIGZvbnQtc2l6ZTogN2VtO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG59XFxuLmNvbnRhaW5lciAuYm9hcmRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogNDBweDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uY29tcHV0ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uY29tcHV0ZXIgPiBkaXYjY2VsbDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzAsIDE4NywgMjQ2KTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB3aWR0aDogY2FsYygyMHZ3ICsgMjIwcHgpO1xcbiAgaGVpZ2h0OiBjYWxjKDIwdncgKyAyMjBweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgYm9yZGVyOiB2YXIoLS1ib3JkZXIpO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tc2hhZG93LWxnKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJvYXJkcyk7XFxufVxcblxcbi5wbGF5ZXJNb2RhbCB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwKTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgei1pbmRleDogMjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGxheWVyTW9kYWwpO1xcbiAgZ2FwOiAzMHB4O1xcbiAgcGFkZGluZzogNDBweDtcXG4gIGZvbnQtc2l6ZTogMjVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbi5wbGF5ZXJNb2RhbCAud2VsY29tZSB7XFxuICBmb250LXdlaWdodDogOTAwO1xcbn1cXG4ucGxheWVyTW9kYWwgc3Bhbi5zaGlwIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG4ucGxheWVyTW9kYWwgYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgyLCAxODIsIDMyKTtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxufVxcbi5wbGF5ZXJNb2RhbC5hY3RpdmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSk7XFxufVxcblxcbi5vdmVybGF5IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB3aWR0aDogMTAwJTsgLyogRnVsbCB3aWR0aCAqL1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzcsIDUzLCA1NSwgMC4zKTtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLm92ZXJsYXkuYWN0aXZlIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4ucmVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDYyLCAxMyk7XFxufVxcblxcbi5ibHVlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig3MCwgMTg3LCAyNDYpO1xcbn1cXG5cXG4jZ3JheSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbn1cXG5cXG4jaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhpdCk7XFxufVxcblxcbiNtaXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1pc3MpO1xcbn1cXG5cXG4uZW5kR2FtZU1vZGFsIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB6LWluZGV4OiAyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wbGF5ZXJNb2RhbCk7XFxuICBnYXA6IDMwcHg7XFxuICBwYWRkaW5nOiA0MHB4O1xcbiAgZm9udC1zaXplOiAyNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuLmVuZEdhbWVNb2RhbCAud2VsY29tZSB7XFxuICBmb250LXdlaWdodDogOTAwO1xcbn1cXG4uZW5kR2FtZU1vZGFsIHNwYW4uc2hpcCB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuLmVuZEdhbWVNb2RhbCBidXR0b24ge1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxODIsIDE4MiwgMzIpO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG59XFxuLmVuZEdhbWVNb2RhbC5hY3RpdmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSk7XFxufVxcblxcbi5tb2RlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDM2LCA5MCwgMTA3KTtcXG4gIHBhZGRpbmc6IDRweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxuICBnYXA6IDE1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbi5tb2RlIC5iYWxsIHtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcbi5tb2RlLmNsaWNrZWQge1xcbiAgY29sb3I6IHJnYigwLCAwLCAwKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzAsIDIzMCwgMjMwKTtcXG59XFxuLm1vZGUuY2xpY2tlZCAuYmFsbCB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDNweCk7XFxufS8qIyBzb3VyY2VNYXBwaW5nVVJMPXN0eWxlLmNzcy5tYXAgKi9cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3N0eWxlLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usb0JBQUE7RUFDQSwyREFBQTtBQ0NGO0FEQ0E7RUFDRSwwRUFBQTtFQUNBLHlDQUFBO0VBQ0E7bUNBQUE7RUFFQSx5QkFBQTtFQUNBLDhCQUFBO0VBQ0EsK0JBQUE7RUFDQSxzQ0FBQTtFQUNBLHVCQUFBO0VBQ0Esd0JBQUE7RUFDQSxjQUFBO0FDQ0Y7O0FEQ0E7RUFDRSwwRUFBQTtFQUNBLHlDQUFBO0VBQ0E7bUNBQUE7RUFFQSw0QkFBQTtFQUNBLDhCQUFBO0VBQ0Esd0JBQUE7RUFDQSx5QkFBQTtFQUNBLFVBQUE7RUFDQSx5QkFBQTtFQUNBLGNBQUE7QUNFRjs7QURBQTtFQUNFLFNBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7RUFDQSx3QkFBQTtFQUNBLHdDQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtBQ0dGOztBRERBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0FDSUY7O0FERkE7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtBQ0tGO0FESkU7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQ01KO0FESkU7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUNNSjs7QURIQTtFQUNFLGVBQUE7QUNNRjtBRExFO0VBQ0UsbUNBQUE7QUNPSjs7QURKQTtFQUNFLGFBQUE7RUFDQSx5QkFBQTtFQUNBLDBCQUFBO0VBQ0EsbUNBQUE7RUFDQSxzQ0FBQTtFQUNBLHFCQUFBO0VBQ0EsNEJBQUE7RUFDQSwrQkFBQTtBQ09GOztBRExBO0VBQ0UseUNBQUE7RUFDQSxlQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLG9DQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FDUUY7QURQRTtFQUNFLGdCQUFBO0FDU0o7QURQRTtFQUNFLDBCQUFBO0FDU0o7QURQRTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQ0FBQTtFQUNBLGdCQUFBO0FDU0o7QURQRTtFQUNFLHlDQUFBO0FDU0o7O0FETEE7RUFDRSxhQUFBO0VBQ0EsV0FBQSxFQUFBLGVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLHVDQUFBO0VBQ0EscUJBQUE7QUNRRjtBRFBFO0VBQ0UsY0FBQTtBQ1NKOztBRE5BO0VBQ0Usa0NBQUE7QUNTRjs7QURQQTtFQUNFLG1DQUFBO0FDVUY7O0FEUkE7RUFDRSxzQkFBQTtBQ1dGOztBRFRBO0VBQ0UsNEJBQUE7QUNZRjs7QURWQTtFQUNFLDZCQUFBO0FDYUY7O0FEWEE7RUFDRSx5Q0FBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0NBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUNjRjtBRGJFO0VBQ0UsZ0JBQUE7QUNlSjtBRGJFO0VBQ0UsMEJBQUE7QUNlSjtBRGJFO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1DQUFBO0VBQ0EsZ0JBQUE7QUNlSjtBRGJFO0VBQ0UseUNBQUE7QUNlSjs7QURaQTtFQUVFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQ0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0VBQ0EsaUNBQUE7RUFDQSxZQUFBO0FDY0Y7QURiRTtFQUNFLCtDQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSx1Q0FBQTtBQ2VKO0FEYkU7RUFDRSxtQkFBQTtFQUNBLG9DQUFBO0FDZUo7QURiRTtFQUNFLDJCQUFBO0FDZUosQ0FBQSxvQ0FBQVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJQbGF5ZXIiLCJTaGlwIiwicGxheWVyIiwiY29tcHV0ZXIiLCJnYW1lYm9hcmQiLCJnYW1lQ29udHJvbGxlciIsIlVJIiwic2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJwdXNoIiwieEF4aXMiLCJpbml0aWFsVUkiLCJib2FyZDEiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJib2FyZDIiLCJtYWtlQm9hcmQiLCJkaXNwbGF5UGxheWVyTW9kYWwiLCJwbGF5ZXJNb2RhbCIsIm92ZXJsYXkiLCJjbGFzc0xpc3QiLCJhZGQiLCJib2FyZCIsImluaXRpYWxpemVNb2RhbEV2ZW50TGlzdGVuZXJzIiwiYnV0dG9uIiwic2hpcCIsImNoaWxkIiwiY2hpbGRyZW4iLCJhZGRFdmVudExpc3RlbmVyIiwiY2VsbEhvdmVyZWQiLCJtb2RhbEJvYXJkQ2xpY2siLCJvbmNsaWNrIiwiY2xlYXJHYW1lQm9hcmQiLCJkaXNwbGF5U2hpcHMiLCJnYW1lYmQiLCJuYW1lIiwiaSIsInNpemUiLCJqIiwiZGF0YUNlbGwiLCJzZXRBdHRyaWJ1dGUiLCJkaXNwbGF5R2FtZUJvYXJkIiwic3RvcmFnZSIsImNsZWFyQ2xhc3NlcyIsImNlbGxDbGlja2VkIiwiZSIsImJvYXJkTW9kYWwiLCJwbGF5ZXJCb2FyZCIsIngiLCJwYXJzZUludCIsInRhcmdldCIsImRhdGFzZXQiLCJ5IiwicGFyZW50RWxlbWVudCIsInJlY2VpdmVBdHRhY2siLCJyYW5kb21BdHRhY2siLCJpc0dhbWVPdmVyIiwiZW5kTW9kYWwiLCJyZXN1bHQiLCJyZXN0YXJ0QnV0dG9uIiwidGV4dENvbnRlbnQiLCJyZXN0YXJ0IiwiZ2FtZVN0YXJ0IiwicmFuZG9tUGxhY2VTaGlwcyIsInBsYWNlU2hpcCIsImxlbmd0aCIsInBvcCIsInJlbW92ZSIsImlzUGxhY2VtZW50UG9zc2libGUiLCJnZXRTaGlwQ29vcmRzIiwiZm9yRWFjaCIsImNvb3JkIiwiY2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uc3RydWN0b3IiLCJpbml0aWFsaXplIiwiYXJyIiwiYXJyMiIsImNsZWFyIiwiaXNFbXB0eSIsInN1Y2Nlc2Z1bFBsYWNlbWVudHMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjYW5BdHRhY2siLCJib2FyZENlbGwiLCJoaXQiLCJzdG9yYWdlQ2VsbCIsImlzU3VuayIsInBsYXlpbmciLCJlbmRUdXJuIiwiaGl0cyIsImdldEhpdHMiLCJnYW1lTG9vcCIsIm1vZGUiLCJ0b2dnbGUiLCJib2R5Il0sInNvdXJjZVJvb3QiOiIifQ==