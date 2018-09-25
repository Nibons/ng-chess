import { Component, OnInit } from '@angular/core';
import { GameQuery } from 'src/app/chess-service/state/game';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { startWith } from 'rxjs/operators';

const newGameTab = { name: '+', IsNewGame: true };

@Component({
  selector: 'app-gametabs',
  templateUrl: './GameTabs.component.html',
  styleUrls: ['./GameTabs.component.css']
})
export class GameTabsComponent implements OnInit {

  gameList$ = this.gamesQuery.selectAll()
    .pipe(
      startWith(newGameTab)
    );

  constructor(private gamesQuery: GameQuery) { }

  ngOnInit() { }

}
