import { AddBoardToGame } from '@chess/AddBoardToGame';
import { IdAndStateTemplate } from './../interfaces/GameState.model';
import { ChessService } from '@chess/chess-service';
import { GameStateModel } from '@chess//GameState.model';
import { GameStateModelList } from '@chess/GameState.model';
import { Guid } from '@chess/guid';
import { OptionsStateModel } from '@chess/options.model';
import { State, Action, StateContext, Selector, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { NewGame } from '@chess/NewGame';
import { SetGame } from '@chess/SetGame';
import { CreateAllBoards } from '@chess/CreateAllBoards';

@State<GameStateModelList>({
  name: 'games'
})
export class GameState {
  constructor(
    private store: Store,
    private actions$: Actions,
    private chessService: ChessService = new ChessService(store, actions$)
  ) { }
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
  @Action(NewGame) newGame({ getState, dispatch }: StateContext<GameStateModelList>, { gameInfo }: NewGame) {
    const IdAndTemplate: IdAndStateTemplate = {
      Id: gameInfo.Id,
      gameTemplate: gameInfo.template.configStateTemplates
    };
    const game: GameStateModel = {
      Id: IdAndTemplate.Id,
      name: gameInfo.name,
      boards: [],
      options: IdAndTemplate.gameTemplate.options,
      pieces: [],
      players: [],
      template: gameInfo.template
    };
    dispatch(new SetGame(game));
    dispatch(new CreateAllBoards(IdAndTemplate));
  }

  @Action(SetGame)
  setGame({ getState, patchState }: StateContext<GameStateModelList>, { game }: SetGame) {
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

  @Action(AddBoardToGame)
  addBoardToGame({ getState, dispatch }: StateContext<GameStateModelList>, { board, IdAndTemplate }: AddBoardToGame) {
    const game = getState().gameList.find(g => g.Id.IsEqual(IdAndTemplate.Id));
    game.boards.push(board);
    dispatch(new SetGame(game));
  }
}
