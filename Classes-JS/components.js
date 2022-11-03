export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Velocity {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }
}

export function generateRandomPosition1() {
  return Math.floor(Math.random() * 700) + 25;
}
