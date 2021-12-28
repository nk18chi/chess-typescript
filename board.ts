import { King } from "./king";
import { Piece } from "./piece";
import { PLAYER_COLOR } from "./playerColor";
import { TPosition } from "./position";

interface IBoard {
  initialize(): void;
  show(): void;
  validate(destination: TPosition): void;
  isCheckmated(): boolean;
  isKingTaken(color: PLAYER_COLOR): boolean;
}

export class Board implements IBoard {
  private mapSize: number = 8;
  private cells: Piece[][] = [[]];
  constructor(mapSize: number) {
    if (mapSize) this.mapSize = mapSize;
  }

  initialize() {
    // reset all cells
    this.cells = Array.from(Array(this.mapSize), () => new Array(this.mapSize).fill(null));

    // set each pieces
    this.cells[0][4] = new King({ color: PLAYER_COLOR.WHITE });
    this.cells[7][3] = new King({ color: PLAYER_COLOR.BLACK });
  }
  show() {
    let i: number = this.mapSize;
    this.cells.forEach((rows) => {
      console.log(
        rows
          .map((cell) => {
            if (!cell) return " ";
            return cell.show();
          })
          .join("|")
          .concat(`${i--}`)
      );
    });
    console.log("");
    i = 1;
    console.log(
      new Array(this.mapSize)
        .fill("")
        .map((_) => String.fromCharCode(i++ + 64))
        .join(" ")
    );
    console.log("");
  }
  validate(destination: TPosition) {}
  isCheckmated() {
    return false;
  }
  isKingTaken(color: PLAYER_COLOR) {
    if (color === PLAYER_COLOR.WHITE) return false;
    return false;
  }
}
