import { IPieceConstructor } from '@chess/ipiece-constructor.model';
import { IBoardConstructor } from '@chess/i-board-constructor.model';
import { Board } from '@chess/board';
import { ChessObject } from '@chess/chess-object';
import { IPlayer } from '@chess/iplayer.model';
import { from, Observable } from 'rxjs';
import { IMove } from '@chess/imove.model';
import { IPiece } from '@chess/ipiece';

export class Game extends ChessObject {
  public board: Board;
  public turnList: IMove[];
  public turnList$: Observable<IMove> = from(this.turnList);
  public playerList: IPlayer[];
  public pieces$: Observable<IPiece>;
  constructor(playerList: IPlayer[]) {
    super();
    // pull in the players
    this.playerList = playerList;
  }
  public CreateBoard(boardConfig: IBoardConstructor): Game {
    this.board = new Board(boardConfig, this);
    return this;
  }

  public PlacePieces(piecesConfig: IPieceConstructor[]): Game {
    this.pieces$ = this.board.PopulatePieces(piecesConfig, this);
    return this;
  }
}
