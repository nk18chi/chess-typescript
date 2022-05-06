import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Piece } from "./pieces/piece";
import { PLAYER_COLOR } from "./types/playerColor";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";
import { KINGS } from "./types/sign";
import { Taxis } from "./types/axis";
import { TPosition } from "./types/position";
import { PROMOTION_STRING } from "./types/piece";

// TODO: show piece history
// TODO: stop the game if player cannot move any pieces
interface IBoard {
  initialize(): void;
  show(): void;
  parsePosition(position: string): TPosition;
  toPositionString(position: TPosition): string;
  update(turn: PLAYER_COLOR, from: TPosition, to: TPosition, promotion: PROMOTION_STRING | null): void;
  isKing(color: PLAYER_COLOR): boolean;
  showPossibleMoves(position: TPosition): TPosition[];
  showAllPossibleMoves(color: PLAYER_COLOR): TPossibleMoves[];
}

type TPossibleMoves = {
  position: TPosition;
  possibleMoves: TPosition[];
};

export class Board implements IBoard {
  private mapSize = 8;
  private aliveKingsMap: { [key: number]: boolean } = {};
  public currentTurn = 0;
  public cells: (Piece | null)[][] = [[]];
  constructor(mapSize: number) {
    if (mapSize) this.mapSize = mapSize;
  }

  initialize() {
    // reset all cells
    this.cells = Array.from(Array(this.mapSize), () => new Array(this.mapSize).fill(null));

    // set king alive map
    this.aliveKingsMap[PLAYER_COLOR.WHITE] = true;
    this.aliveKingsMap[PLAYER_COLOR.BLACK] = true;

    // set kings
    this.cells[0][4] = new King({ color: PLAYER_COLOR.BLACK });
    this.cells[7][4] = new King({ color: PLAYER_COLOR.WHITE });

    // set rooks
    this.cells[0][0] = new Rook({ color: PLAYER_COLOR.BLACK });
    this.cells[0][7] = new Rook({ color: PLAYER_COLOR.BLACK });
    this.cells[7][0] = new Rook({ color: PLAYER_COLOR.WHITE });
    this.cells[7][7] = new Rook({ color: PLAYER_COLOR.WHITE });

    // set bitshops
    this.cells[0][2] = new Bishop({ color: PLAYER_COLOR.BLACK });
    this.cells[0][5] = new Bishop({ color: PLAYER_COLOR.BLACK });
    this.cells[7][2] = new Bishop({ color: PLAYER_COLOR.WHITE });
    this.cells[7][5] = new Bishop({ color: PLAYER_COLOR.WHITE });

    // set queen
    this.cells[0][3] = new Queen({ color: PLAYER_COLOR.BLACK });
    this.cells[7][3] = new Queen({ color: PLAYER_COLOR.WHITE });

    // set night
    this.cells[0][1] = new Knight({ color: PLAYER_COLOR.BLACK });
    this.cells[0][6] = new Knight({ color: PLAYER_COLOR.BLACK });
    this.cells[7][1] = new Knight({ color: PLAYER_COLOR.WHITE });
    this.cells[7][6] = new Knight({ color: PLAYER_COLOR.WHITE });

    // set pawn
    for (let i = 0; i < this.mapSize; i++) {
      this.cells[1][i] = new Pawn({ color: PLAYER_COLOR.BLACK });
      this.cells[6][i] = new Pawn({ color: PLAYER_COLOR.WHITE });
    }
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
          .concat(` ${i--}`)
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
    const matches = position.toLowerCase().match(/^([a-z])([0-9])$/);
    if (!matches) throw new Error("wrong type..");
    return {
      row: this.mapSize - parseInt(matches[2], 10),
      col: matches[1].charCodeAt(0) - 96 - 1,
    };
  }

  toPositionString(position: TPosition) {
    return String.fromCharCode(position.col + 97) + String((position.row - this.mapSize) * -1);
  }

  update(turn: PLAYER_COLOR, from: TPosition, to: TPosition, promotion: PROMOTION_STRING | null = null) {
    const errorOutOfBoard = "your select is out of the board";
    if (from.row < 0 || this.mapSize <= from.row) throw new Error(errorOutOfBoard);
    if (from.col < 0 || this.mapSize <= from.col) throw new Error(errorOutOfBoard);
    if (to.row < 0 || this.mapSize <= to.row) throw new Error(errorOutOfBoard);
    if (to.col < 0 || this.mapSize <= to.col) throw new Error(errorOutOfBoard);

    const piece = this.cells[from.row][from.col];
    const dest = this.cells[to.row][to.col];
    if (!piece) throw new Error("there is no piece that you are trying to move");
    if (piece.color !== turn) throw new Error("the piece that you are trying to move is not yours");
    if (dest?.color === turn) throw new Error("the piece that you are trying to capture is yours");

    const axis: Taxis = {
      x: to.col - from.col,
      y: to.row - from.row,
    };
    if (turn === PLAYER_COLOR.BLACK) {
      axis.x *= -1;
    } else {
      axis.y *= -1;
    }

    const isMoved = piece.specialMove({ turn, axis, from, to, board: this, promotion });
    if (!isMoved) {
      if (!piece.validate(axis, dest !== null)) throw new Error("the piece cannot move to the destination");
      if (this.isPieceOnWay(from, to)) throw new Error("there is a piece on your way");
    }

    [this.cells[from.row][from.col], this.cells[to.row][to.col]] = [null, this.cells[from.row][from.col]];
    this.currentTurn += 1;
    piece.moved(axis, this.currentTurn);
    if (dest && KINGS.includes(dest.show())) {
      this.aliveKingsMap[dest.color] = false;
    }
  }

  isKing(color: PLAYER_COLOR) {
    return this.aliveKingsMap[color];
  }

  showPossibleMoves(position: TPosition) {
    const piece = this.cells[position.row][position.col];
    if (!piece) throw new Error("Please select a piece to show all possible moves for it");
    return piece.listMoves({ curPosition: position, cells: this.cells });
  }

  showAllPossibleMoves(color: PLAYER_COLOR) {
    const moves: TPossibleMoves[] = [];
    this.cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (!cell || cell.color !== color) return;
        const position: TPosition = {
          row: i,
          col: j,
        };
        const possibleMoves = cell.listMoves({ curPosition: position, cells: this.cells });
        moves.push({ position, possibleMoves });
      });
    });
    return moves;
  }

  private isPieceOnWay(from: TPosition, to: TPosition): boolean {
    const xDiff: number = to.col - from.col;
    const yDiff: number = to.row - from.row;
    let x = 0;
    let y = 0;
    const gcd = (x: number, y: number): number => {
      if (y !== 0) return gcd(y, x % y);
      return x;
    };

    if (xDiff === 0) {
      y = yDiff > 0 ? 1 : -1;
    } else if (yDiff === 0) {
      x = xDiff > 0 ? 1 : -1;
    } else {
      const n = gcd(Math.abs(xDiff), Math.abs(yDiff));
      x = xDiff / n;
      y = yDiff / n;
    }

    const cur: TPosition = { ...from };
    cur.row += y;
    cur.col += x;
    while (cur.row !== to.row || cur.col !== to.col) {
      if (this.cells[cur.row][cur.col]) return true;
      cur.row += y;
      cur.col += x;
    }
    return false;
  }
}
