import { CreatePiece } from '@chess/CreatePiece';
import { PieceStateModel } from '@chess/ipiece.model';
import { BoardStateModel } from '@chess/iboard.model';
import { GameStateModelList } from '@chess/GameState.model';
import { IncrementIdCounter } from '@chess/IncrementIdCounter';
import { Guid } from '@chess/guid';
import { OptionsStateModel, OptionsStateModelList } from '@chess/options.model';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { NewGame } from '@chess/NewGame';
import { CreateBoard } from '@chess/CreateBoard';
import { SetGame } from '@chess/SetGame';

@State<GameStateModelList>({
  name: 'games'
})
export class GameState {
  constructor(private store: Store) { }
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
  @Selector()
  static getGameList(state) {
    return state.games;
  }
  @Action(NewGame) newGame() { }

  @Action(SetGame)
  setGame({ getState, patchState }: StateContext<GameStateModelList>, { game }: SetGame) {
    patchState({
      gameList: [
        ...getState().gameList.filter(g => g.Id !== game.Id),
        game
      ]
    });
  }
}
