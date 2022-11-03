import { Ball } from "../Classes-JS/entityClasses.js";
import { game } from "./game-loop.js";
import { Position, Velocity } from "../Classes-JS/Component.js";

let pressedPlayer1 = true;
let pressedPlayer2 = true;

export function handlePlayer1KeyDown(event) {
  if (event.repeat) return;

  if (event.key == "w") {
    game.player1.up = true;
  } else if (event.key == "s") {
    game.player1.down = true;
  }
}

export function handlePlayer2KeyDown(event) {
  if (event.repeat) return;

  if (event.key == "o") {
    game.player2.up = true;
  } else if (event.key == "l") {
    game.player2.down = true;
  }
}

export function handlePlayer1KeyUp(event) {
  if (event.key == "w") {
    game.player1.up = false;
  } else if (event.key == "s") {
    game.player1.down = false;
  }
}

export function handlePlayer2KeyUp(event) {
  if (event.key == "o") {
    game.player2.up = false;
  } else if (event.key == "l") {
    game.player2.down = false;
  }
}

export function handlePlayer1Attack(event) {
  if (event.key === " " && pressedPlayer1 === true) {
    if (event.repeat) return;
    pressedPlayer1 = false;

    game.entities.push(
      new Ball(
        new Position(
          game.player1.position.x - game.player1.width / 2 + 80,
          game.player1.position.y - game.player1.height / 2 + 40
        ),
        new Velocity(1200, 0),
        "red"
      )
    );
  }
}
setInterval(() => {
  pressedPlayer1 = true;
}, 3000);

export function handlePlayer2Attack(event) {
  if (event.key == "k" && pressedPlayer2 === true) {
    if (event.repeat) return;
    pressedPlayer2 = false;

    game.entities.push(
      new Ball(
        new Position(
          game.player2.position.x - game.player2.width / 2 - 40,
          game.player2.position.y - game.player2.height / 2 + 40
        ),
        new Velocity(-1200, 0),
        "red"
      )
    );
  }
}

setInterval(() => {
  pressedPlayer2 = true;
}, 3000);
