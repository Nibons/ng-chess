import { Guid } from '@chess/guid';
import { PlayerStateModel } from '@chess/iplayer.model';
import { State } from '@ngxs/store';
import { EPlayerType } from '@chess/eplayer-type.enum';
@State<PlayerStateModel>({
  name: 'players',
  defaults: {
    Id: Guid.newGuid(),
    playerType: EPlayerType.human,
    playerNumber: 0,
    playerColor: 'white',
    pieceOrientation: { dimensions: [0, 1] },
    viewOrienation: 0,
    gameId: null,
    graveYard: [],
    moves: [],
    pieces: [],
    SumPieceValue: 0
  }
})
export class PlayerState {
}
