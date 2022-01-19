import { Piece, TPiece } from "./piece";
import { PLAYER_COLOR } from "../playerColor";
import { BLACK_SIGN, WHITE_SIGN } from "../sign";
import { Taxis } from "../axis";

export class Rook extends Piece {
  constructor(props: TPiece) {
    super(props);
    switch (this.color) {
      case PLAYER_COLOR.WHITE:
        this.sign = WHITE_SIGN.ROOK;
        break;
      case PLAYER_COLOR.BLACK:
        this.sign = BLACK_SIGN.ROOK;
        break;
      default:
        this.sign = null;
    }
  }

  validate(axis: Taxis, isEnemy: boolean) {
    if (!super.validate(axis, isEnemy)) return false;
    if (Math.abs(axis.y) > 0 && Math.abs(axis.x) > 0) return false;
    return true;
  }
}
