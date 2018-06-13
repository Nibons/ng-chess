import { GameStateModelList } from '@chess/GameState.model';
import { IncrementIdCounter, NewGame } from '@chess/game.action';
import { Guid } from '@chess/guid';
import { OptionsStateModel, OptionsStateModelList } from '@chess/options.model';
import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
@State<GameStateModelList>({
  name: 'games'
})
export class GameState {
  @Selector() static GetIdCounter(context: StateContext<OptionsStateModelList>) {
    const id = context.getState().optionSets[0].IdCounter;
    context.dispatch(IncrementIdCounter);
    return id;
  }
  @Selector() static GameList(state: GameStateModelList) {
    return state.gameList;
  }
  @Selector() static GetGameById(state: GameStateModelList) {
    return (Id: Guid) => {
      return state.gameList.find(g => g.Id === Id);
    };
  }
  @Selector() static getColors(state: OptionsStateModel) {
    return state.colorList;
  }
  getGameList(state) {
    return state.games;
  }
  @Action(IncrementIdCounter) incrementIdCounter(context: StateContext<OptionsStateModel>, action: IncrementIdCounter) {
    const current_state = context.getState();
    context.patchState({
      ...current_state,
      IdCounter: current_state.IdCounter++
    });
  }

  @Action(NewGame) newGame(context: StateContext<OptionsStateModel>, action: NewGame) {
    const game = action.payload;
    const state = context.getState();
    context.patchState({ ...state, Id: game.Id, IdCounter: 0 });
  }
}
