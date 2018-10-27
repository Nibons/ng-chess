import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesaveQuery, Gamesave } from 'src/app/chess-service/state/gamesave';
import { ActivatedRoute, Router, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { mergeMap, map, switchMap, filter, distinctUntilChanged, distinct, buffer, tap } from 'rxjs/operators';
import { Observable, Subscription, of, from } from 'rxjs';
import { ID } from '@datorama/akita';
import { GameQuery, GameService, Game } from 'src/app/chess-service/state/game';

@Component({
  selector: 'app-creategame',
  templateUrl: './CreateGame.component.html',
  styleUrls: ['./CreateGame.component.css']
})
export class CreateGameComponent implements OnInit, OnDestroy {
  private _gameSaveId$: Observable<ID> = this.route.paramMap.pipe(
    mergeMap(params => params.get('templateId') as string),
    map(s => Number(s))
  );
  private _gameSaveQuerySubscription: Subscription = new Subscription;
  private _createGameSubscription: Subscription = new Subscription;

  gameInfo$ = this._gameSaveId$.pipe(
    mergeMap(id => this.gameSaveQuery.getById(id))
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameSaveQuery: GamesaveQuery,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this._gameSaveQuerySubscription = this._gameSaveId$.pipe(
      mergeMap(id => this.gameSaveQuery.getById(id))
    ).subscribe(
      gameSave => this.gameService.createFromGameSave(gameSave)
    );

    this._createGameSubscription = this.gameInfo$.subscribe(
      game => this.goToGame(game.id)
    );
  }

  ngOnDestroy() {
    this._createGameSubscription.unsubscribe();
    this._gameSaveQuerySubscription.unsubscribe();
  }

  private goToGame(gameId: ID) {
    const url = `/game/${gameId}`;
    this.router.navigate([url]);
  }

}
