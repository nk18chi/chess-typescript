import { Piece } from "./piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { BLACK_SIGN, WHITE_SIGN } from "../types/sign";
import { Taxis } from "../types/axis";
import { TPiece } from "../types/piece";

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
