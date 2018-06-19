import { RemovePieceFromAllWatchLists } from './../actions/RemovePieceFromAllWatchLists';
import { Coordinates } from '@chess/coordinates';
import { ICoordinates } from '@chess/icoordinates.model';
import { Guid } from '@chess/guid';
import { PositionStateModelList, PositionStateModel } from '@chess/iposition.model';
import { State, Selector, StateContext, Action, ofActionSuccessful, Store, Actions } from '@ngxs/store';
import { CreatePosition } from '@chess/CreatePosition';
import { PlacePiece } from '@chess/PlacePiece';
import { AddPositionToBoard } from '@chess/AddPositionToBoard';
import { AddToPositionWatchList } from '@chess/AddToPositionWatchList';
import { GameState } from '@chess/game-state';

@State<PositionStateModelList>({
  name: 'positions',
  defaults: { positions: [] }
})
export class PositionState {
  constructor(private actions$: Actions, private store: Store) {
    // on game creation, create the board
    // this.actions$.pipe(
    //   ofActionSuccessful(CreatePosition)
    // ).subscribe((position: PositionStateModel) => {
    //   store.dispatch(new AddPositionToBoard(position.Id, position.boardId));
    // });
  }

  @Selector() static PositionList(state: PositionStateModelList) {
    return state.positions;
  }
  @Selector() static GetPositionAt(state: PositionStateModelList) {
    return (coordinates: ICoordinates, boardId: number) => {
      return state.positions.filter(
        p =>
          p.boardId === boardId &&
          Coordinates.IsSameCoordinates(p.coordinates, coordinates));
    };
  }
  @Selector() static GetPositionIdAt(state: PositionStateModelList) {
    return (coordinates: ICoordinates, boardId: number) => {
      return state.positions.find(
        p =>
          p.boardId === boardId &&
          Coordinates.IsSameCoordinates(p.coordinates, coordinates)
      ).Id;
    };
  }
  @Selector() static GetPositionByPieceId(state: PositionStateModelList) {
    return (pieceId: number) => {
      return state.positions.find((position: PositionStateModel) => position.pieceId === pieceId);
    };
  }
  @Selector() static GetPositionById(state) {
    return (Id: number) => {
      return state.filter((p: PositionStateModel) => p.Id === Id);
    };
  }
  @Selector() static GetPositionsByGame(state) {
    return (gameId: Guid) => {
      return state.filter((p: PositionStateModel) => p.gameId === gameId);
    };
  }

  @Action(CreatePosition)
  createPosition({ getState, patchState }: StateContext<PositionStateModelList>, { payload }: CreatePosition) {
    payload.Id = this.store.selectSnapshot(GameState.GetIdCounter);
    patchState({
      positions: [
        ...getState().positions,
        payload
      ]
    });
    this.store.dispatch(new AddPositionToBoard(payload.Id, payload.boardId));
  }

  @Action(PlacePiece)
  setPieceAt({ getState, patchState }: StateContext<PositionStateModelList>, { boardId, coordinates, pieceId }: PlacePiece) {
    const target_position = getState().positions
      .find(p =>
        p.boardId === boardId &&
        Coordinates.IsSameCoordinates(p.coordinates, coordinates)
      );
    target_position.pieceId = pieceId;
    patchState({
      positions: [
        ...getState().positions.filter(p => p.Id !== target_position.Id),
        target_position
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
          ...getState().positions.filter(p => p.Id !== positionId),
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
}

