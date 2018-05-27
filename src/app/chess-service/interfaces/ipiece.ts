import { ETeam } from '@chess/eteam.enum';
import { Position } from '@chess/position';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Board } from '@chess/board';
import { IPosition } from '@chess/iposition';
import { Observable } from 'rxjs';
import { IPlayer } from '@chess/iplayer.model';
import { IMove } from '@chess/imove.model';
import { ChessObject } from '@chess/chess-object';

export interface IPiece extends ChessObject {
  readonly pieceType: EPieceType;
  player: IPlayer;
  position: IPosition;
  threatList: IPosition[];
  potentialMoves: IPosition[];
  availableMoves: IMove[];
  hasMoved: boolean;
  isAlive: boolean;
  GetAvailableMoves(): IPosition[];
  HasMoves(): boolean;
  Move(position): boolean;
  GetThreatList(): IPosition[];
  SetThreat(positions: IPosition[]): void;
  SetPotentialMoves(): void;
  Kill(): void;
}
