import { Board } from './board';
import { ChessObject } from '@chess/chess-object';
import { IPlayer } from '@chess/iplayer.model';

export class Game extends ChessObject {
  constructor(public playerList: IPlayer[], public board: Board) {
    super();
  }
}
