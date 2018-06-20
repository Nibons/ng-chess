import { ICoordinates } from './icoordinates.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { GameItemStateModel } from '@chess/igame-item.model';
import { Guid } from '@chess/guid';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPosition } from '@chess/iposition.model';
import { IPlayer } from '@chess/iplayer.model';
import { IGameItem } from '@chess/igame-item.model';
import { IBoard } from '@chess/iboard.model';

export interface PieceStateModelList {
  pieces: PieceStateModel[];
}

export interface PieceStateModel extends GameItemStateModel {
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
  boardNumber: Guid;
  coordinates: ICoordinates;
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
