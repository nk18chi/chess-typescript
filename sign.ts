export enum WHITE_SIGN {
  KING = "♔",
  QUEEN = "♕",
  ROOK = "♖",
  BITSHOP = "♗",
  KNIGHT = "♘",
  PAWN = "♙",
}

export enum BLACK_SIGN {
  KING = "♚",
  QUEEN = "♛",
  ROOK = "♜",
  BITSHOP = "♝",
  KNIGHT = "♞",
  PAWN = "♟",
}

export type TSign = WHITE_SIGN | BLACK_SIGN | null;
export const KINGS: TSign[] = [WHITE_SIGN.KING, BLACK_SIGN.KING];
