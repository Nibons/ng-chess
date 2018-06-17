import { EPieceType } from './../enums/e-piece-type.enum';
import { PieceStateModel } from '@chess/ipiece.model';
export interface IPieceActor {
  pieceType: EPieceType;
  value: number;
  GetThreatPositionIds(piece: PieceStateModel): number[];
  GetPotentialMovePositionIds(piece: PieceStateModel): number[];
  GetWatchList(piece: PieceStateModel): void;
}
