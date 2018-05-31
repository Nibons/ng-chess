import { Position } from '@chess/position';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Board } from '@chess/board';
import { IPosition } from '@chess/iposition';
import { Observable } from 'rxjs';
import { IPlayer } from '@chess/iplayer.model';
import { IMove } from '@chess/imove.model';
import { ChessObject } from '@chess/chess-object';

export interface IPiece extends ChessObject {
  readonly value: number;
  readonly pieceType: EPieceType;
  playerNumber: number;
  position: IPosition;
  threatList: IPosition[];
  potentialMoves: IPosition[];
  moves$: Observable<IMove>;
  hasMoved: boolean;
  isAlive: boolean;
  HasMoves(): boolean;
  Move(position): boolean;
  GetThreatList(): IPosition[];
  SetThreat(positions: IPosition[]): void;
  SetPotentialMoves(): void;
  Kill(): void;
}
