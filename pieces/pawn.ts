import { Piece, PROMOTION_STRING, TPiece, TSpecialMove } from "./piece";
import { PLAYER_COLOR } from "../playerColor";
import { BLACK_SIGN, WHITE_SIGN } from "../sign";
import { Taxis } from "../axis";
import { Queen } from "./queen";
import { Rook } from "./rook";
import { Bishop } from "./bishop";
import { Knight } from "./knight";
import { TPosition } from "../position";

export class Pawn extends Piece {
  private isTwoStepMoved = false;
  constructor(props: TPiece) {
    super(props);
    switch (this.color) {
      case PLAYER_COLOR.WHITE:
        this.sign = WHITE_SIGN.PAWN;
        break;
      case PLAYER_COLOR.BLACK:
        this.sign = BLACK_SIGN.PAWN;
        break;
      default:
        this.sign = null;
    }
  }

  specialMove({ turn, axis, from, to, cells, currentTurn, promotion }: TSpecialMove) {
    if (this.shouldPromotion(to, cells.length)) {
      if (!promotion) throw new Error("the piece must promote");
      const newPiece = this.promotion(promotion);
      cells[from.row][from.col] = newPiece;
      return true;
    } else {
      if (promotion) throw new Error("the piece cannot promote from the current place");
    }
    return this.enPassant(turn, axis, to, cells, currentTurn);
  }

  private enPassant(turn: PLAYER_COLOR, axis: Taxis, to: TPosition, cells: (Piece | null)[][], currentTurn: number) {
    if (Math.abs(axis.x) !== 1 || axis.y !== 1) return false;
    const row: number = to.row + (turn === PLAYER_COLOR.WHITE ? 1 : -1);
    if (row < 0 || cells.length - 1 < row) return false;
    const piece = cells[row][to.col];
    if (!piece || piece.color === turn) return false;
    if (piece.lastMovedTurn !== currentTurn - 1) return false;
    if (!(piece instanceof Pawn) || !piece.isTwoStepMoved) return false;
    cells[row][to.col] = null;

    return true;
  }

  private shouldPromotion(position: TPosition, maxRow: number) {
    switch (this.color) {
      case PLAYER_COLOR.WHITE:
        if (position.row !== 0) return false;
        break;
      case PLAYER_COLOR.BLACK:
        if (position.row !== maxRow - 1) return false;
        break;
      default:
        return false;
    }
    return true;
  }

  private promotion(pieceString: PROMOTION_STRING | null) {
    switch (pieceString) {
      case PROMOTION_STRING.QUEEN:
        return new Queen({ color: this.color });
      case PROMOTION_STRING.ROOK:
        return new Rook({ color: this.color });
      case PROMOTION_STRING.BISHOP:
        return new Bishop({ color: this.color });
      case PROMOTION_STRING.KNIGHT:
        return new Knight({ color: this.color });
      default:
        return null;
    }
  }

  validate(axis: Taxis, isEnemy: boolean) {
    if (!super.validate(axis, isEnemy)) return false;
    if (isEnemy && Math.abs(axis.x) === 1 && axis.y === 1) return true;
    if (isEnemy) return false;
    if (this.movedCount === 0 && axis.y === 2 && axis.x === 0) return true;
    if (axis.y === 1 && axis.x === 0) return true;
    return false;
  }

  moved(axis: Taxis) {
    super.moved(axis);
    if (axis.y === 2 && axis.x === 0) this.isTwoStepMoved = true;
  }
}
