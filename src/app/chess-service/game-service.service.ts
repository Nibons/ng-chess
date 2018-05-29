import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GameConfig } from '@chess/GameConfig';
import { Board } from '@chess/board';
import { IPlayer } from '@chess/iplayer.model';
import { Game } from '@chess/game';

const game_template_directory = 'assets/game_templates';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public gameList: Game[];
  player: IPlayer[];

  constructor() {
    // this.readGameTypeList();
  }
  newGame() {

  }
}
