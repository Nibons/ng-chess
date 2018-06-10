import { Store } from '@ngxs/store';
import { Guid } from '@chess/guid';

export abstract class GameItem {
  Id: number;
  constructor(public gameId: Guid, public store: Store) {
    this.Id = store.selectSnapshot<number>(state => state.GameState.IdCounter);
  }
}
