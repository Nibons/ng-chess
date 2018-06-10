import { PieceActions } from '@chess/pieces/piece-actions';
import { EPieceType } from '@chess/e-piece-type.enum';
import { PieceStateModel } from './ipiece.model';
export interface IPieceActions {
  value: number;
  GetThreatPositionIds(piece: PieceStateModel): number[];
  GetPotentialMovePositionIds(piece: PieceStateModel): number[];
}
