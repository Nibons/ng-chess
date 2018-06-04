import { EPlayerType } from '@chess/eplayer-type.enum';
import { IPlayer } from './../interfaces/iplayer.model';
import { BasePlayer } from '@chess/base-player';
import { IMove } from '@chess/imove.model';
import { IPiece } from '@chess/ipiece';
import { IPosition } from '@chess/iposition';
import { Observable } from 'rxjs';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';
export class Human extends BasePlayer implements IPlayer {
  playerNumber: number;
  pieceOrientation: number;
  color: string;
  pieces: IPiece[];
  SumPieceValue: number;
  moves: Observable<IMove>;
  forward: IPosition;
  graveYard: IPiece[];
  MovePiece(move: IMove): void {
    throw new Error('Method not implemented.');
  }
  PromoteMove(move: IMove): void {
    throw new Error('Method not implemented.');
  }
  PieceCount(pieceType: EPieceType): number {
    throw new Error('Method not implemented.');
  }
  Forfiet(): void {
    throw new Error('Method not implemented.');
  }
  AddPiece(piece: IPiece): void {
    throw new Error('Method not implemented.');
  }
  id: Guid;
  readonly type: EPlayerType = EPlayerType.human;

}
