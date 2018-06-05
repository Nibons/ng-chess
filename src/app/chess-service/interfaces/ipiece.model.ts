import { Coordinates } from '@chess/coordinates';
import { Guid } from './../classes/guid';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPosition } from '@chess/iposition.model';
import { Observable } from 'rxjs';
import { IPlayer } from '@chess/iplayer.model';
import { IMove } from '@chess/imove.model';
import { IGameItem } from '@chess/igame-item.model';

export interface IPiece extends IGameItem {
  playerNumber: number;
  readonly pieceType: EPieceType;
  IsPrimary: boolean;
  coordinates: Coordinates;
  readonly value: number;
  playerId: Guid;
  owner: IPlayer;
  positionId: Guid;
  position: IPosition;
  threatList: IPosition[];
  threatList$: Observable<IMove>;
  potentialMoves: IPosition[];
  moves$: Observable<IMove>;
  hasMoved: boolean;
  IsAlive: boolean;
  HasMoves: boolean;
  Move(position: IPosition): boolean;
  RefreshMoveList(): void;
  GetThreatList(): IPosition[];
  RefreshThreatList(): void;
  SetThreat(positions: IPosition[]): void;
  SetPotentialMoves(): void;
  Kill(): void;
}
