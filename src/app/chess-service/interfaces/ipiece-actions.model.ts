import { EPieceType } from '@chess/e-piece-type.enum';
import { PieceStateModel } from './ipiece.model';
import { Piece } from '@chess/pieces/piece';
export interface IPieceActions {
  value: number;
  GetThreatPositionIds(piece: PieceStateModel): number[];
  GetPotentialMovePositionIds(piece: PieceStateModel): number[];
}
