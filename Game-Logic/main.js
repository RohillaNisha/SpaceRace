import {
  handlePlayer1Attack,
  handlePlayer1KeyDown,
  handlePlayer1KeyUp,
  handlePlayer2Attack,
  handlePlayer2KeyDown,
  handlePlayer2KeyUp,
} from "./event.js";
import { game } from "./game-loop.js";

window.addEventListener("keypress", handlePlayer1KeyDown);
window.addEventListener("keypress", handlePlayer2KeyDown);
window.addEventListener("keyup", handlePlayer1KeyUp);
window.addEventListener("keyup", handlePlayer2KeyUp);
window.addEventListener("keydown", handlePlayer1Attack);
window.addEventListener("keydown", handlePlayer2Attack);

game.start();
