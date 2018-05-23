import { EPieceType } from '../enums/e-piece-type.enum';
import {IPiece} from '../interfaces/ipiece';

export class Player {
  livingPieces: IPiece[];
  deadPieces: IPiece[];
  IsInCheck = false;
  IsCurrentTurn = false;

  constructor(color: EPieceType) { }
}
