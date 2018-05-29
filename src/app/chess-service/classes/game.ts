import { IPieceConstructor } from '@chess/ipiece-constructor.model';
import { IBoardConstructor } from '@chess/i-board-constructor.model';
import { Board } from './board';
import { ChessObject } from '@chess/chess-object';
import { IPlayer } from '@chess/iplayer.model';

export class Game extends ChessObject {
  public board: Board;
  constructor(boardConfig: IBoardConstructor, piecesConfig: IPieceConstructor[], public playerList: IPlayer[]) {
    super();
    this.board = new Board(boardConfig, piecesConfig, playerList, this);
  }
}
