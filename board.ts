import { King } from "./king";
import { Piece } from "./piece";
import { PLAYER_COLOR } from "./playerColor";
import { TPosition } from "./position";
import { KINGS } from "./sign";

interface IBoard {
  initialize(): void;
  show(): void;
  parsePosition(position: string): TPosition;
  update(turn: PLAYER_COLOR, from: TPosition, to: TPosition): void;
  isCheckmated(): boolean;
  isKing(color: PLAYER_COLOR): boolean;
}

export class Board implements IBoard {
  private mapSize = 8;
  private cells: (Piece | null)[][] = [[]];
  private aliveKingsMap: { [key: number]: boolean } = {};
  constructor(mapSize: number) {
    if (mapSize) this.mapSize = mapSize;
  }

  initialize() {
    // reset all cells
    this.cells = Array.from(Array(this.mapSize), () => new Array(this.mapSize).fill(null));

    // set each pieces
    this.cells[0][4] = new King({ color: PLAYER_COLOR.BLACK });
    this.cells[7][3] = new King({ color: PLAYER_COLOR.WHITE });
    this.aliveKingsMap[PLAYER_COLOR.WHITE] = true;
    this.aliveKingsMap[PLAYER_COLOR.BLACK] = true;
  }
  show() {
    console.log("");
    let i: number = this.mapSize;
    this.cells.forEach((rows) => {
      console.log(
        rows
          .map((piece) => {
            if (!piece) return " ";
            return piece.show();
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
        .map(() => String.fromCharCode(i++ + 96))
        .join(" ")
    );
    console.log("");
  }

  parsePosition(position: string) {
    const matches = position.toLowerCase().match(/^([a-z]+)([0-9]+)$/);
    if (!matches) throw new Error("wrong type..");
    return {
      row: this.mapSize - parseInt(matches[2], 10),
      col: matches[1].charCodeAt(0) - 96 - 1,
    };
  }

  update(turn: PLAYER_COLOR, from: TPosition, to: TPosition) {
    const errorOutOfBoard = "your select is out of the board";
    if (from.row < 0 || this.mapSize < from.row) throw new Error(errorOutOfBoard);
    if (from.col < 0 || this.mapSize < from.col) throw new Error(errorOutOfBoard);
    if (to.row < 0 || this.mapSize < to.row) throw new Error(errorOutOfBoard);
    if (to.col < 0 || this.mapSize < to.col) throw new Error(errorOutOfBoard);

    const piece = this.cells[from.row][from.col];
    const dest = this.cells[to.row][to.col];
    if (!piece) throw new Error("there is no piece that you are trying to move");
    if (piece.color !== turn) throw new Error("the piece that you are trying to move is not yours");
    if (dest?.color === turn) throw new Error("the piece that you are trying to capture is yours");
    if (!piece.validate(from, to)) throw new Error("the piece cannot move to the destination");

    [this.cells[from.row][from.col], this.cells[to.row][to.col]] = [null, this.cells[from.row][from.col]];
    if (dest && KINGS.includes(dest.show())) {
      this.aliveKingsMap[dest.color] = false;
    }
  }

  isCheckmated() {
    return false;
  }
  isKing(color: PLAYER_COLOR) {
    return this.aliveKingsMap[color];
  }
}
