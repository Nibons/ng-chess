import { GameItemStateModel } from '@chess/igame-item.model';
import { PlayerStateModelList } from './../../chess-service/interfaces/iplayer.model';
import { PieceStateModelList } from './../../chess-service/interfaces/ipiece.model';
import { GameModelList, GameModel } from '@chess/igame-select.model';
import { BoardStateModelList } from './../../chess-service/interfaces/iboard.model';
import { IGameTemplate } from './../../chess-service/interfaces/igame-select.model';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { OptionsStateModel, GameStateModelList } from '@chess/igame.model';
import { Guid } from '@chess/guid';
import { map, tap, mergeMap, subscribeOn } from 'rxjs/operators';
import { observable, Observable, forkJoin, pipe } from 'rxjs';
import { Type } from '@angular/compiler/src/output/output_ast';

export class NewGame {
  static readonly type = '[GameSelect] NewGame';
  constructor(public payload: OptionsStateModel) {
    payload.Id = Guid.newGuid();
    payload.IdCounter = 0;
  }
}

export class RetrieveGameList {
  static readonly type = '[GameSelect] RetrieveGameList';
  public payload: GameModelList;

  constructor(private http: HttpClient) {
    this.getGameTemplateList();
  }
  private getGameTemplateList() {
    this.http.get('assets/game_templates/GameTemplats.json')
      .pipe(
        map((res: Response) => res.json)
      );//// need to get this to call this.getGameModelFromGameTemlateList
  }
  private getGameModelFromGameTemplateList(templateList: IGameTemplate[]) {
    templateList.forEach(ig => this.getGameModelFromGameTemplate(ig));
  }
  private getGameModelFromGameTemplate(ig: IGameTemplate) {
    const boards$ = this.http.get(ig.rootFolder + ig.configFiles.boards);
    const options$ = this.http.get(ig.rootFolder + ig.configFiles.options);
    const pieces$ = this.http.get(ig.rootFolder + ig.configFiles.pieces);
    const players$ = this.http.get(ig.rootFolder + ig.configFiles.players);
    forkJoin([boards$, options$, pieces$, players$]).subscribe(results => {
      const gsm: GameModel = {
        name: ig.name,
        boards: <BoardStateModelList>results[0],
        options: <OptionsStateModel>results[1],
        pieces: <PieceStateModelList>results[2],
        players: <PlayerStateModelList>results[3]
      };
      this.payload.gameList.push(gsm);
    }
    );
  }
  private getUri<T>(uri: string) {
    const json = this.http.get(uri).pipe(map((r: Response) => r.json));
    return json.pipe(map(next => <() => Promise<T>>next));
  }
}
