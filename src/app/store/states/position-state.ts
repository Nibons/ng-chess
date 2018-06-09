import { PositionStateModel } from './../../chess-service/interfaces/iposition.model';
import { Coordinates } from '@chess/coordinates';
import { ICoordinates } from '@chess/icoordinates.model';
import { Guid } from '@chess/guid';
import { PositionStateModelList } from '@chess/iposition.model';
import { State, Selector } from '@ngxs/store';
@State<PositionStateModelList>({
  name: 'positions',
  defaults: { positions: [] }
})
export class PositionState {
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
}

