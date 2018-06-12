import { IBoardDimensions, ICoordinates } from '@chess/icoordinates.model';
import { GameState } from './../states/game-state';
import { BoardStateModel, IBoard } from '@chess/iboard.model';
import { Store } from '@ngxs/store';

export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  public payload: BoardStateModel;
  constructor({ gameId, direction, range }: BoardStateModel, store: Store) {

    this.payload = {
      gameId: gameId,
      Id: store.selectSnapshot(GameState.GetIdCounter),
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
