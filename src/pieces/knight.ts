import { Piece } from "./piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { BLACK_SIGN, WHITE_SIGN } from "../types/sign";
import { Taxis } from "../types/axis";
import { TListMoves, TMove, TPiece } from "../types/piece";
import { TPosition } from "../types/position";

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

  validate(axis: Taxis, isEnemy: boolean) {
    if (!super.validate(axis, isEnemy)) return false;
    if (Math.abs(axis.x) === 2 && Math.abs(axis.y) === 1) return true;
    if (Math.abs(axis.x) === 1 && Math.abs(axis.y) === 2) return true;
    return false;
  }

  listMoves({ cells, curPosition }: TListMoves): TPosition[] {
    const moves: TMove[] = [
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: -2, col: -1 },
      { row: -2, col: 1 },
    ];
    return super.listMoves({ curPosition, cells, moves });
  }
}
