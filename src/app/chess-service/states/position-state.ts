import { PositionStateModel } from './../interfaces/iposition.model';
import { AddPositionToBoard } from '@chess/AddPositionToBoard';
import { CreateAllPositions } from '@chess/CreateAllPositions';
import { CreateBoard } from '@chess/CreateBoard';
import { RemovePieceFromAllWatchLists } from './../actions/RemovePieceFromAllWatchLists';
import { Coordinates } from '@chess/coordinates';
import { State, Selector, StateContext, Action, ofActionSuccessful, Store, Actions } from '@ngxs/store';
import { CreatePosition } from '@chess/CreatePosition';
import { SetPieceAtPosition } from '@chess/SetPieceAtPosition';
import { AddToPositionWatchList } from '@chess/AddToPositionWatchList';
import { Observable, of } from 'rxjs';
import { SetPiece } from '@chess/SetPiece';
import { PieceState } from '@chess/piece-state';
import { map } from 'rxjs/operators';

@State<PositionStateModel>({
  name: 'positions',
  children: [PieceState]
})
export class PositionState {
  allPositionsCreated$: Observable<any>;
  constructor(private actions$: Actions, store: Store) {
    // create all positions when we create the board
    this.actions$.pipe(
      ofActionSuccessful(CreateBoard),
      map(
        ({ payload, gameInfo }: CreateBoard) => {
          if (payload !== undefined && gameInfo !== undefined) {
            store.dispatch(new CreateAllPositions(payload.range, payload.Id, payload.gameId, gameInfo, store));
          } else {
            of(null);
          }
        }
      )
    ).subscribe();

    // process through and create all the positions
    this.actions$.pipe(
      ofActionSuccessful(CreateAllPositions),
      map(
        ({ payload, gameInfo }: CreateAllPositions) => {
          if (payload !== undefined && gameInfo !== undefined) {
            payload.forEach(position =>
              store.dispatch(new CreatePosition(position, gameInfo))
            );
          } else {
            of(null);
          }
        }
      )
    ).subscribe();

    this.actions$.pipe(
      ofActionSuccessful(CreatePosition),
      map(({ payload, gameInfo }: CreatePosition) => {
        if (payload !== undefined && gameInfo !== undefined) {
          store.dispatch(new AddPositionToBoard(payload.Id, payload.boardId, gameInfo));
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

  @Selector() static PositionList(state: PositionStateModel[]) {
    return state;
  }

  @Action(CreatePosition)
  createPosition({ getState, patchState }: StateContext<PositionStateModel[]>, { payload }: CreatePosition) {
    patchState([
      ...getState(),
      payload
    ]);
  }

  @Action(SetPieceAtPosition)
  setPieceAtPosition({ getState, patchState }: StateContext<PositionStateModel[]>, { piece, boardId }: SetPieceAtPosition) {
    const position = getState().find(
      (p: PositionStateModel) =>
        p.boardId.IsEqual(boardId) && Coordinates.IsSameCoordinates(p.coordinates, piece.coordinates)
    );
    position.piece = piece;
    patchState([
      ...getState().filter(
        p => !p.Id.IsEqual(position.Id)
      ),
      position
    ]);
  }

  @Action(AddToPositionWatchList)
  addToPositionWatchList({ getState, patchState }: StateContext<PositionStateModel[]>,
    { positionId, pieceId }: AddToPositionWatchList) {
    const position = getState().find(p => p.Id === positionId);
    if (position.watchList.includes(pieceId)) {
      position.watchList.push(pieceId);
      patchState([
        ...getState().filter(p => !p.Id.IsEqual(positionId)),
        position
      ]);
    }
  }

  @Action(RemovePieceFromAllWatchLists)
  removePieceFromAllWatchLists({ getState, patchState }: StateContext<PositionStateModel[]>,
    { pieceId }: RemovePieceFromAllWatchLists) {
    const positionsWithPiece: PositionStateModel[] = [];
    getState()
      .filter(position => position.watchList.includes(pieceId))
      .forEach(position => position.watchList = position.watchList.filter(positionsPieceId => positionsPieceId !== pieceId));
    if (positionsWithPiece.length >= 1) {
      patchState([
        ...getState().filter(position => positionsWithPiece.includes(position) === false),
        ...positionsWithPiece
      ]);
    }
  }
}

