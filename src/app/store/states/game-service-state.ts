import { State } from '@ngxs/store';
import { GameServiceDataModel } from '@chess/igame.model';
import { GameState } from '@chess/game-state';
@State<GameServiceDataModel>({
  name: 'gameService',
  children: [GameState]
})
export class GameServiceState {

}
