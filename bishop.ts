import { Piece, TPiece } from "./piece";
import { PLAYER_COLOR } from "./playerColor";
import { TPosition } from "./position";
import { BLACK_SIGN, WHITE_SIGN } from "./sign";

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

  validate(from: TPosition, to: TPosition) {
    return Math.abs(from.row - to.row) === Math.abs(from.col - to.col);
  }
}
