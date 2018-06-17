import { BoardStateModel } from './../../interfaces/iboard.model';
import { ICoordinates } from '@chess/icoordinates.model';
import { RemovePieceFromAllWatchLists } from './../../actions/RemovePieceFromAllWatchLists';
import { BoardState } from '@chess/board-state';
import { PositionState } from '@chess/position-state';
import { IPieceActor } from '@chess/IPieceActor.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PieceState } from '@chess/piece-state';
import { PositionStateModel } from '@chess/iposition.model';
import { BoardStateModel } from '@chess/iboard.model';
import { SetPiece } from '@chess/SetPiece';
import { AddToPositionWatchList } from '@chess/AddToPositionWatchList';
import { Coordinates } from '@chess/coordinates';
export abstract class BasePiece implements IPieceActor {

  abstract pieceType: EPieceType;
  abstract value: number;
  abstract GetThreatPositionIds(piece: PieceStateModel): number[];
  GetPotentialMovePositionIds(piece: PieceStateModel): number[] {
    return this.GetThreatPositionIds(piece);
  }
  GetWatchList(piece: PieceStateModel): number[] {
    return [...piece.threatList, ...piece.potentialMoves];
  }

  protected pieces$: Observable<PieceStateModel[]> = this.store.select(PieceState.PieceList);
  protected positions$: Observable<PositionStateModel[]> = this.store.select(PositionState.PositionList);
  protected boards$: Observable<BoardStateModel[]> = this.store.select(BoardState.BoardList);


  constructor(protected store: Store) {
    this.WatchAllPieces();
  }

  private WatchAllPieces(): void {
    this.pieces$.subscribe(
      (pieceList: PieceStateModel[]) => pieceList.forEach(
        (piece: PieceStateModel) => {
          this.store.dispatch(new RemovePieceFromAllWatchLists(piece.Id));
          piece.threatList = this.GetThreatPositionIds(piece);
          piece.potentialMoves = this.GetPotentialMovePositionIds(piece);
          this.GetWatchList(piece).forEach(
            (positionId: number) => {
              this.store.dispatch(new AddToPositionWatchList(piece.Id, positionId));
            }
          );
          this.store.dispatch(new SetPiece(piece));
        }
      )
    );
  }
  protected GetPosition(piece: PieceStateModel): PositionStateModel {
    return this.store.selectSnapshot(PositionState.PositionList).find(
      (p: PositionStateModel) => p.pieceId === piece.Id
    );
  }

  protected GetCoordinates(piece: PieceStateModel): ICoordinates {
    return this.GetPosition(piece).coordinates;
  }

  protected GetBoard(piece: PieceStateModel): BoardStateModel {
    const position = this.GetPosition(piece);
    return this.store.selectSnapshot(BoardState.BoardList).find(
      (b: BoardStateModel) => b.positions.includes(position.Id)
    );
  }
  protected GetPositionByCoordinates(coordinates: ICoordinates, board: BoardStateModel): PositionStateModel {
    const boardPositionList = this.store.selectSnapshot(PositionState.PositionList).filter(
      (p: PositionStateModel) => p.boardId === board.Id
    );
    return boardPositionList.find(p => Coordinates.IsSameCoordinates(p.coordinates, coordinates));
  }

  protected GetPositionsInDirectionUntilEmpty(
    piece: PieceStateModel,
    direction: ICoordinates,
    count = Number.MAX_SAFE_INTEGER): number[] {
    const position_cache = [];
    const board = this.GetBoard(piece);
    const coordinates_in_direction = Coordinates.GetCoordinatesInDirection(
      piece.coordinates,
      direction,
      board.range.min,
      board.range.max,
      count
    );
    let continue_this_direction = true;
    for (let i = 0; continue_this_direction; i++) {
      const pos = this.GetPositionByCoordinates(coordinates_in_direction[i], board);
      position_cache.push(pos.Id);
      continue_this_direction = pos.pieceId !== null;
    }
    return position_cache;
  }
}
