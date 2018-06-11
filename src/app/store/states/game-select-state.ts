import { RetrieveTemplateList } from './../actions/game-select.action';
import { HttpClientModule } from '@angular/common/http';
import { PlayerStateModelList } from '@chess/iplayer.model';
import { BoardStateModel, BoardStateModelList } from '@chess/iboard.model';
import { PieceStateModelList } from '@chess/ipiece.model';
import { State, Selector, Action } from '@ngxs/store';
import { NewGame } from '@chess/game-select.action';
import { StateContext } from '@ngxs/store';
import { IGameTemplate, IGameTemplateList } from '@chess/igame-template.model';

@State<IGameTemplateList>({
  name: 'gameSelect'
})
export class TemplateState {
  constructor() { }

  @Action(RetrieveTemplateList)
  retrieveGameList({ setState, getState }: StateContext<IGameTemplateList>, action: RetrieveTemplateList) {
    setState(action.payload);
  }
}
