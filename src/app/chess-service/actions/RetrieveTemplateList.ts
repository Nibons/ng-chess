import { TemplateStateModel } from './../interfaces/ITemplateState.model';
import { OptionsStateModel } from '@chess/options.model';
import { PlayerStateModel } from '@chess/iplayer.model';
import { BoardStateModel } from '@chess/iboard.model';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddTemplate } from '@chess/AddTemplate';
import { PieceStateModel } from '@chess/ipiece.model';

export class RetrieveTemplateList {
  static readonly type = '[GameSelect] RetrieveGameList';
  public payload: TemplateStateModel[] = [];
  constructor(private http: HttpClient, private store: Store) {
    const gameTemplateList: Observable<TemplateStateModel[]> = this.getGameTemplateList();
    gameTemplateList.subscribe((r: TemplateStateModel[]) => r.forEach(ig => this.getGameModelFromGameTemplate(ig)));
  }
  private getGameTemplateList() {
    return this.http.get<TemplateStateModel[]>('assets/game_templates/GameTemplates.json');
  }
  private getGameModelFromGameTemplate(ig: TemplateStateModel) {
    const boards$ = this.http.get<BoardStateModel[]>(ig.rootFolder + ig.configFiles.boards);
    const options$ = this.http.get<OptionsStateModel>(ig.rootFolder + ig.configFiles.options);
    const pieces$ = this.http.get<PieceStateModel[]>(ig.rootFolder + ig.configFiles.pieces);
    const players$ = this.http.get<PlayerStateModel[]>(ig.rootFolder + ig.configFiles.players);
    forkJoin([boards$, options$, pieces$, players$]).subscribe(results => {
      const gsm: TemplateStateModel = {
        name: ig.name,
        type: ig.type,
        configStateTemplates: {
          boards: <BoardStateModel[]>results[0],
          options: <OptionsStateModel>results[1],
          pieces: <PieceStateModel[]>results[2],
          players: <PlayerStateModel[]>results[3]
        }
      };
      this.store.dispatch(new AddTemplate(gsm));
    });
  }
}
