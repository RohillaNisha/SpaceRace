import {
  Position,
  Velocity,
  generateRandomPosition1,
} from "../Classes-JS/component.js";
import { Ball, Player, Line } from "../Classes-JS/entityClasses.js";

export class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.entities = [];
    this.player1 = new Player(new Position(canvas.width * 0.25, canvas.height));
    this.player2 = new Player(new Position(canvas.width * 0.75, canvas.height));
    this.entities.push(this.player1);
    this.entities.push(this.player2);
    this.intialPosPlayer1 = { x: canvas.width * 0.25, y: canvas.height };
    this.intialPosPlayer2 = { x: canvas.width * 0.75, y: canvas.height };
    this.lastTime = Date.now();
    this.deltaTime = 0;
    let half = canvas.width / 2;
    let count = Math.floor(canvas.height / 100) - 1;
    let margin = 100 / count;
    this.middleLines0 = [];
    this.points1 = 0;
    this.points2 = 0;

    for (let i = 0; i < count; i++) {
      let y = 100 * i + margin * i + 50 + margin / 2;
      this.entities.push(new Line(new Position(half, y)));
    }
  }

  start() {
    tick();
  }

  calculatePoints() {
    if (this.player1.position.y <= this.player1.height / 2) {
      this.player1.position.y = canvas.height;
      this.points1++;
    }
    if (this.player2.position.y <= this.player2.height / 2) {
      this.player2.position.y = canvas.height;
      this.points2++;
    }
  }

  drawPoints() {
    this.context.fillStyle = "white";
    this.context.font = "48px serif";
    this.context.textAlign = "center";
    this.context.fillText(this.points1, this.canvas.width / 2 - 100, 70);

    this.context.fillStyle = "white";
    this.context.font = "48px serif";
    this.context.textAlign = "center";
    this.context.fillText(this.points2, this.canvas.width / 2 + 100, 70);
  }
}

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

export const game = new Game(canvas, context);

export let balls = [];
let frameCount = 0;

function tick() {
  let currentTime = Date.now();
  game.deltaTime = (currentTime - game.lastTime) / 1000;
  game.lastTime = currentTime;

  frameCount++;

  if (frameCount == 100) {
    game.entities.push(
      new Ball(
        new Position(0, generateRandomPosition1()),
        new Velocity(200, 0),
        "white"
      )
    );
    game.entities.push(
      new Ball(
        new Position(canvas.width - 50, generateRandomPosition1()),
        new Velocity(-200, 0),
        "white"
      )
    );
    frameCount = 0;
  }

  game.context.fillStyle = "black";
  game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

  game.drawPoints();

  for (let i = 0; i < game.entities.length; i++) {
    let entity = game.entities[i];
    entity.draw(game);
    entity.move(game);
    entity.remove(game, i);
  }

  game.calculatePoints();

  requestAnimationFrame(tick);
}
