import { ETeam } from '@chess/eteam.enum';
import { Position } from '@chess/position';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Board } from '@chess/board';
import { IPosition } from '@chess/iposition';
import { Observable } from 'rxjs';
import { IPlayer } from '@chess/iplayer.model';

export interface IPiece {
  readonly pieceType: EPieceType;
  player: IPlayer;
  position: IPosition;
  threatList(): IPosition[];
  HasMoved(): boolean;
  getAvailableMoves(): IPosition[];
  HasMoves(): boolean;
  GetThreatPositionList(): IPosition[];
  setThreat(positions: IPosition[]): void;
  SetPotentialMoves(): void;
  GetPotentialMoves(): IPosition[];
}
