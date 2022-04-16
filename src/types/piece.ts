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
  cells: (Piece | null)[][];
  currentTurn: number;
  promotion: PROMOTION_STRING | null | undefined;
};
