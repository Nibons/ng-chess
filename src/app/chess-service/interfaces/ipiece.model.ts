import { PieceStateModel } from '@chess/ipiece.model';
import { GameItemStateModel } from './igame-item.model';
import { Coordinates } from '@chess/coordinates';
import { Guid } from './../classes/guid';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPosition } from '@chess/iposition.model';
import { Observable } from 'rxjs';
import { IPlayer } from '@chess/iplayer.model';
import { IMove } from '@chess/imove.model';
import { IGameItem } from '@chess/igame-item.model';

export interface PieceStateModel extends GameItemStateModel {
  playerNumber: number;
  playerId: Guid;
  readonly pieceType: EPieceType;
  IsPrimary: boolean;
  coordinates: Coordinates;
  IsAlive: boolean;
  HasMoved: boolean;
  positionId: Guid;
  threatList: Guid[];
  potentialMoves: Guid[];
  readonly value: number;
}

export interface IPiece extends IGameItem, PieceStateModel {
  position: IPosition;
  owner(): IPlayer;
  HasMoves(): boolean;
  RefreshThreatList(): void;
  RefreshMoveList(): void;
  Move(position: IPosition): boolean;
  GetThreatList(): IPosition[];
  Kill(): void;
}
