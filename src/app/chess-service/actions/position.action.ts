import { GameState } from '@chess/game-state';
import { PositionStateModel } from '@chess/iposition.model';
import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';
import { Store } from '@ngxs/store';

export class CreatePosition {
  static readonly type = '[Position] CreatePosition';
  public payload: PositionStateModel;
  constructor({ gameId, boardId, coordinates, Id }: PositionStateModel, store: Store) {
    this.payload = {
      boardId: boardId,
      coordinates: coordinates,
      gameId: gameId,
      Id: Id,
      pieceId: null
    };
  }
}

export class PlacePiece {
  static readonly type = '[Position] SetPieceAtPosition';
  constructor(public pieceId: number, public coordinates: ICoordinates, public boardId: number) { }
}
