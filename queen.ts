import { Piece, TPiece } from "./piece";
import { PLAYER_COLOR } from "./playerColor";
import { TPosition } from "./position";
import { BLACK_SIGN, WHITE_SIGN } from "./sign";

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

  validate(from: TPosition, to: TPosition) {
    if (Math.abs(from.row - to.row) === Math.abs(from.col - to.col)) return true;
    if (Math.abs(from.row - to.row) === 0 || Math.abs(from.col - to.col) === 0) return true;
    return false;
  }
}
