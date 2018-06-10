import { RetrieveGameList } from './../actions/game-select.action';
import { HttpClientModule } from '@angular/common/http';
import { GameStateModelList } from './../../chess-service/interfaces/igame.model';
import { PlayerStateModelList } from '@chess/iplayer.model';
import { BoardStateModel, BoardStateModelList } from '@chess/iboard.model';
import { PieceStateModelList } from '@chess/ipiece.model';
import { GameModel, GameModelList } from '@chess/igame-select.model';
import { State, Selector, Action } from '@ngxs/store';
import { NewGame } from '@chess/game-select.action';
import { StateContext } from '@ngxs/store';

@State<GameModelList>({
  name: 'gameSelect'
})
export class GameState {
  constructor() { }
  @Action(NewGame)
  newGame(context: StateContext<GameStateModelList>, action: NewGame) {
    const state = context.getState();
    context.patchState({
      games: [
        ...state.games,
        action.payload
      ]
    });
  }
  @Action(RetrieveGameList)
  retrieveGameList({ setState, getState }: StateContext<GameStateModelList>, action: RetrieveGameList) {
    setState(action.payload);
  }
}
