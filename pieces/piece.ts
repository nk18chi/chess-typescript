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

interface IPiece {
  lastMovedTurn: number;
  show(): TSign;
  moved(): void;
  validate(axis: Taxis, isEnemy: boolean): boolean;
  shouldPromotion(position: TPosition, maxRow: number): boolean;
  promotion(pieceString: PROMOTION_STRING): Piece | null;
  enPassant(turn: PLAYER_COLOR, axis: Taxis, to: TPosition, cells: (Piece | null)[][], currentTurn: number): boolean;
}

export class Piece implements IPiece {
  protected sign: TSign = null;
  protected isMoved = false;
  readonly color: PLAYER_COLOR;
  lastMovedTurn = 0;
  constructor({ color }: TPiece) {
    this.color = color;
  }

  validate(axis: Taxis, isEnemy: boolean) {
    if (axis.x === 0 && axis.y === 0) return false;
    return true;
  }

  moved() {
    this.isMoved = true;
  }

  show() {
    return this.sign;
  }

  enPassant(turn: PLAYER_COLOR, axis: Taxis, to: TPosition, cells: (Piece | null)[][], currentTurn: number) {
    return false;
  }

  shouldPromotion(position: TPosition, maxRow: number): boolean {
    return false;
  }

  promotion(pieceString: PROMOTION_STRING): Piece | null {
    return null;
  }
}
