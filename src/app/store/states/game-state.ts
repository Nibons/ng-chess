import { PieceStateModel } from '@chess/ipiece.model';
import { PlayerStateModel } from './../../chess-service/interfaces/iplayer.model';
import { IncrementIdCounter, NewGame } from '@chess/game.action';
import { PlayerState } from '@chess/player-state';
import { PositionState } from '@chess/position-state';
import { BoardState } from '@chess/board-state';
import { Guid } from '@chess/guid';
import { GameStateModel } from '@chess/igame.model';
import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { PieceState } from '@chess/piece-state';
import { BoardStateModel } from '@chess/iboard.model';
import { PositionStateModel } from '@chess/iposition.model';
@State<GameStateModel[]>({
  name: 'games',
  defaults: [{ Id: Guid.newGuid(), IdCounter: 0, colorList: ['white', 'black'] }],
  children: [BoardState, PieceState, PositionState, PlayerState]
})
export class GameState {
  @Selector() static GetIdCounter(context: StateContext<GameStateModel>) {
    const id = context.getState().IdCounter;
    context.dispatch(IncrementIdCounter);
    return id;
  }
  @Selector([BoardState, PositionState, PieceState, PlayerState])
  static getGameItems(gameId: Guid,
    boards: BoardStateModel[],
    positions: PositionStateModel[],
    pieces: PieceStateModel[],
    players: PlayerStateModel[]) {
    return [
      ...boards.filter(x => x.gameId === gameId),
      ...positions.filter(x => x.gameId === gameId),
      ...pieces.filter(x => x.gameId === gameId),
      ...players.filter(x => x.gameId === gameId)
    ];
  }
  @Selector() static getColors(state: GameStateModel) {
    return state.colorList;
  }
  @Action(IncrementIdCounter) incrementIdCounter(context: StateContext<GameStateModel>, action: IncrementIdCounter) {
    const current_state = context.getState();
    context.patchState({
      ...current_state,
      IdCounter: current_state.IdCounter++
    });
  }
  @Action(NewGame) newGame(context: StateContext<GameStateModel>, action: NewGame) {
    const game = action.payload;
    const state = context.getState();
    context.patchState({ ...state, Id: game.Id, IdCounter: 0 });
  }
}
