import { Piece, TPiece } from "./piece";
import { PLAYER_COLOR } from "./playerColor";
import { BLACK_SIGN, WHITE_SIGN } from "./sign";

export class King extends Piece {
  constructor(props: TPiece) {
    super(props);
  }

  show() {
    switch (this.color) {
      case PLAYER_COLOR.WHITE:
        return WHITE_SIGN.KING;
      case PLAYER_COLOR.BLACK:
        return BLACK_SIGN.KING;
      default:
        return "?";
    }
  }
  move() {}
  evolve() {}
  validate() {}
}
