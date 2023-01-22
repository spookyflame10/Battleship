import Ship from "../Ship";

describe("Ship", () => {
  let ship1;
  beforeEach(() => {
    ship1 = Ship(3);
  })
  test("length of empty ship is null", () => {
    const ship = Ship();
    expect(ship.length).toBe(null);
  });
  test("initialized ship and getters work", () => {
    const ship = Ship(12);
    expect(ship.length).toBe(12);
  });
  test("take a hit", () => {
    ship1.hit();
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);
  });
  test('prevents hits to be out of bounds', () => {
    ship1.hit();
    ship1.hit();
    ship1.hit();
    ship1.hit();
    expect(ship1.getHits()).toBe(3)
  })
});
