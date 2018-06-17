import { BoardState } from '@chess/board-state';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameState } from '@chess/game-state';
import { OptionsStateModel } from '@chess/options.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Select(GameState) game$: Observable<OptionsStateModel>;

  constructor(private store: Store) { }

  ngOnInit() {

  }
  newGame() {
    this.store.dispatch((state: BoardState) => state.CreateBoard);
  }

}
