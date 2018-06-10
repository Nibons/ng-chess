import { Piece } from '@chess/piece';
import { PieceStateModel } from './ipiece.model';
export interface IPieceActions {
  value: number;
  GetThreatPositionIds(piece: Piece): number[];
  GetPotentialMovePositionIds(piece: Piece): number[];
}
