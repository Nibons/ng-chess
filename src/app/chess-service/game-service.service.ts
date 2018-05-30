import { IBoardConstructor } from '@chess/i-board-constructor.model';
import { IPieceConstructor } from '@chess/ipiece-constructor.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GameConfig } from '@chess/GameConfig';
import { Board } from '@chess/board';
import { IPlayer } from '@chess/iplayer.model';
import { Game } from '@chess/game';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

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

  // TODO: write so games can be saved + loaded at will
  // GetGameConfigs(): Observable<string> {
  //   const url = game_template_directory;
  //   return this._http.get(url).pipe(
  //     map((res: Response) => res.text),

  //   );
  // }

  private GetBoardConfig(name: string): Observable<IBoardConstructor> {
    const url = `${game_template_directory}/${name}.board.json`;
    return this._http.get(url)
      .pipe(
        map((res: Response) => res.json()),
        map(json => json as any as IBoardConstructor));
  }

  private GetPiecesConfig(name: string): Observable<IPieceConstructor[]> {
    const url = `${game_template_directory}/${name}.pieces.json`;
    return this._http.get(url).pipe(map((res: Response) => res.json()), map(json => json as any as IPieceConstructor[]));
  }
}

