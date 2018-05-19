import { EPieceType } from "../enums/e-piece-type.enum";

export class Team {
  livingPieces: IPiece[];
  deadPieces: IPiece[];
  IsInCheck: boolean;
  IsCurrentTurn: boolean;

  constructor(color: e-EPieceType){}
}
