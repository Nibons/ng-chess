import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameState } from '@chess/game-state';
import { GameStateModel } from '@chess/igame.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Select(GameState) game$: Observable<GameStateModel>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

}
