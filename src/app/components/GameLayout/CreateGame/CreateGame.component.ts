import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GamesaveQuery } from 'src/app/chess-service/state/gamesave';
import { mergeMap } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { GameService } from 'src/app/chess-service/state/game';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creategame',
  templateUrl: './CreateGame.component.html',
  styleUrls: ['./CreateGame.component.css']
})
export class CreateGameComponent implements OnInit, OnDestroy {
  @Input() gameId: ID = 0;
  private _gameSaveQuerySubscription: Subscription = new Subscription;

  gameInfo$ = this.gameSaveQuery.selectActive();

  constructor(
    private gameSaveQuery: GamesaveQuery,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this._gameSaveQuerySubscription = this.gameInfo$
    .subscribe(
      gameSave => {
        gameSave.id = this.gameId;
        this.gameService.createFromGameSave(gameSave);
      }
    );
  }

  ngOnDestroy() {
    this._gameSaveQuerySubscription.unsubscribe();
  }
}
