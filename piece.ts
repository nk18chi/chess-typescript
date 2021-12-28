import { PLAYER_COLOR } from "./playerColor";
import { TPosition } from "./position";
import { BLACK_SIGN, TSign, WHITE_SIGN } from "./sign";

export type TPiece = {
  color: PLAYER_COLOR;
};

interface IPiece {
  show(): TSign;
  validate(from: TPosition, to: TPosition): boolean;
  evolve(): void;
}

export abstract class Piece implements IPiece {
  protected sign: TSign = null;
  readonly color: PLAYER_COLOR;
  constructor({ color }: TPiece) {
    this.color = color;
  }

  abstract validate(from: TPosition, to: TPosition): boolean;
  abstract evolve(): void;
  show() {
    return this.sign;
  }
}
