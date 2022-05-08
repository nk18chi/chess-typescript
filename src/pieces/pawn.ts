import { Piece } from "./piece";
import { PLAYER_COLOR } from "../types/playerColor";
import { Taxis } from "../types/axis";
import { Queen } from "./queen";
import { Rook } from "./rook";
import { Bishop } from "./bishop";
import { Knight } from "./knight";
import { TPosition } from "../types/position";
import { BLACK_SIGN, WHITE_SIGN } from "../types/sign";
import { PROMOTION_STRING, TListMoves, TMove, TPiece, TSpecialMove } from "../types/piece";
import { Board } from "../board";

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

  specialMove({ turn, axis, from, to, board, promotion }: TSpecialMove) {
    if (this.shouldPromotion(to, board.cells.length)) {
      if (!promotion) throw new Error("the piece must promote");
      const newPiece = this.promotion(promotion);
      board.cells[from.row][from.col] = newPiece;
      return true;
    } else {
      if (promotion) throw new Error("the piece cannot promote from the current place");
    }
    return this.enPassant(turn, axis, to, board);
  }

  private enPassant(turn: PLAYER_COLOR, axis: Taxis, to: TPosition, board: Board) {
    if (Math.abs(axis.x) !== 1 || axis.y !== 1) return false;
    const row: number = to.row + (turn === PLAYER_COLOR.WHITE ? 1 : -1);
    if (row < 0 || board.cells.length - 1 < row) return false;
    const piece = board.cells[row][to.col];
    if (!piece || piece.color === turn) return false;
    if (piece.lastMovedTurn !== board.currentTurn) return false;
    if (!(piece instanceof Pawn) || !piece.isTwoStepMoved) return false;
    board.cells[row][to.col] = null;

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
    if (this.lastMovedTurn === 0 && axis.y === 2 && axis.x === 0) return true;
    if (axis.y === 1 && axis.x === 0) return true;
    return false;
  }

  moved(axis: Taxis, currentTurn: number) {
    super.moved(axis, currentTurn);
    if (axis.y === 2 && axis.x === 0) this.isTwoStepMoved = true;
  }

  listMoves({ cells, curPosition }: TListMoves): TPosition[] {
    const moves: TMove[] = [
      { row: 1, col: -1, isEnemy: true },
      { row: 1, col: 1, isEnemy: true },
      { row: 1, col: 0 },
      { row: 2, col: 0, isTwoStepMoved: true },
    ];
    const filterFunc = (move: TMove) => {
      const piece = cells[move.row][move.col];
      if (move.isEnemy) {
        if (!piece) return false;
        if (piece.color === this.color) return false;
      } else if (piece) return false;
      else if (move.isTwoStepMoved && this.lastMovedTurn > 0) return false;
      return true;
    };
    return super.listMoves({ curPosition, cells, moves, filterFunc });
  }
}
