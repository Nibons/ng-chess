import { AllPiecesOnBoardCreated } from './../actions/AllPiecesOnBoardCreated';
import { AddPositionToBoard } from '@chess/AddPositionToBoard';
import { CreateAllPositions } from '@chess/CreateAllPositions';
import { CreateBoard } from '@chess/CreateBoard';
import { RemovePieceFromAllWatchLists } from './../actions/RemovePieceFromAllWatchLists';
import { Coordinates } from '@chess/coordinates';
import { ICoordinates } from '@chess/icoordinates.model';
import { Guid } from '@chess/guid';
import { PositionStateModelList, PositionStateModel } from '@chess/iposition.model';
import { State, Selector, StateContext, Action, ofActionSuccessful, Store, Actions } from '@ngxs/store';
import { CreatePosition } from '@chess/CreatePosition';
import { SetPieceAtPosition } from '@chess/SetPieceAtPosition';
import { AddToPositionWatchList } from '@chess/AddToPositionWatchList';
import { Observable, of, forkJoin, from } from 'rxjs';
import { SetPiece } from '@chess/SetPiece';
import { mergeMap, switchMap, map, last, filter, tap } from 'rxjs/operators';
import { PieceStateModelList } from '@chess/ipiece.model';
import { AllPositionsOnBoardCreated } from '@chess/AllPositionsOnBoardCreated';

@State<PositionStateModelList>({
  name: 'positions',
  defaults: { positions: [] }
})
export class PositionState {
  allPositionsCreated$: Observable<any>;
  constructor(private actions$: Actions, store: Store) {
    // create all positions when we create the board
    this.actions$.pipe(
      ofActionSuccessful(CreateBoard),
      map(
        ({ payload, gameIdAndTemplate }: CreateBoard) => {
          if (payload !== undefined && gameIdAndTemplate !== undefined) {
            store.dispatch(new CreateAllPositions(payload.range, payload.Id, payload.gameId, gameIdAndTemplate, store));
          } else {
            of(null);
          }
        }
      )
    ).subscribe();

    // when a piece is set, make sure to put it where its @
    this.actions$.pipe(
      ofActionSuccessful(SetPiece),
      map(
        ({ piece, boardId }: SetPiece) => {
          if (piece !== undefined && boardId !== undefined) {
            store.dispatch(new SetPieceAtPosition(piece, boardId));
          } else {
            of(null);
          }
        }
      )
    ).subscribe();
  }

  @Selector() static PositionList(state: PositionStateModelList) {
    return state.positions;
  }
  @Selector() static GetPositionAt(state: PositionStateModelList) {
    return (coordinates: ICoordinates, boardId: Guid) => {
      return state.positions.filter(
        p =>
          p.boardId === boardId &&
          Coordinates.IsSameCoordinates(p.coordinates, coordinates));
    };
  }
  @Selector() static GetPositionIdAt(state: PositionStateModelList) {
    return (coordinates: ICoordinates, boardId: Guid) => {
      return state.positions.find(
        p =>
          p.boardId === boardId &&
          Coordinates.IsSameCoordinates(p.coordinates, coordinates)
      ).Id;
    };
  }
  @Selector() static GetPositionByPieceId(state: PositionStateModelList) {
    return (pieceId: Guid) => {
      return state.positions.find((position: PositionStateModel) => position.pieceId === pieceId);
    };
  }
  @Selector() static GetPositionById(state) {
    return (Id: Guid) => {
      return state.filter((p: PositionStateModel) => p.Id === Id);
    };
  }

  @Action(CreatePosition)
  createPosition({ getState, patchState }: StateContext<PositionStateModelList>, { payload }: CreatePosition) {
    patchState({
      positions: [
        ...getState().positions,
        payload
      ]
    });
  }

  @Action(SetPieceAtPosition)
  setPieceAtPosition({ getState, patchState }: StateContext<PositionStateModelList>, { piece, boardId }: SetPieceAtPosition) {
    const position = getState().positions.find(
      (p: PositionStateModel) =>
        p.boardId.IsEqual(boardId) && Coordinates.IsSameCoordinates(p.coordinates, piece.coordinates)
    );
    position.piece = piece;
    position.pieceId = piece.Id;
    patchState({
      positions: [
        ...getState().positions.filter(
          p => !p.Id.IsEqual(position.Id)
        ),
        position
      ]
    });
  }

  @Action(AddToPositionWatchList)
  addToPositionWatchList({ getState, patchState }: StateContext<PositionStateModelList>,
    { positionId, pieceId }: AddToPositionWatchList) {
    const position = getState().positions.find(p => p.Id === positionId);
    if (position.watchList.includes(pieceId)) {
      position.watchList.push(pieceId);
      patchState({
        positions: [
          ...getState().positions.filter(p => !p.Id.IsEqual(positionId)),
          position
        ]
      });
    }
  }

  @Action(RemovePieceFromAllWatchLists)
  removePieceFromAllWatchLists({ getState, patchState }: StateContext<PositionStateModelList>,
    { pieceId }: RemovePieceFromAllWatchLists) {
    const positionsWithPiece: PositionStateModel[] = [];
    getState().positions
      .filter(position => position.watchList.includes(pieceId))
      .forEach(position => position.watchList = position.watchList.filter(positionsPieceId => positionsPieceId !== pieceId));
    if (positionsWithPiece.length >= 1) {
      patchState({
        positions: [
          ...getState().positions.filter(position => positionsWithPiece.includes(position) === false),
          ...positionsWithPiece
        ]
      });
    }
  }
  @Action(CreateAllPositions)
  createAllPositions({ getState, dispatch }: StateContext<PositionStateModelList>, { payload, boardId, gameInfo }: CreateAllPositions) {
    const payload$ = from(payload);
    payload$.pipe(
      tap(
        (p: PositionStateModel) => dispatch(new CreatePosition(p, gameInfo))
      ),
      map(
        (p: PositionStateModel) => dispatch(new AddPositionToBoard(p, boardId, gameInfo))
      )
    ).subscribe(
      () => { },
      (err) => { },
      () =>
        dispatch(new AllPositionsOnBoardCreated(gameInfo, boardId, getState().positions.filter(p => p.boardId.IsEqual(boardId))))
    ).unsubscribe();
  }
}
