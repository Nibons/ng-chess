import { GameState } from '@chess/game-state';
import { PositionStateModel } from '@chess/iposition.model';
import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';
import { Store } from '@ngxs/store';

export class CreatePosition {
  static readonly type = '[Position] CreatePosition';
  public payload: PositionStateModel;
  constructor({ gameId, boardId, coordinates }: PositionStateModel, store: Store) {
    this.payload = {
      boardId: boardId,
      coordinates: coordinates,
      gameId: gameId,
      Id: store.selectSnapshot(GameState.GetIdCounter),
      pieceId: null
    };
  }
}

export class SetPieceAt {
  static readonly type = '[Position] SetPieceAt';
  constructor(public pieceId: number, public coordinates: ICoordinates, public boardId: number, public gameId: Guid) { }
}
