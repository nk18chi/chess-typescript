import { Board } from "./board";
import { Input } from "./input";
import { PLAYER_COLOR } from "./playerColor";

interface IGame {
  initialize(): void;
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
  private isGameOnGoing: boolean = true;
  private winCountMap: { [key: string]: number } = {};

  initialize() {
    Object.values(PLAYER_COLOR).map((color) => {
      if (typeof color === "string") {
        this.winCountMap[color] = 0;
      }
    });
  }

  async start() {
    console.log("Game Start!");
    this.turn = 0;
    this.isGameOnGoing = true;
    this.board.initialize();
    while (this.isGameOnGoing) {
      this.board.show();
      if (!this.board.isKing(this.turn)) {
        this.switchTurn();
        break;
      }
      await this.isPlayerMoved();
      this.switchTurn();
    }

    console.log(`${PLAYER_COLOR[this.turn]} won!\n`);
    this.winCountMap[PLAYER_COLOR[this.turn]] += 1;
    Object.entries(this.winCountMap).map(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
    console.log("");

    if (await this.isRestart()) this.start();
    else console.log("Game End!");
  }
  private async isPlayerMoved() {
    while (true) {
      console.log(`${PLAYER_COLOR[this.turn]} to move`);

      const answer: string = (await this.input.type("Enter UCI(type 'help' for help) ")).toLowerCase();
      switch (answer) {
        case COMMAND.HELP:
          console.log("* type 'help' for help");
          console.log("* type 'board' to see the board again");
          console.log("* type 'resign' to resign");
          console.log("* type 'moves' to list all possible moves");
          console.log("* type a square(ex. b1, e2) to list possible moves for that squares");
          console.log("* type UCI(ex. b1c3, e7e8q) to make a move");
          console.log();
          break;
        case COMMAND.BOARD:
          this.board.show();
          break;
        case COMMAND.RESIGN:
          this.isGameOnGoing = false;
          return;
        case COMMAND.MOVES:
          return;
        default:
          const moveTo = answer.match(/^([a-z]+[0-9]+)([a-z]+[0-9]+)$/);
          if (moveTo) {
            try {
              const from = this.board.parsePosition(moveTo[1]);
              const to = this.board.parsePosition(moveTo[2]);
              this.board.update(this.turn, from, to);
              return;
            } catch (e) {
              if (e instanceof Error) {
                console.error(e.message);
              }
            }
          }

          const square = answer.match(/^([a-z]+[0-9]+)$/);
      }
    }
  }

  private async isRestart(): Promise<boolean> {
    const answer: string = (await this.input.type("do you wanna restart playing? yes or no ")).toLowerCase();
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
