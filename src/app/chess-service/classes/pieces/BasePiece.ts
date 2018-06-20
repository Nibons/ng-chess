import { CreatePiece } from '@chess/CreatePiece';
import { ICoordinates } from '@chess/icoordinates.model';
import { RemovePieceFromAllWatchLists } from '@chess/RemovePieceFromAllWatchLists';
import { BoardState } from '@chess/board-state';
import { PositionState } from '@chess/position-state';
import { IPieceActor } from '@chess/IPieceActor.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PieceState } from '@chess/piece-state';
import { PositionStateModel } from '@chess/iposition.model';
import { BoardStateModel } from '@chess/iboard.model';
import { SetPiece } from '@chess/SetPiece';
import { AddToPositionWatchList } from '@chess/AddToPositionWatchList';
import { Coordinates } from '@chess/coordinates';
import { Guid } from '@chess/guid';
export abstract class BasePiece implements IPieceActor {

  abstract pieceType: EPieceType;
  abstract value: number;
  abstract GetThreatPositionIds(piece: PieceStateModel): Guid[];
  GetPotentialMovePositionIds(piece: PieceStateModel): Guid[] {
    return this.GetThreatPositionIds(piece);
  }
  GetWatchList(piece: PieceStateModel): Guid[] {
    return [...piece.threatList, ...piece.potentialMoves];
  }

  protected pieces$: Observable<PieceStateModel[]>;
  protected positions$: Observable<PositionStateModel[]> = this.store.select(PositionState.PositionList);
  protected boards$: Observable<BoardStateModel[]> = this.store.select(BoardState.BoardList);
  protected WatchPieces$;

  constructor(protected store: Store, private actions$: Actions) {
    this.actions$.pipe(
      ofActionSuccessful(CreatePiece)
    ).subscribe(
      () => this.WatchAllPieces()
    );
  }


  public WatchAllPieces(): void {
    this.pieces$ = this.store.select(PieceState.PieceList);
    this.WatchPieces$ = this.pieces$.subscribe(
      (pieceList: PieceStateModel[]) => pieceList.forEach(
        (piece: PieceStateModel) => {
          this.store.dispatch(new RemovePieceFromAllWatchLists(piece.Id));
          piece.threatList = this.GetThreatPositionIds(piece);
          piece.potentialMoves = this.GetPotentialMovePositionIds(piece);
          this.GetWatchList(piece).forEach(
            (positionId: Guid) => {
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

  GetBoard(piece: PieceStateModel): BoardStateModel {
    const position = this.GetPosition(piece);
    const boardList = this.store.selectSnapshot(BoardState.BoardList);
    return boardList.find(
      (b: BoardStateModel) => b.positions.includes(position.Id)
    );
  }
  GetPositionByCoordinates(coordinates: ICoordinates, board: BoardStateModel): PositionStateModel {
    const boardPositionList = this.store.selectSnapshot(PositionState.PositionList).filter(
      (p: PositionStateModel) => p.boardId === board.Id
    );
    return boardPositionList.find(p => Coordinates.IsSameCoordinates(p.coordinates, coordinates));
  }

  public GetPositionsInDirectionUntilEmpty(
    piece: PieceStateModel,
    direction: ICoordinates,
    count = Number.MAX_SAFE_INTEGER): Guid[] {
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
