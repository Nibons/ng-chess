import { EPieceType } from '@chess/epiece-type.enum';
export interface IPiece {
  id: number;
  type: EPieceType;
  positionId: number;
  threat: number[];
}
