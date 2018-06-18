import { ICoordinates } from '@chess/icoordinates.model';
import { EPieceType } from './../enums/e-piece-type.enum';
import { PieceStateModel } from '@chess/ipiece.model';
import { BoardStateModel } from '@chess/iboard.model';
import { PositionStateModel } from '@chess/iposition.model';
export interface IPieceActor {
  pieceType: EPieceType;
  value: number;
  GetThreatPositionIds(piece: PieceStateModel): number[];
  GetPotentialMovePositionIds(piece: PieceStateModel): number[];
  GetWatchList(piece: PieceStateModel): void;
  GetPositionsInDirectionUntilEmpty(piece: PieceStateModel, coordinates: ICoordinates, count: number): number[];
  GetBoard(piece: PieceStateModel): BoardStateModel;
  GetPositionByCoordinates(coordinates: ICoordinates, board: BoardStateModel): PositionStateModel;
}
