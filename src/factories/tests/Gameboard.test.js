import Gameboard from '../Gameboard';
import Ship from "../Ship"

describe("Gameboard", () => {
    let gameBoard;
    let ship;
    beforeEach(() => {
      gameBoard = new Gameboard(3);
      ship = Ship(3);
    })
    test("initialize gameboard", () => {
      expect(gameBoard.board)
      .toStrictEqual([[0,0,0],[0,0,0],[0,0,0]]);
    });
    test('placeShip on board on x axis', () => {
        gameBoard.placeShip([0,0], ship, true);
        expect(gameBoard.board)
        .toStrictEqual([[ship,ship,ship],[0,0,0],[0,0,0]])
    })
    test('placeShip on board on y axis', () => {
      gameBoard.placeShip([0,0], ship, false);
      expect(gameBoard.board)
      .toStrictEqual([[ship,0,0],[ship,0,0],[ship,0,0]])
    })
    // isPlacementPossible tests
    test('position is out of bounds', () =>{
      expect(gameBoard.isPlacementPossible(ship, [-1,0], false))
      .toBe(false);
    })
    test('ship does not fit on board on yAxis', () =>{
      expect(gameBoard.isPlacementPossible(ship, [0,1], false))
      .toBe(true);
    })
    test('ship does not fit on board on xAxis', () =>{
      expect(gameBoard.isPlacementPossible(ship, [0,1], true))
      .toBe(false);
    })
    test('if the board value already has ship return false', () => {
      gameBoard.placeShip([0,0], ship, false);
      const ship2 = Ship(3);
      expect(gameBoard.isPlacementPossible(ship2, [0,0], true))
      .toBe(false);
    })
    test('receive Attack', () =>{
      gameBoard.placeShip([0,0], ship, false);
      gameBoard.receiveAttack([0,0]);
      expect(gameBoard.storage)
      .toStrictEqual([[2,0,0],[0,0,0],[0,0,0]])
    })
    test('receive Attack on same spot', () =>{
      gameBoard.placeShip([0,0], ship, false);
      gameBoard.receiveAttack([0,0]);
      expect(gameBoard.receiveAttack([0,0]))
      .toBe(false)
    })
    test('canAttack will be false when there is an attack on square', ()=>{
      expect(gameBoard.canAttack([0,0])).toBe(true);
      gameBoard.placeShip([0,0], ship, false);
      gameBoard.receiveAttack([0,0]);
      expect(gameBoard.canAttack([0,0])).toBe(false);
    })
    test('canAttack will be false when attack is out of bounds', ()=>{
      expect(gameBoard.canAttack([0,3])).toBe(false);
    })
    test('all sunk, empty board, true', () => {
      expect(gameBoard.isGameOver()).toBe(true);
    })
    test('all sunk, ships on board, true', () => {
      gameBoard.placeShip([0,0], ship, false);
      gameBoard.receiveAttack([0,0]);
      gameBoard.receiveAttack([1,0]);
      gameBoard.receiveAttack([2,0]);
      expect(gameBoard.isGameOver()).toBe(true);
    })
    test('get Ship cordinates', ()=>{
      expect(gameBoard.getShipCoords([0,0], ship, true))
      .toStrictEqual([[0,0], [0,1], [0,2]]);
    })
});
  