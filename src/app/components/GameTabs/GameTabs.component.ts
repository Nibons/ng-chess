import { Component, OnInit } from '@angular/core';
import { GameQuery } from 'src/app/chess-service/state/game';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatToolbar } from '@angular/material/toolbar';
import { startWith, toArray, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';

export interface TabInfo {
  name: string;
  id: ID;
}
const newGameTab: TabInfo = { name: '+', id: 0 };

@Component({
  selector: 'app-gametabs',
  templateUrl: './GameTabs.component.html',
  styleUrls: ['./GameTabs.component.css']
})
export class GameTabsComponent implements OnInit {

  gameList$: Observable<TabInfo[]> = this.gamesQuery.selectAll()
    .pipe(
      map(gameList => [...gameList, newGameTab])
    );

  constructor(private gamesQuery: GameQuery) { }

  ngOnInit() { }

}
