import Ship from "./Ship";

export default class Gameboard {
  board = []; // board to store ships

  // 0 is unmarked, 1 is missed, 2 is hit
  storage = []; // board to store misses and attacks

  constructor(size) {
    this.size = size;
    this.initialize();
  }

  initialize(){
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

  clear(){
    this.board = [];
    this.storage = []
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
    const { size } = this;
    // position is out of bounds
    if (x < 0 || x > size - 1 || y < 0 || y > size - 1) return false;
    // ship doesn't fit on board
    if (xAxis) {
      if (y + ship.length > size) return false;
    } else if (x + ship.length > size) return false;
    // if the board value already has ship return false
    if (xAxis) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][y+i]) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x+i][y]) return false;
      }
    }
    return true;
  }

  isEmpty() {
    const { size } = this;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.board[i][j] !== 0) return false
      }
    }
    return true
  }

  // for computer
  randomPlaceShips() {
    if (!this.isEmpty()) return
    const ships = []
    const carrier = new Ship(5)
    const battleship = new Ship(4)
    const destroyer = new Ship(3)
    const submarine = new Ship(3)
    const patrolBoat = new Ship(2)
    ships.push(carrier, battleship, destroyer, submarine, patrolBoat)

    let succesfulPlacements = 0

    while (succesfulPlacements < 5) {
      const x = Math.floor(Math.random() * 10)
      const y = Math.floor(Math.random() * 10)
      const xAxis = Math.floor(Math.random() * 2) === 1

      if (this.placeShip([x,y], ships[succesfulPlacements],xAxis)){
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
    let x = Math.floor(Math.random() * 10)
    let y = Math.floor(Math.random() * 10)
    while (this.storage[x][y]) {
      x = Math.floor(Math.random() * 10)
      y = Math.floor(Math.random() * 10)
    }
    this.receiveAttack([x, y])
  }

  canAttack(coord) {
    const x = coord[0];
    const y = coord[1];
    const { size } = this;
    // position is out of bounds
    if (x < 0 || x > size - 1 || y < 0 || y > size - 1) return false;
    const storageCell = this.storage[x][y];
    return !storageCell;
  }

  getShipCoords(coord, ship, xAxis) {
    const result =[];
    if (xAxis) {
      for (let i = 0; i < ship.length; i++) {
        result.push([coord[0], coord[1]+i]);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        result.push([coord[0]+i, coord[1]]);
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
