import { Guid } from '@chess/guid';
import { GameStateModel } from '@chess/igame.model';
import { State } from '@ngxs/store';
@State<GameStateModel>({
  name: 'games',
  defaults: {
    Id: Guid.newGuid(),
    playerList: null,
    board: null,
    pieces: null
  }
})
export class GameState { }
