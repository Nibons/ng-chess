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

@State<GameStateModelList>({
  name: 'games'
})
export class GameState {
  constructor(private store: Store) { }

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
  @Selector()
  static getGameList(state) {
    return state.games;
  }

  @Action(IncrementIdCounter) incrementIdCounter(context: StateContext<OptionsStateModel>) {
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
    // create the board(s)
    gameInfo.template.configStateTemplates.boards.boards.forEach(
      (board: BoardStateModel) => {
        board.Id = this.store.selectSnapshot(GameState.GetIdCounter);
        board.gameId = gameInfo.Id;
        this.store.dispatch(new CreateBoard(board, this.store));
      }
    );
    // add the piece(s) to the board(s)
    gameInfo.template.configStateTemplates.pieces.pieces.forEach(
      (piece: PieceStateModel) => {
        piece.gameId = gameInfo.Id;
        piece.Id = this.store.selectSnapshot(GameState.GetIdCounter);
        this.store.dispatch(new CreatePiece(piece, gameInfo.Id, this.store));
      }
    );
  }
}
