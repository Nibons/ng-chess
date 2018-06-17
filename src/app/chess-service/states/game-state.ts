import { GameStateModelList, GameStateModel } from '@chess/GameState.model';
import { IncrementIdCounter } from '@chess/IncrementIdCounter';
import { Guid } from '@chess/guid';
import { OptionsStateModel, OptionsStateModelList } from '@chess/options.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { NewGame } from '@chess/NewGame';

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

  @Action(NewGame) newGame({ getState, patchState }: StateContext<GameStateModelList>, { gameInfo }: NewGame) {
    patchState({
      gameList: [
        ...getState().gameList, gameInfo
      ]
    });
  }
}
