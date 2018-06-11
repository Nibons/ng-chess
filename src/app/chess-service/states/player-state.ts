import { Guid } from '@chess/guid';
import { PlayerStateModelList } from '@chess/iplayer.model';
import { State, Selector } from '@ngxs/store';
import { EPlayerType } from '@chess/eplayer-type.enum';
@State<PlayerStateModelList>({
  name: 'players',
  defaults: { players: [] }
})
export class PlayerState {
  @Selector() static PlayerList(store: PlayerStateModelList) {
    return store.players;
  }
}
