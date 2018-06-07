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
import { ICoordinates } from '@chess/icoordinates.model';
import { IBoard } from '@chess/iboard.model';

export interface PieceStateModelList {
  pieces: PieceStateModel[];
}

export interface PieceStateModel extends GameItemStateModel {
  playerNumber: number;
  playerId: Guid;
  readonly pieceType: EPieceType;
  IsPrimary: boolean;
  coordinates: ICoordinates;
  IsAlive: boolean;
  HasMoved: boolean;
  positionId: number;
  threatList: number[];
  potentialMoves: number[];
  readonly value: number;
}

export interface IPiece extends IGameItem, PieceStateModel {
  position: IPosition;
  board: IBoard;
  owner(): IPlayer;
  HasMoves(): boolean;
  RefreshThreatList(): void;
  RefreshMoveList(): void;
  Move(position: IPosition): boolean;
  GetThreatList(): IPosition[];
  Kill(): void;
}
