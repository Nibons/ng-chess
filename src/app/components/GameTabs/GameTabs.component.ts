import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { GameQuery } from 'src/app/chess-service/state/game';
import { map, delay } from 'rxjs/operators';
import { Observable, Subscription, Subject, of } from 'rxjs';
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
  gameList$: Observable<TabInfo[]> = this.gamesQuery.selectAll().pipe(
    map(list => [...list, newGameTab]),
    delay(0) // this is added to remove the 'ExpressionChangedAfterItHasBeenCheckedError'
    // details can be found https://blog.angular-university.io/angular-debugging/
  );


  constructor(private gamesQuery: GameQuery) { }

  ngOnInit() { }

}
