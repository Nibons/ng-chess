import { PieceActions } from '@chess/pieces/piece-actions';
import { EPieceType } from '@chess/e-piece-type.enum';
import { PieceStateModel } from './ipiece.model';
export interface IPieceActions {
  value: number;
  GetThreatPositionIds(piece: PieceActions): number[];
  GetPotentialMovePositionIds(piece: PieceActions): number[];
}
