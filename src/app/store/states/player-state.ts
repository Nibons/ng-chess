import { Guid } from '@chess/guid';
import { PlayerStateModelList } from '@chess/iplayer.model';
import { State } from '@ngxs/store';
import { EPlayerType } from '@chess/eplayer-type.enum';
@State<PlayerStateModelList>({
  name: 'players',
  defaults: { players: [] }
})
export class PlayerState {
}
