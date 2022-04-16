/* eslint-disable @typescript-eslint/no-unused-vars */
import { Taxis } from "../types/axis";
import { PROMOTION_STRING, TPiece, TSpecialMove } from "../types/piece";
import { PLAYER_COLOR } from "../types/playerColor";
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
}
