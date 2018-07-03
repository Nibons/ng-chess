import { OptionsState } from '@chess/options-state';
import { BoardState } from './board-state';
import { ChessService } from '@chess/chess-service';
import { GameStateModel } from '@chess//GameState.model';
import { Guid } from '@chess/guid';
import { OptionsStateModel } from '@chess/options.model';
import { State, Action, StateContext, Selector, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { NewGame } from '@chess/NewGame';
import { SetGame } from '@chess/SetGame';
import { CreateAllBoards } from '@chess/CreateAllBoards';

@State<GameStateModel[]>({
  name: 'games',
  defaults: [],
  children: [
    BoardState,
    OptionsState
  ]
})
export class GameState {
  constructor(
    private store: Store,
    private actions$: Actions,
    private chessService: ChessService = new ChessService(store, actions$)
  ) {
    this.actions$.pipe(
      ofActionSuccessful(NewGame)
    ).subscribe(
      ({ gameInfo }: NewGame) => {
        this.store.dispatch(new CreateAllBoards(gameInfo));
      }
    );
  }
  @Selector() static GameList(state: GameStateModel[]) {
    return state;
  }

  @Selector() static getColors(state: GameStateModel[]) {
    return gameId => {
      return state.find(g => g.Id.IsEqual(gameId)).options.colorList;
    };
  }

  @Selector() static getGameList(state) {
    return state.games;
  }
  @Action(NewGame) newGame() { }

  @Action(SetGame)
  setGame({ getState, patchState }: StateContext<GameStateModel[]>, { game }: SetGame) {
    if (getState()) {
      patchState([
        ...getState().filter((g: GameStateModel) => g.Id !== game.Id),
        game
      ]);
    } else {
      patchState([game]);
    }
  }
}
