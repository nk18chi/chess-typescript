import { Board } from "./board";
import { Input } from "./input";
import { PLAYER_COLOR } from "./playerColor";

interface IGame {
  start(): void;
}

enum COMMAND {
  HELP = "help",
  BOARD = "board",
  RESIGN = "resign",
  MOVES = "moves",
}

const colorLength: number = Object.keys(PLAYER_COLOR).length / 2;
export class Game implements IGame {
  private board: Board = new Board(8);
  private input: Input = new Input();
  private turn: number = 0;
  private winCount: number[] = new Array(colorLength).fill(0);
  private isGameOnGoing: boolean = true;

  async start() {
    console.log("Game Start!");
    this.isGameOnGoing = true;
    this.board.initialize();
    while (this.isGameOnGoing) {
      this.board.show();
      if (!this.board.isKing(this.turn)) {
        this.switchTurn();
        break;
      }
      const isMoved = await this.isPlayerMoved();
      if (isMoved) this.switchTurn();
    }
    console.log(`${PLAYER_COLOR[this.turn]} won! - result: ${this.winCount.join(" - ")}`);
    if (await this.isRestart()) this.start();

    console.log("Game End!");
  }
  private async isPlayerMoved() {
    console.log(`${PLAYER_COLOR[this.turn]} to move`);

    const answer: string = (await this.input.type()).toLowerCase();
    switch (answer) {
      case COMMAND.HELP:
        console.log("show help");
        return false;
      case COMMAND.BOARD:
        this.board.show();
        return false;
      case COMMAND.RESIGN:
        this.isGameOnGoing = false;
        return false;
      case COMMAND.MOVES:
        return true;
      default:
        const moveTo = answer.match(/^([a-z]+[0-9]+)([a-z]+[0-9]+)$/);
        if (moveTo) {
          try {
            const from = this.board.parsePosition(moveTo[1]);
            const to = this.board.parsePosition(moveTo[2]);
            this.board.update(this.turn, from, to);
            return true;
          } catch (e) {
            if (e instanceof Error) {
              console.error(e.message);
            }
            return false;
          }
        }

        const square = answer.match(/^([a-z]+[0-9]+)$/);
        if (square) return false;
        return false;
    }
  }

  private async isRestart(): Promise<boolean> {
    console.log(`do you wanna restart playing? yes or no`);
    const answer: string = (await this.input.type()).toLowerCase();
    switch (answer) {
      case "yes":
        return true;
      case "no":
        return false;
      default:
        return this.isRestart();
    }
  }

  private switchTurn() {
    this.turn = (this.turn + 1) % colorLength;
  }
}
