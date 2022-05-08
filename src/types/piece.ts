import { Board } from "../board";
import { Piece } from "../pieces/piece";
import { Taxis } from "./axis";
import { PLAYER_COLOR } from "./playerColor";
import { TPosition } from "./position";

export type TPiece = {
  color: PLAYER_COLOR;
};

export enum PROMOTION_STRING {
  QUEEN = "q",
  ROOK = "r",
  BISHOP = "b",
  KNIGHT = "k",
}

export type TSpecialMove = {
  turn: PLAYER_COLOR;
  axis: Taxis;
  from: TPosition;
  to: TPosition;
  promotion: PROMOTION_STRING | null | undefined;
  board: Board;
};

export type TListMoves = {
  curPosition: TPosition;
  cells: (Piece | null)[][];
  moves?: TMove[];
  filterFunc?: (move: TMove) => boolean;
};

export type TMove = {
  row: number;
  col: number;
  isEnemy?: boolean;
  isTwoStepMoved?: boolean;
  isRepeat?: boolean;
};

export const sortPositionFunc = (a: TPosition, b: TPosition) => {
  return a.row - b.row || a.col - b.col;
};
