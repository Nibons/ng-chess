import { EPieceType } from '@chess/e-piece-type.enum';
import { EPlayerType } from '@chess/eplayer-type.enum';
import { IMove } from '@chess/imove.model';
import { IPiece } from '@chess/ipiece';
import { IPosition } from '@chess/IPosition';
import { Board } from '@chess/board';
import { ChessObject } from '@chess/chess-object';
import { Observable } from 'rxjs';

export interface IPlayer extends ChessObject {
  playerNumber: number;
  type: EPlayerType;
  pieceOrientation: number;
  color: string;
  pieces: IPiece[];
  SumPieceValue: number;
  moves: Observable<IMove>;
  forward: IPosition; // white:{x:0,y:1}, black{x:0,y:-1}
  graveYard: IPiece[];
  MovePiece(move: IMove): void;
  PieceCount(pieceType: EPieceType): number;
  Forfiet(): void;
  PromoteMove(move: IMove): void;
  TakeOwnPiece(piece: IPiece): void;
}
