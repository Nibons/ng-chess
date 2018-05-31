import { Player } from './team';
import { IPiece } from '@chess/ipiece';
import { IPlayer } from '@chess/iplayer.model';
import { EPlayerType } from '@chess/eplayer-type.enum';
import { ChessObject } from '@chess/chess-object';
import { IMove } from '@chess/imove.model';
import { Board } from '@chess/board';
import { Game } from '@chess/game';
import { EPieceType } from '@chess/e-piece-type.enum';
import { BasePiece } from '@chess/pieces/base-piece';
import { PieceFactory } from '@chess/pieces/piece-factory';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
export abstract class BasePlayer extends ChessObject implements IPlayer {
  abstract readonly type;
  readonly forward;
  pieceOrientation = 0;
  playerNumber: number;
  color: string;
  pieces: IPiece[];
  graveYard: IPiece[];
  moves$: Observable<IMove>;
  public get SumPieceValue(): number {
    let running_total = 0;
    this.pieces.forEach(p => running_total += p.value);
    return running_total;
  }
  public get moves(): Observable<IMove> {
    return this.moves$;
  }

  constructor(playerNumber: number) {
    super();
    this.playerNumber = playerNumber;
  }


  static getPlayerByNumber(playerNumber: number, game: Game): IPlayer {
    return game.playerList.filter((player: IPlayer) => player.playerNumber === playerNumber)[0];
  }
  PieceCount(pieceType: EPieceType = null): number {
    return this.pieces.filter(piece => pieceType === null || piece.pieceType === pieceType).length;
  }
  TakeOwnPiece(piece: IPiece) {
    this.pieces.push(piece);
    this.moves$ = merge(this.moves$, piece.moves$);
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
    PieceFactory.Create(move.piece.pieceType, move.position, move.piece.playerNumber, move.piece.position.board);
  }
  Forfiet(): void {
  }
}
