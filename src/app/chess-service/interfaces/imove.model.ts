import { EPieceType } from './../enums/epiece-type.enum';
export interface IMove {
  playerId: number;
  pieceId: number;
  position: number;
  newPiece?: EPieceType;
  additionalMove?: IMove;
}
