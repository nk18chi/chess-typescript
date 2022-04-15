/* eslint-disable @typescript-eslint/no-unused-vars */
import { Taxis } from "../axis";
import { PLAYER_COLOR } from "../playerColor";
import { TPosition } from "../position";
import { TSign } from "../sign";

export type TPiece = {
  color: PLAYER_COLOR;
};

export enum PROMOTION_STRING {
  QUEEN = "q",
  ROOK = "r",
  BISHOP = "b",
  KNIGHT = "k",
}

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

export type TSpecialMove = {
  turn: PLAYER_COLOR;
  axis: Taxis;
  from: TPosition;
  to: TPosition;
  cells: (Piece | null)[][];
  currentTurn: number;
  promotion: PROMOTION_STRING | null | undefined;
};

interface IPiece {
  lastMovedTurn: number;
  show(): TSign;
  moved(axis: Taxis): void;
  validate(axis: Taxis, isEnemy: boolean): boolean;
  specialMove(param: TSpecialMove): boolean;
}

export class Piece implements IPiece {
  protected sign: TSign = null;
  protected movedCount = 0;
  readonly color: PLAYER_COLOR;
  lastMovedTurn = 0;
  constructor({ color }: TPiece) {
    this.color = color;
  }

  validate(axis: Taxis, isEnemy: boolean) {
    if (axis.x === 0 && axis.y === 0) return false;
    return true;
  }

  moved(axis: Taxis) {
    this.movedCount += 1;
  }

  show() {
    return this.sign;
  }

  specialMove(param: TSpecialMove) {
    if (param.promotion) throw new Error("the piece is not allowed to promote");
    return false;
  }
}
