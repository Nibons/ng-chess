import { ChessService } from '@chess/chess-service';
import { GameStateModel } from '@chess//GameState.model';
import { GameStateModelList } from '@chess/GameState.model';
import { Guid } from '@chess/guid';
import { OptionsStateModel } from '@chess/options.model';
import { State, Action, StateContext, Selector, Store, Actions } from '@ngxs/store';
import { NewGame } from '@chess/NewGame';
import { SetGame } from '@chess/SetGame';
import { PieceState } from '@chess/piece-state';

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
    if (game.pieces === null) {
      game.pieces = this.store.selectSnapshot(PieceState.PieceList).filter(p => p.gameId === game.Id);
    }
    if (getState().gameList) {
      patchState({
        gameList: [
          ...getState().gameList.filter((g: GameStateModel) => g.Id !== game.Id),
          game
        ]
      });
    } else {
      patchState({
        gameList: [game]
      });
    }
  }
}
