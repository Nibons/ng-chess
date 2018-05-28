import { IPiece } from '@chess/ipiece';
import { IPlayer } from '@chess/iplayer.model';
import { EPlayerType } from '@chess/eplayer-type.enum';
import { ChessObject } from '@chess/chess-object';
import { IMove } from '@chess/imove.model';
import { Board } from '@chess/board';
import { Game } from '@chess/game';
import { EPieceType } from '@chess/e-piece-type.enum';
import { BasePiece } from '@chess/pieces/base-piece';
export abstract class BasePlayer extends ChessObject implements IPlayer {
  playerNumber: number;
  abstract readonly type;
  readonly orientation;
  pieces: IPiece[];
  moves: IMove[];
  board: Board;
  graveYard: IPiece[];
  static getPlayerByNumber(playerNumber: number, game: Game): IPlayer {
    return game.playerList.filter((player: IPlayer) => player.playerNumber === playerNumber)[0];
  }

  MovePiece(move: IMove): void {
    if (move.piece.Move(move.position)) {
      if (move.position.IsOccupied) {
        move.position.piece.Kill();
        console.log(`Player #${this.playerNumber} killed ${move.piece.pieceType.toString} at (${move.position.x},${move.position.y})`);
      }
      console.log(`Player #${this.playerNumber} moved ${move.piece.pieceType} to (${move.position.x},${move.position.y})`);
    } else {
      console.error('invalid move:' + move.toString());
    }
  }
  PromoteMove(move: IMove): void {
    this.MovePiece(move); // PieceFactory should automatically kill the piece after it gets there!
    BasePiece.PieceFactory(move.type, move.position, this, this.board);
  }

  Forfiet(): void {

  }
}
