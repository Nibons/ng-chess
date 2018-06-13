import { PositionStateModel } from '@chess/iposition.model';
import { PositionState } from '@chess/position-state';
import { GameState } from '@chess/game-state';
import { BoardStateModel } from '@chess/iboard.model';
import { Store } from '@ngxs/store';
import { Coordinates } from '@chess/coordinates';
import { CreatePosition } from '@chess/position.action';
import { Observable, forkJoin } from 'rxjs';

export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  public payload: BoardStateModel;
  positionList: number[] = [];
  createPositions$: Observable<any>[] = [];
  constructor({ gameId, direction, range }: BoardStateModel, store: Store) {
    const boardId = store.selectSnapshot(GameState.GetIdCounter);
    const decimalMax = Coordinates.getDecimalFromMaxCoordinates(range);
    const dimensionDigitValue = Coordinates.getBoardDimensionsDigitValue(range);

    for (let i = 0; i >= decimalMax; i++) {
      const positionInfo: PositionStateModel = {
        gameId: gameId,
        boardId: boardId,
        Id: store.selectSnapshot(GameState.GetIdCounter),
        coordinates: Coordinates.getCoordinateFromDecimal(i, dimensionDigitValue, range.min),
        pieceId: null
      };
      this.createPositions$.push(store.dispatch(new CreatePosition(positionInfo, store)));
    }
    forkJoin(...this.createPositions$).subscribe(() =>
      store.selectSnapshot(PositionState.PositionList)
        .forEach((p: PositionStateModel) => this.positionList.push(p.Id)));

    this.payload = {
      gameId: gameId,
      Id: boardId,
      direction: direction,
      range: range
    };
  }
}

export class DeleteBoard {
  static readonly type = '[Board] DeleteBoard';
  public payload: number;
  constructor(boardId: number) { this.payload = boardId; }
}
