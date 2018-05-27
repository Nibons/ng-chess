import { EPieceType } from '@chess/e-piece-type.enum';
import { EPlayerType } from '@chess/eplayer-type.enum';
import { IMove } from '@chess/imove.model';
import { IPiece } from '@chess/ipiece';
import { IPosition } from '@chess/IPosition';

export interface IPlayer {
  playerNumber: number;
  type: EPlayerType;
  pieces: IPiece[];
  moves: IMove[];
  orientation: IPosition; // white:{x:0,y:1}, black{x:0,y:-1}
  MovePiece(move: IMove): void;
  Forfiet(): void;
  MovePawnToPromte(move: IMove, newPieceType: EPieceType): void;
}
