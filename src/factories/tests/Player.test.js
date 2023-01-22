
import Gameboard from '../Gameboard'
import Player from '../Player'
import Ship from '../Ship'

describe('Player', () => {
  let player;
  let ship;

  beforeEach(() => {
    player = new Player('p1', true, 10)
    ship = new Ship(3)
  })

  test('gameover when ship sunk', () => {
    player.placeShip([1,1],ship, true)
    player.attack([1,1])
    player.attack([1,2])
    player.attack([1,3])
    expect(player.gameboard.isGameOver()).toBe(true)
  })

  test('randomly attacks', () => {
    player.placeShip([1,1],ship, true)
    for (let i = 0; i < 100; i++) {
      player.randomAttack()
    }
    expect(player.gameboard.isGameOver()).toBe(true)
  })
})