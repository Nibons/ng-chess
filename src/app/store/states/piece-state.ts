import { PieceStateModel } from '@chess/ipiece.model';
import { State } from '@ngxs/store';
import { Guid } from '@chess/guid';

@State<PieceStateModel>({
  name: 'pieces',
  defaults: {
    playerId: null,
    playerNumber: null,
    coordinates: { dimensions: [0, 0] },
    IsAlive: true,
    HasMoved: false,
    pieceType: null,
    IsPrimary: false,
    positionId: null,
    threatList: [],
    gameId: null,
    Id: Guid.newGuid(),
    potentialMoves: [],
    value: 0
  }
})
export class PieceState {
}
