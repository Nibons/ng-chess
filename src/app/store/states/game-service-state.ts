import { GameStateModelList } from '@chess/igame.model';
import { State } from '@ngxs/store';
import { GameState } from '@chess/game-state';
@State<GameStateModelList>({
  name: 'gameService',
  children: [GameState]
})
export class GameServiceState {

}
