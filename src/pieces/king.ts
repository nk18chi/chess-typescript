import { Piece } from "./piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { BLACK_SIGN, WHITE_SIGN } from "../types/sign";
import { Taxis } from "../types/axis";
import { TPosition } from "../types/position";
import { Rook } from "./rook";
import { TPiece, TSpecialMove } from "../types/piece";

export class King extends Piece {
  constructor(props: TPiece) {
    super(props);
    switch (this.color) {
      case PLAYER_COLOR.WHITE:
        this.sign = WHITE_SIGN.KING;
        break;
      case PLAYER_COLOR.BLACK:
        this.sign = BLACK_SIGN.KING;
        break;
      default:
        this.sign = null;
    }
  }

  validate(axis: Taxis, isEnemy: boolean) {
    if (!super.validate(axis, isEnemy)) return false;
    if (Math.abs(axis.x) > 1) return false;
    if (Math.abs(axis.y) > 1) return false;
    return true;
  }

  specialMove({ turn, axis, from, to, cells }: TSpecialMove) {
    return this.castling(turn, axis, from, to, cells);
  }

  private castling(turn: PLAYER_COLOR, axis: Taxis, from: TPosition, to: TPosition, cells: (Piece | null)[][]) {
    if (Math.abs(axis.x) !== 2 || axis.y !== 0) return false;
    if (this.lastMovedTurn !== 0) return false;
    if (from.row !== (turn === PLAYER_COLOR.WHITE ? cells.length - 1 : 0) || from.col !== 4) return false;
    const col = axis.x > 0 ? cells.length - 1 : 0;
    const rook = cells[from.row][col];
    if (!rook || !(rook instanceof Rook) || rook.lastMovedTurn !== 0) return false;
    let startCol = 4;
    while (0 < startCol && startCol < cells.length - 1) {
      if (startCol !== 4) {
        const piece = cells[from.row][startCol];
        if (piece) return false;
        // TODO: check if the areas does not get checkMated
      }
      startCol += axis.x > 0 ? 1 : -1;
    }

    [cells[from.row][col], cells[to.row][axis.x > 0 ? to.col - 1 : to.col + 1]] = [null, cells[from.row][col]];
    return true;
  }
}
