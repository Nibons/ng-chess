import { IBoardConstructor } from '@chess/i-board-constructor.model';
import { IPieceConstructor } from '@chess/ipiece-constructor.model';
import { Observable, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { GameConfig } from '@chess/GameConfig';
import { Board } from '@chess/board';
import { IPlayer } from '@chess/iplayer.model';
import { Game } from '@chess/game';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

const game_template_directory = 'assets/game_templates';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public gameList: Game[];
  public playerList: IPlayer[];

  constructor(public _http: HttpClient) {
    // this.readGameTypeList();
  }
  newGame(name: string): Game {
    return new Game(this.getBoardConfig(name), this.getPieceList(name), this.playerList);
  }
  saveGame(name: string) {

  }


  private getPieceList(name: string): IPieceConstructor[] {
    // return JSON.parse(this.readTextFile(`${name}.pieces.json`));
    const file = require(`${game_template_directory}/${name}.pieces.json`);
    return JSON.parse(file);
  }

  private getBoardConfig(name: string): IBoardConstructor {
    return (<IBoardConstructor>this.getGameTemplateJson(name).subscribe(res => response.json));

    return JSON.parse(file);
  }

  // private AsyncgetGameTemplateJson(name: string): Observable<any> {
  //
  //   return this._http.get(file);
  // }
  // private asyncReadTemplatJson(observable: Observable<any>) {
  //   const subscription: Subscription = observable.subscribe();
  // }

  private AsyncGetBoardConfig(name: string): Observable<IBoardConstructor> {
    const url = require(`${game_template_directory}/${name}.board.json`);
    return this._http.get(url)
      .map()
  }



}

