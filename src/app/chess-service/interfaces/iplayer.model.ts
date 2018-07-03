import { Guid } from '@chess/guid';
import { PlayerStateModel } from './iplayer.model';
import { EPlayerType } from '@chess/eplayer-type.enum';
import { IMove } from '@chess/imove.model';
import { ICoordinates } from '@chess/icoordinates.model';

export interface PlayerStateModel {
  Id: Guid;
  readonly playerNumber: number;
  playerType: EPlayerType;
  playerColor: string;
  readonly pieceOrientation: ICoordinates;
  viewOrienation: number; // 0 to 359 degrees, 180 = upside-down
  SumPieceValue: number;
  moves: IMove[];
}
