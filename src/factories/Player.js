import Gameboard from "./Gameboard";

export default class Player {
  constructor(name, playing, size) {
    this.name = name;
    this.playing = playing;
    this.gameboard = new Gameboard(size);
  }

  receiveAttack(coord) {
    return this.gameboard.receiveAttack(coord);
  }

  randomAttack() {this.gameboard.randomAttack()}

  endTurn() {
    this.playing = !this.playing;
  }

  placeShip(coord, ship, xAxis){
    return this.gameboard.placeShip(coord, ship, xAxis);
  }

  randomPlaceShips(){this.gameboard.randomPlaceShips()};

  isPlacementPossible(ship, coord, xAxis){
    return this.gameboard.isPlacementPossible(ship, coord, xAxis);
  }

  getShipCoords(coord, ship, xAxis){return this.gameboard.getShipCoords( coord, ship, xAxis)};
}
