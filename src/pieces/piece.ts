/* eslint-disable @typescript-eslint/no-unused-vars */
import { Taxis } from "../types/axis";
import { PROMOTION_STRING, TListMoves, TPiece, TSpecialMove } from "../types/piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { TPosition } from "../types/position";
import { TSign } from "../types/sign";

export const getPromotionEnum = (str: string) => {
  switch (str) {
    case PROMOTION_STRING.QUEEN:
      return PROMOTION_STRING.QUEEN;
    case PROMOTION_STRING.ROOK:
      return PROMOTION_STRING.ROOK;
    case PROMOTION_STRING.BISHOP:
      return PROMOTION_STRING.BISHOP;
    case PROMOTION_STRING.KNIGHT:
      return PROMOTION_STRING.KNIGHT;
    default:
      return null;
  }
};

interface IPiece {
  lastMovedTurn: number;
  show(): TSign;
  moved(axis: Taxis, currentTurn: number): void;
  validate(axis: Taxis, isEnemy: boolean): boolean;
  specialMove(param: TSpecialMove): boolean;
  listMoves(param: TListMoves): TPosition[];
}

export class Piece implements IPiece {
  protected sign: TSign = null;
  readonly color: PLAYER_COLOR;
  lastMovedTurn = 0;
  constructor({ color }: TPiece) {
    this.color = color;
  }

  validate(axis: Taxis, isEnemy: boolean) {
    if (axis.x === 0 && axis.y === 0) return false;
    return true;
  }

  moved(axis: Taxis, currentTurn: number) {
    this.lastMovedTurn = currentTurn;
  }

  show() {
    return this.sign;
  }

  specialMove(param: TSpecialMove) {
    if (param.promotion) throw new Error("the piece is not allowed to promote");
    return false;
  }

  listMoves({ moves, filterFunc, curPosition, cells }: TListMoves): TPosition[] {
    if (!moves) return [];
    return moves
      .map((move) => {
        if (this.color === PLAYER_COLOR.WHITE) {
          move.row *= -1;
        }
        let row = move.row + curPosition.row;
        let col = move.col + curPosition.col;
        const res = [];
        if (move.isRepeat) {
          while (0 <= row && row < cells.length && 0 <= col && col < cells.length) {
            res.push({ ...move, row, col });
            const piece = cells[row][col];
            if (piece) break;
            row += move.row;
            col += move.col;
          }
        } else {
          res.push({ ...move, row, col });
        }
        return res;
      })
      .flat()
      .filter((move) => {
        if (move.row < 0 || cells.length <= move.row) return false;
        if (move.col < 0 || cells.length <= move.col) return false;
        const piece = cells[move.row][move.col];
        if (piece && piece.color === this.color) return false;
        return true;
      })
      .filter(filterFunc ? filterFunc : () => true)
      .map((move) => ({
        row: move.row,
        col: move.col,
      }));
  }
}
