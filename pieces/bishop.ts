import { Piece, TPiece } from "./piece";
import { PLAYER_COLOR } from "../playerColor";
import { BLACK_SIGN, WHITE_SIGN } from "../sign";
import { Taxis } from "../axis";

export class Bishop extends Piece {
  constructor(props: TPiece) {
    super(props);
    switch (this.color) {
      case PLAYER_COLOR.WHITE:
        this.sign = WHITE_SIGN.BITSHOP;
        break;
      case PLAYER_COLOR.BLACK:
        this.sign = BLACK_SIGN.BITSHOP;
        break;
      default:
        this.sign = null;
    }
  }

  validate(axis: Taxis, isEnemy: boolean) {
    if (!super.validate(axis, isEnemy)) return false;
    return Math.abs(axis.x) === Math.abs(axis.y);
  }
}
