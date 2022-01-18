import { Piece, TPiece } from "./piece";
import { PLAYER_COLOR } from "../playerColor";
import { BLACK_SIGN, WHITE_SIGN } from "../sign";
import { Taxis } from "../axis";

export class Pawn extends Piece {
  constructor(props: TPiece) {
    super(props);
    switch (this.color) {
      case PLAYER_COLOR.WHITE:
        this.sign = WHITE_SIGN.PAWN;
        break;
      case PLAYER_COLOR.BLACK:
        this.sign = BLACK_SIGN.PAWN;
        break;
      default:
        this.sign = null;
    }
  }

  validate(axis: Taxis, isEnemy: boolean) {
    console.log(axis, isEnemy);

    if (isEnemy && Math.abs(axis.x) === 1 && axis.y === 1) return true;
    if (!this.isMoved && axis.y === 2 && axis.x === 0) return true;
    if (axis.y === 1 && axis.x === 0) return true;
    return false;
  }
}
