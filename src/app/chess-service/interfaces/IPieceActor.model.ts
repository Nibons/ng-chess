import { ICoordinates } from '@chess/icoordinates.model';
import { EPieceType } from './../enums/e-piece-type.enum';
import { PieceStateModel } from '@chess/ipiece.model';
import { BoardStateModel } from '@chess/iboard.model';
import { PositionStateModel } from '@chess/iposition.model';
import { Guid } from '@chess/guid';
export interface IPieceActor {
  pieceType: EPieceType;
  value: number;
  GetThreatPositionIds(piece: PieceStateModel): Guid[];
  GetPotentialMovePositionIds(piece: PieceStateModel): Guid[];
  GetWatchList(piece: PieceStateModel): void;
  GetPositionsInDirectionUntilEmpty(piece: PieceStateModel, coordinates: ICoordinates, count: number): Guid[];
  GetBoard(piece: PieceStateModel): BoardStateModel;
  GetPositionByCoordinates(coordinates: ICoordinates, board: BoardStateModel): PositionStateModel;
}
