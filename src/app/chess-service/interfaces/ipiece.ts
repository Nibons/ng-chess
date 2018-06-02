import { Guid } from './../classes/guid';
import { Position } from '@chess/position';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Board } from '@chess/board';
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
  potentialMoves: IPosition[];
  moves$: Observable<IMove>;
  hasMoved: boolean;
  isAlive: boolean;
  primary: boolean;
  HasMoves(): boolean;
  Move(position): boolean;
  GetThreatList(): IPosition[];
  SetThreat(positions: IPosition[]): void;
  SetPotentialMoves(): void;
  Kill(): void;
}
