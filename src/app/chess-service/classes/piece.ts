import { PositionStateModel } from '@chess/IPosition.model';
import { PositionState } from './../states/position-state';
import { IGame } from './../interfaces/options.model';
import { GameItem } from '@chess/game-item';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';


export class Piece extends GameItem {
  @Select(PositionState.GetPositionByPieceId) positionFilter$: Observable<(Id: number) => PositionStateModel>;
  // positionSubscription$: Subscription;

  public get game(): IGame {
    return this.store.selectSnapshot(state => state.gameList.find(g => g.Id === this.gameId));
  }
}
