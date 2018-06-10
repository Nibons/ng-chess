import { GameStateModelList } from './../../chess-service/interfaces/igame.model';
import { PlayerStateModelList } from '@chess/iplayer.model';
import { BoardStateModel, BoardStateModelList } from '@chess/iboard.model';
import { PieceStateModelList } from '@chess/ipiece.model';
import { GameModel, GameModelList } from '@chess/igame-select.model';
import { State, Selector, Action } from '@ngxs/store';
import { NewGame } from '@chess/game-select.action';
import { StateContext } from '@ngxs/store';

const standardChess_players = require('@gameTemplates/standardChess.players.json');
const standardChess_boards = require('@gameTemplates/standardChess.board.json');
const standardChess_options = require('@gameTemplates/standardChess.options.json');
const standardChess_pieces = require('@gameTemplates/standardChess.pieces.json');

const standardChess: GameModel = {
  name: 'standardChess',
  players: standardChess_players,
  options: standardChess_options,
  boards: standardChess_boards,
  pieces: standardChess_pieces
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
