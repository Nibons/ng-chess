import { ICoordinates } from './icoordinates.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';
import { EPieceType } from '@chess/e-piece-type.enum';

export interface PieceStateModel {
  Id: Guid;
  gameId: Guid;
  playerNumber: number;
  playerId: Guid;
  pieceType: EPieceType;
  IsVital: boolean;
  IsAlive: boolean;
  HasMoved: boolean;
  positionId: Guid;
  threatList: Guid[];
  potentialMoves: Guid[];
  value: number;
  boardNumber: number;
  coordinates: ICoordinates;
}
