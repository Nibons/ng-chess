import { IPiece } from '@chess/ipiece';
import { IPlayer } from '@chess/iplayer.model';
import { EPlayerType } from '@chess/eplayer-type.enum';
import { ChessObject } from '@chess/chess-object';
import { IMove } from '@chess/imove.model';
import { Board } from '@chess/board';
export abstract class BasePlayer extends ChessObject implements IPlayer {
  abstract readonly type;
  pieces: IPiece[];
  moves: IMove[];
  board: Board;

  MovePiece(move: IMove): void {

  }
}
