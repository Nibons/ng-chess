import { GameStateModelList } from '@chess/GameState.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { PlayerStateModel } from '@chess/iplayer.model';
import { PlayerState } from '@chess/player-state';
import { PositionState } from '@chess/position-state';
import { BoardState } from '@chess/board-state';
import { Guid } from '@chess/guid';
import { OptionsStateModel, OptionsStateModelList } from '@chess/options.model';
import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { PieceState } from '@chess/piece-state';
import { BoardStateModel } from '@chess/iboard.model';
import { PositionStateModel } from '@chess/iposition.model';

@State<OptionsStateModelList>({
  name: 'optionSets'
})
export class OptionsState {
  @Selector() static GameList(state: GameStateModelList) {
    return state.gameList;
  }
  @Selector() static GetGameById(state: GameStateModelList) {
    return (Id: Guid) => {
      return state.gameList.find(g => g.Id === Id);
    };
  }
  @Selector([BoardState, PositionState, PieceState, PlayerState])
  static getGameItems(gameId: Guid,
    boards: BoardStateModel[],
    positions: PositionStateModel[],
    pieces: PieceStateModel[],
    players: PlayerStateModel[]) {
    return [
      ...boards.filter(x => x.gameId === gameId),
      ...positions.filter(x => x.gameId === gameId),
      ...pieces.filter(x => x.gameId === gameId),
      ...players.filter(x => x.gameId === gameId)
    ];
  }
  @Selector() static getColors(state: OptionsStateModel) {
    return state.colorList;
  }
  getGameList(state) {
    return state.games;
  }
}
