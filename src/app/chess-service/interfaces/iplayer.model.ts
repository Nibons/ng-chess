import { EPieceType } from '@chess/e-piece-type.enum';
import { EPlayerType } from '@chess/eplayer-type.enum';
import { IMove } from '@chess/imove.model';
import { IPiece } from '@chess/ipiece.model';
import { IPosition } from '@chess/IPosition.model';
import { Observable } from 'rxjs';
import { Guid } from '@chess/guid';

export interface IPlayer {
  Id: Guid;
  readonly playerNumber: number;
  type: EPlayerType;
  playerColor: string;
  readonly pieceOrientation: Coordinates;
  viewOrienation: number; // 0 to 359 degrees, 180 = upside-down
  pieces: IPiece[];
  SumPieceValue: number;
  moves: Observable<IMove>;
  graveYard: IPiece[];
  MovePiece(move: IMove): void;
  PromoteMove(move: IMove): void;
  PieceCount(pieceType: EPieceType): number;
  Forfiet(): void;
  AddPiece(piece: IPiece): void;
}
