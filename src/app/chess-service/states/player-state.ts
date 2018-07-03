import { Guid } from '@chess/guid';
import { PlayerStateModel } from '@chess/iplayer.model';
import { State, Selector } from '@ngxs/store';
import { EPlayerType } from '@chess/eplayer-type.enum';
const gameId = Guid.newGuid();
@State<PlayerStateModel[]>({
  name: 'players',
  defaults: [
    {
      Id: Guid.newGuid(), playerNumber: 0, playerType: EPlayerType.human, playerColor: 'white',
      pieceOrientation: { dimensions: [0, 1] }, viewOrienation: 0,
      SumPieceValue: 0, moves: []
    },
    {
      Id: Guid.newGuid(), playerNumber: 1, playerType: EPlayerType.human, playerColor: 'black',
      pieceOrientation: { dimensions: [0, -1] }, viewOrienation: 0,
      SumPieceValue: 0, moves: []
    }
  ]
})
export class PlayerState {
  @Selector() static PlayerList(store: PlayerStateModel[]) {
    return store;
  }
}
