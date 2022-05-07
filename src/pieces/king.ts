import { Piece } from "./piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { BLACK_SIGN, WHITE_SIGN } from "../types/sign";
import { Taxis } from "../types/axis";
import { TPosition } from "../types/position";
import { Rook } from "./rook";
import { TListMoves, TMove, TPiece, TSpecialMove } from "../types/piece";
import { Board } from "../board";

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

  specialMove({ turn, axis, from, to, board }: TSpecialMove) {
    return this.castling(turn, axis, from, to, board);
  }

  listMoves({ cells, curPosition }: TListMoves): TPosition[] {
    const moves: TMove[] = [
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 0, col: 1 },
      { row: -1, col: 1 },
      { row: -1, col: 0 },
      { row: -1, col: -1 },
      { row: 0, col: -1 },
      { row: 1, col: -1 },
    ];
    return super.listMoves({ curPosition, cells, moves });
  }

  private castling(turn: PLAYER_COLOR, axis: Taxis, from: TPosition, to: TPosition, board: Board) {
    if (Math.abs(axis.x) !== 2 || axis.y !== 0) return false;
    if (this.lastMovedTurn !== 0) return false;
    if (from.row !== (turn === PLAYER_COLOR.WHITE ? board.cells.length - 1 : 0) || from.col !== 4) return false;
    const col = axis.x > 0 ? board.cells.length - 1 : 0;
    const rook = board.cells[from.row][col];
    if (!rook || !(rook instanceof Rook) || rook.lastMovedTurn !== 0) return false;
    let startCol = 4;
    const moveSet = new Set();
    board.showAllPossibleMoves(turn === PLAYER_COLOR.WHITE ? PLAYER_COLOR.BLACK : PLAYER_COLOR.WHITE).forEach((move) => {
      move.possibleMoves.forEach((possibleMove) => {
        moveSet.add(JSON.stringify(possibleMove));
      });
    });
    while (0 < startCol && startCol < board.cells.length - 1) {
      if (moveSet.has(JSON.stringify({ row: from.row, col: startCol }))) return false;
      if (startCol !== 4) {
        const piece = board.cells[from.row][startCol];
        if (piece) return false;
      }
      startCol += axis.x > 0 ? 1 : -1;
    }

    [board.cells[from.row][col], board.cells[to.row][axis.x > 0 ? to.col - 1 : to.col + 1]] = [null, board.cells[from.row][col]];
    return true;
  }
}
