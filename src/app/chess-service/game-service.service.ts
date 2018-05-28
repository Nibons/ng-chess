import { Injectable } from '@angular/core';
import { GameConfig } from '@chess/GameConfig';
import { Board } from '@chess/board';
import { IPlayer } from '@chess/iplayer.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(config: GameConfig) { }
}
