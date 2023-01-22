import Gameboard from "./factories/Gameboard";
import Player from "./factories/Player";
import Ship from "./factories/Ship";
import { player, computer, gameboard } from "./index";
import gameController from "./gameController";

const UI = (() => {
  const ships = [];
  const carrier = new Ship(5);
  const battleship = new Ship(4);
  const destroyer = new Ship(3);
  const submarine = new Ship(3);
  const patrolBoat = new Ship(2);
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
    const playerModal =document.querySelector('.playerModal');
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
        const dataCell = document.querySelector(
          `.${name}>[data-x="${i}"][data-y="${j}"]`
        );
        if (gamebd.board[i][j]) {
          dataCell.setAttribute("id", "gray");
        }
      }
    }
  }
  function displayGameBoard(gamebd, name) {
    for (let i = 0; i < gamebd.size; i++) {
      for (let j = 0; j < gamebd.size; j++) {
        const dataCell = document.querySelector(
          `.${name}>[data-x="${i}"][data-y="${j}"]`
        );
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
    if (
      e.target.parentElement === boardModal ||
      e.target.parentElement === playerBoard
    ) {
      return false;
    }
    if (computer.gameboard.receiveAttack([x, y])) {
      displayGameBoard(computer.gameboard, "computer");
      player.gameboard.randomAttack();
      displayGameBoard(player.gameboard, "player");
    }
    if (player.gameboard.isGameOver() || computer.gameboard.isGameOver()) {
      const overlay = document.querySelector(".overlay");
      const endModal = document.querySelector(".endGameModal");
      const result = document.querySelector(".result");
      const restartButton = document.querySelector(".restart");
      displayShips(computer.gameboard, "computer");
      overlay.classList.add("active");
      endModal.classList.add("active");
      player.gameboard.isGameOver()
        ? (result.textContent = "You Lose")
        : (result.textContent = "You Won");
      restartButton.onclick = () => restart();
    }
  }

  function gameStart() {
    computer.randomPlaceShips();
    displayShips(player.gameboard, "player");
    // gameLoop();
  }
  function modalBoardClick(e) {
    const playerModal = document.querySelector(".playerModal");
    const overlay = document.querySelector(".overlay");
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    if (gameboard.placeShip([x, y], ships[ships.length - 1], xAxis)) {
      displayShips(gameboard, "boardModal");
      ships.pop();
    }
    if (ships.length === 0) {
      // remove modal
      playerModal.classList.remove("active");
      overlay.classList.remove("active");
      player.gameboard.board = gameboard.board;
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
    let dataCell = document.querySelector(
      `.boardModal>[data-x="${x}"][data-y="${y}"]`
    );
    if (gameboard.isPlacementPossible(ships[ships.length - 1], [x, y], xAxis)) {
      gameboard
        .getShipCoords([x, y], ships[ships.length - 1], xAxis)
        .forEach((coord) => {
          dataCell = document.querySelector(
            `.boardModal>[data-x="${coord[0]}"][data-y="${coord[1]}"]`
          );
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
  return { initialUI, displayGameBoard, displayShips };
})();
export default UI;
