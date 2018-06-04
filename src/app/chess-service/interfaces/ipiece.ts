import { Guid } from './../classes/guid';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPosition } from '@chess/iposition';
import { Observable } from 'rxjs';
import { IPlayer } from '@chess/iplayer.model';
import { IMove } from '@chess/imove.model';
import { ChessObject } from '@chess/chess-object';
import { IGameItem } from '@chess/igame-item.model';

export interface IPiece extends IGameItem {
  readonly value: number;
  readonly pieceType: EPieceType;
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
  IsPrimary: boolean;
  HasMoves: boolean;
  Move(position: IPosition): boolean;
  RefreshMoveList(): void;
  GetThreatList(): IPosition[];
  RefreshThreatList(): void;
  SetThreat(positions: IPosition[]): void;
  SetPotentialMoves(): void;
  Kill(): void;
}
