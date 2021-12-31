import { Piece, TPiece } from "./piece";
import { PLAYER_COLOR } from "./playerColor";
import { TPosition } from "./position";
import { BLACK_SIGN, WHITE_SIGN } from "./sign";

export class King extends Piece {
  constructor(props: TPiece) {
    super(props);
    switch (this.color) {
      case PLAYER_COLOR.WHITE:
        this.sign = WHITE_SIGN.KING;
        break;
      case PLAYER_COLOR.BLACK:
        this.sign = BLACK_SIGN.KING;
        break;
      default:
        this.sign = null;
    }
  }

  validate(from: TPosition, to: TPosition) {
    if (Math.abs(from.row - to.row) > 1) return false;
    if (Math.abs(from.col - to.col) > 1) return false;
    return true;
  }
}
