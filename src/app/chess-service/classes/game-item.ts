import { Select, Store } from '@ngxs/store';
import { Guid } from '@chess/guid';
import { GameState } from '@chess/game-state';
import { GameStateModel, IGame } from '@chess/igame.model';

export abstract class GameItem {
  Id: number;
  get game(): IGame {
    return await this.game$;
  }
  @Select(GameState) game$: GameStateModel;
  constructor(public gameId: Guid, public _store?: Store) {
    this.Id = _store.selectSnapshot<number>(state => state.GameState.IdCounter);
  }
  GetBoardById(boardId: number) {

  }
}
