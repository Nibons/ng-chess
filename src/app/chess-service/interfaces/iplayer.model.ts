import { PlayerStateModel } from './iplayer.model';
import { IGameItem, GameItemStateModel } from '@chess/igame-item.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { EPlayerType } from '@chess/eplayer-type.enum';
import { IMove } from '@chess/imove.model';
import { IPiece } from '@chess/ipiece.model';
import { IPosition } from '@chess/IPosition.model';
import { Observable } from 'rxjs';
import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';

export interface PlayerStateModelList {
  players: PlayerStateModel[];
}
export interface PlayerStateModel extends GameItemStateModel {
  readonly playerNumber: number;
  playerType: EPlayerType;
  playerColor: string;
  readonly pieceOrientation: ICoordinates;
  viewOrienation: number; // 0 to 359 degrees, 180 = upside-down
  pieces: IPiece[];
  SumPieceValue: number;
  moves: IMove[];
  graveYard: IPiece[];
}

export interface IPlayer extends PlayerStateModel, IGameItem {
  MovePiece(move: IMove): void;
  PromoteMove(move: IMove): void;
  PieceCount(pieceType: EPieceType): number;
  Forfiet(): void;
  AddPiece(piece: IPiece): void;
}
