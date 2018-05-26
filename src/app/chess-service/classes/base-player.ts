import { IPiece } from '@chess/ipiece';
import { IPlayer } from '@chess/iplayer.model';
import { EPlayerType } from '@chess/eplayer-type.enum';
import { ChessObject } from '@chess/chess-object';
import { IMove } from '@chess/imove.model';
import { Board } from '@chess/board';
import { Game } from '@chess/game';
export abstract class BasePlayer extends ChessObject implements IPlayer {
  absract playerNumber: number;
  abstract readonly type;
  pieces: IPiece[];
  moves: IMove[];
  board: Board;
  static getPlayerByNumber(playerNumber: number, game: Game): IPlayer {
    return game.playerList.filter((player: IPlayer) => player.playerNumber === playerNumber)[0];
  }

  MovePiece(move: IMove): void {

  }

  Forfiet(): void {

  }
}
