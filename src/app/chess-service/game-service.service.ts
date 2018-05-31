import { IBoardConstructor } from '@chess/i-board-constructor.model';
import { IPieceConstructor } from '@chess/ipiece-constructor.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Board } from '@chess/board';
import { IPlayer } from '@chess/iplayer.model';
import { Game } from '@chess/game';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, take } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly game_template_directory = 'assets/game_templates';

  public gameList: Game[];
  public playerList: IPlayer[];

  constructor(public _http: HttpClient) {
    // this.readGameTypeList();
  }
  newGame(name: string): Game {
    return new Game(this.GetBoardConfig(name), this.GetPiecesConfig(name), this.playerList);
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

  private GetBoardConfig(name: string): IBoardConstructor {
    const url = `${this.game_template_directory}/${name}.board.json`;
    const json_response = this._http.get(url)
      .pipe(
        map((res: Response) => {
          return res.json();
        })
      );
    return json_response as any as IBoardConstructor;
  }

  private GetPiecesConfig(name: string): IPieceConstructor[] {
    const url = `${this.game_template_directory}/${name}.pieces.json`;
    const json_response = this._http.get(url)
      .pipe(
        map((res: Response) => {
          return res.json();
        })
      );
    return json_response as any as IPieceConstructor[];
  }
}

