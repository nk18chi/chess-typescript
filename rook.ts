import { Piece, TPiece } from "./piece";
import { PLAYER_COLOR } from "./playerColor";
import { TPosition } from "./position";
import { BLACK_SIGN, WHITE_SIGN } from "./sign";

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

  validate(from: TPosition, to: TPosition) {
    if (Math.abs(from.row - to.row) > 0 && Math.abs(from.col - to.col) > 0) return false;
    return true;
  }
}
