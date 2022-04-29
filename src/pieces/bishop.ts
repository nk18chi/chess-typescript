import { Piece } from "./piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { BLACK_SIGN, WHITE_SIGN } from "../types/sign";
import { Taxis } from "../types/axis";
import { TListMoves, TMove, TPiece } from "../types/piece";
import { TPosition } from "../types/position";

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

  listMoves({ cells, curPosition }: TListMoves): TPosition[] {
    const moves: TMove[] = [
      { row: 1, col: 1, isRepeat: true },
      { row: -1, col: 1, isRepeat: true },
      { row: -1, col: -1, isRepeat: true },
      { row: 1, col: -1, isRepeat: true },
    ];

    return super.listMoves({ curPosition, cells, moves });
  }
}
