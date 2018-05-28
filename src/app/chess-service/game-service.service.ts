import { Injectable } from '@angular/core';
import { GameConfig } from '@chess/GameConfig';
import { Board } from '@chess/board';
import { IPlayer } from '@chess/iplayer.model';
import { Game } from '@chess/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public gameList: Game[];
  constructor() { }
}
