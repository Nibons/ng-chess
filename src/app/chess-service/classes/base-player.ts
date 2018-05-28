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
  public get SumPieceValue(): number {
    let running_total = 0;
    this.pieces.forEach(p => running_total += p.value);
    return running_total;
  }
  color: string;
  pieces: IPiece[];
  board: Board;
  graveYard: IPiece[];

  get moves(): IMove[] {
    const list: IMove[] = new Array();
    this.pieces.forEach(
      each_piece => {
        each_piece.availableMoves.forEach(
          each_move => {
            list.push(each_move);
          }
        );
      }
    );
    return list;
  }
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
