import { PositionStateModel } from './../../chess-service/interfaces/iposition.model';
import { Coordinates } from '@chess/coordinates';
import { ICoordinates } from '@chess/icoordinates.model';
import { Guid } from '@chess/guid';
import { PositionStateModelList } from '@chess/iposition.model';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { PlacePiece, CreatePosition } from '@chess/position.action';

@State<PositionStateModelList>({
  name: 'positions',
  defaults: { positions: [] }
})
export class PositionState {
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
    patchState({
      positions: [
        ...getState().positions,
        payload
      ]
    });
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
}

