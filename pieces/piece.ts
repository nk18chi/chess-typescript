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

export class Piece implements IPiece {
  protected sign: TSign = null;
  protected isMoved = false;
  readonly color: PLAYER_COLOR;
  constructor({ color }: TPiece) {
    this.color = color;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
}
