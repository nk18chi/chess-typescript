import { Taxis } from "../axis";
import { PLAYER_COLOR } from "../playerColor";
import { TSign } from "../sign";

export type TPiece = {
  color: PLAYER_COLOR;
};

interface IPiece {
  show(): TSign;
  moved(): void;
  validate(axis: Taxis, isEnemy: boolean): boolean;
}

export abstract class Piece implements IPiece {
  protected sign: TSign = null;
  protected isMoved = false;
  readonly color: PLAYER_COLOR;
  constructor({ color }: TPiece) {
    this.color = color;
  }

  abstract validate(axis: Taxis, isEnemy: boolean): boolean;
  moved() {
    this.isMoved = true;
  }
  show() {
    return this.sign;
  }
}
