import { PlayerState } from '@chess/player-state';
import { PositionState } from '@chess/position-state';
import { BoardState } from '@chess/board-state';
import { BoardStateModel } from '@chess/iboard.model';
import { Guid } from '@chess/guid';
import { GameStateModel } from '@chess/igame.model';
import { State } from '@ngxs/store';
@State<GameStateModel>({
  name: 'games',
  defaults: {
    Id: Guid.newGuid()
  },
  children: [BoardState, PositionState, PositionState, PlayerState]
})
export class GameState { }
