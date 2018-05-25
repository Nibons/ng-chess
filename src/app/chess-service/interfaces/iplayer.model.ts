import { EPieceType } from '@chess/e-piece-type.enum';
import { EPlayerType } from '@chess/eplayer-type.enum';
import { IMove } from '@chess/imove.model';
import { IPiece } from '@chess/ipiece';

export interface IPlayer {
  type: EPlayerType;
  pieces: IPiece[];
  moves: IMove[];
  MovePiece(move: IMove): void;
  Forfiet(): void;
  MovePawnToPromte(move: IMove, newPieceType: EPieceType): void;
}
