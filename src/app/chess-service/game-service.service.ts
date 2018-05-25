import { Injectable } from '@angular/core';
import { GameConfig } from '@chess/GameConfig';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(config: GameConfig) { }
}
