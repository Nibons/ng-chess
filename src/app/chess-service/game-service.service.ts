import { IBoardConstructor } from '@chess/i-board-constructor.model';
import { IPieceConstructor } from '@chess/ipiece-constructor.model';
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

  constructor() {
    // this.readGameTypeList();
  }
  newGame(name: string): Game {
    // const playerList: IPlayer[];
    return new Game(this.getBoardConfig(name), this.getPieceList(name), playerList);
  }
  saveGame(name: string) {

  }


  private getPieceList(name: string): IPieceConstructor[] {
    // return JSON.parse(this.readTextFile(`${name}.pieces.json`));
    const file = require(`${game_template_directory}/${name}.pieces.json`);
    return JSON.parse(file);
  }

  private getBoardConfig(name: string): IBoardConstructor {
    const file = require(`${game_template_directory}/${name}.board.json`);
    return JSON.parse(file);
  }

}

