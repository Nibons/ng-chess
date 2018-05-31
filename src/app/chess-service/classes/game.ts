import { IPieceConstructor } from '@chess/ipiece-constructor.model';
import { IBoardConstructor } from '@chess/i-board-constructor.model';
import { Board } from '@chess/board';
import { ChessObject } from '@chess/chess-object';
import { IPlayer } from '@chess/iplayer.model';
import { from, Observable } from 'rxjs';
import { IMove } from '@chess/imove.model';

export class Game extends ChessObject {
  public board: Board;
  public turnList: IMove[];
  public turnList$: Observable<IMove> = from(this.turnList);
  public playerList: IPlayer[];
  constructor(boardConfig: IBoardConstructor, piecesConfig: IPieceConstructor[], playerList: IPlayer[]) {
    super();
    // pull in the players
    this.playerList = playerList;

    // create the board
    this.board = new Board(boardConfig, this);

    // place all the pieces
    this.board.PopulatePieces(piecesConfig, this);
  }
}
