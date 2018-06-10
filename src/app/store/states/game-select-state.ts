import { GameStateModelList } from './../../chess-service/interfaces/igame.model';
import { PlayerStateModelList } from '@chess/iplayer.model';
import { BoardStateModel, BoardStateModelList } from '@chess/iboard.model';
import { PieceStateModelList } from '@chess/ipiece.model';
import { GameModel, GameModelList } from '@chess/igame-select.model';
import { State, Selector, Action } from '@ngxs/store';
import { NewGame } from '@chess/game-select.action';
import { StateContext } from '@ngxs/store';


const standardChess: GameModel = {
  name: 'standardChess',
  players: require('@gameTemplates/standardChess.players.json'),
  options: require('@gameTemplates/standardChess.options.json'),
  boards: require('@gameTemplates/standardChess.board.json'),
  pieces: require('@gameTemplates/standardChess.pieces.json')
};


@State<GameModelList>({
  name: 'gameSelect',
  defaults: {
    gameList: [
      standardChess
    ]
  }
})
export class GameState {
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
}
