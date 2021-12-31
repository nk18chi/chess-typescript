import { Piece, TPiece } from "./piece";
import { PLAYER_COLOR } from "./playerColor";
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  evolve() {}
  validate() {
    return true;
  }
}
