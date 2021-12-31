import { PLAYER_COLOR } from "./playerColor";
import { TPosition } from "./position";
import { TSign } from "./sign";

export type TPiece = {
  color: PLAYER_COLOR;
};

interface IPiece {
  show(): TSign;
  validate(from: TPosition, to: TPosition): boolean;
}

export abstract class Piece implements IPiece {
  protected sign: TSign = null;
  readonly color: PLAYER_COLOR;
  constructor({ color }: TPiece) {
    this.color = color;
  }

  abstract validate(from: TPosition, to: TPosition): boolean;
  show() {
    return this.sign;
  }
}
