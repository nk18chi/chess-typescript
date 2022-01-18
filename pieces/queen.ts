import { Piece, TPiece } from "./piece";
import { PLAYER_COLOR } from "../playerColor";
import { BLACK_SIGN, WHITE_SIGN } from "../sign";
import { Taxis } from "../axis";

export class Queen extends Piece {
  constructor(props: TPiece) {
    super(props);
    switch (this.color) {
      case PLAYER_COLOR.WHITE:
        this.sign = WHITE_SIGN.QUEEN;
        break;
      case PLAYER_COLOR.BLACK:
        this.sign = BLACK_SIGN.QUEEN;
        break;
      default:
        this.sign = null;
    }
  }

  validate(axis: Taxis) {
    if (Math.abs(axis.x) === Math.abs(axis.y)) return true;
    if (axis.x === 0 || axis.y === 0) return true;
    return false;
  }
}
