import { Guid } from '@chess/guid';
import { PlayerStateModelList } from '@chess/iplayer.model';
import { State, Selector } from '@ngxs/store';
import { EPlayerType } from '@chess/eplayer-type.enum';
const gameId = Guid.newGuid();
@State<PlayerStateModelList>({
  name: 'players',
  defaults: {
    players: [
      {
        gameId: gameId,
        Id: Guid.newGuid(), playerNumber: 0, playerType: EPlayerType.human, playerColor: 'white',
        pieceOrientation: { dimensions: [0, 1] }, viewOrienation: 0,
        pieces: [], SumPieceValue: 0, moves: [], graveYard: []
      },
      {
        gameId: gameId,
        Id: Guid.newGuid(), playerNumber: 1, playerType: EPlayerType.human, playerColor: 'black',
        pieceOrientation: { dimensions: [0, -1] }, viewOrienation: 0,
        pieces: [], SumPieceValue: 0, moves: [], graveYard: []
      }
    ]
  }
})
export class PlayerState {
  @Selector() static PlayerList(store: PlayerStateModelList) {
    return store.players;
  }
}
