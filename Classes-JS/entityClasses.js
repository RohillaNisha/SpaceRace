export class Entity {
  constructor(position) {
    this.position = position;
  }

  draw() {}

  move() {}

  remove() {}
}

export class Ball extends Entity {
  constructor(position, velocity, color) {
    super(position, velocity);
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.color = color;
  }

  draw(game) {
    game.context.beginPath();
    game.context.fillStyle = this.color;
    game.context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
    game.context.fill();
  }

  move(game) {
    this.position.x += this.velocity.dx * game.deltaTime;

    if (ballPlayerCollision(this, game.player1)) {
      game.player1.position.y = canvas.height;
    }
    if (ballPlayerCollision(this, game.player2)) {
      game.player2.position.y = canvas.height;
    }
  }

  remove(game, i) {
    if (this.position.x < 0 || this.position.x > canvas.width)
      game.entities.splice(i, 1);
  }
}

export class Player extends Entity {
  constructor(position) {
    super(position);
    this.position = position;
    this.width = 50;
    this.height = 85;
    this.color = "black";
    this.up = false;
    this.down = false;
    const image = new Image();
    image.src = "/Style-Related/rocket-19662.png";
    this.image = image;
  }

  draw(game) {
    game.context.fillStyle = this.color;
    game.context.fillRect(
      this.position.x - this.width / 2,
      this.position.y - this.height / 2,
      this.width,
      this.height
    );

    game.context.drawImage(
      this.image,
      this.position.x - 70,
      this.position.y - 58,
      140,
      140
    );
  }

  move(game) {
    if (this.up) {
      this.position.y -= 400 * game.deltaTime;
    } else if (this.down) {
      this.position.y += 400 * game.deltaTime;
    }
    if (this.position.y < this.height / 2) {
      this.position.y = this.height / 2;
    } else if (this.position.y > game.canvas.height - this.height / 2) {
      this.position.y = game.canvas.height - this.height / 2;
    }
    if (game.player1.position.y == 100) {
      game.points1++;
    } else if (game.player2.position.y == 0) {
      game.points2++;
    }
  }

  remove() {}
}

export class Line extends Entity {
  constructor(position) {
    super(position);
    this.position = position;
    this.width = 10;
    this.height = 100;
  }

  draw(game) {
    game.context.fillStyle = "white";
    game.context.fillRect(
      this.position.x - this.width / 2,
      this.position.y - this.height / 2,
      this.width,
      this.height
    );
  }

  remove() {}
}

function ballPlayerCollision(ball, player) {
  let cdx = Math.abs(ball.position.x - player.position.x);
  let cdy = Math.abs(ball.position.y - player.position.y);

  if (cdx > player.width / 2 + ball.radius) {
    return false;
  }

  if (cdy > player.height / 2 + ball.radius) {
    return false;
  }

  if (cdx <= player.width / 2) {
    return true;
  }
  if (cdy <= player.height / 2) {
    return true;
  }

  let distSquared =
    (cdx - player.width / 2) ** 2 + (cdy - player.height / 2) ** 2;
  return distSquared <= ball.radius ** 2;
}
