import { Piece, TPiece } from "./piece";
import { PLAYER_COLOR } from "./playerColor";
import { TPosition } from "./position";
import { BLACK_SIGN, WHITE_SIGN } from "./sign";

export class Knight extends Piece {
  constructor(props: TPiece) {
    super(props);
    switch (this.color) {
      case PLAYER_COLOR.WHITE:
        this.sign = WHITE_SIGN.KNIGHT;
        break;
      case PLAYER_COLOR.BLACK:
        this.sign = BLACK_SIGN.KNIGHT;
        break;
      default:
        this.sign = null;
    }
  }

  validate(from: TPosition, to: TPosition) {
    if (Math.abs(from.row - to.row) === 2 && Math.abs(from.col - to.col) === 1) return true;
    if (Math.abs(from.row - to.row) === 1 && Math.abs(from.col - to.col) === 2) return true;
    return false;
  }
}
