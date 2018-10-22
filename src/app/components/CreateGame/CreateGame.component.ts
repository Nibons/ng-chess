import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesaveQuery, Gamesave } from 'src/app/chess-service/state/gamesave';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { mergeMap, map, switchMap, filter, distinctUntilChanged, distinct, buffer } from 'rxjs/operators';
import { Observable, Subscription, of, from } from 'rxjs';
import { ID } from '@datorama/akita';
import { GameQuery, GameService, Game } from 'src/app/chess-service/state/game';

@Component({
  selector: 'app-creategame',
  templateUrl: './CreateGame.component.html',
  styleUrls: ['./CreateGame.component.css']
})
export class CreateGameComponent implements OnInit, OnDestroy {
  gameSaveId$: Observable<ID> = this.route.paramMap.pipe(
    mergeMap(params => params.get('templateId') as string),
    map(s => Number(s))
  );

  gameSave$: Observable<Gamesave> = this.gameSaveId$.pipe(
    mergeMap(id => this.gameSaveQuery.getById(id))
  );

  game$: Observable<Game> = this.gameSave$.pipe(
    map(gameSave => this.gameService.createFromGameSave(gameSave)),
    mergeMap(gameId =>
      this.gameQuery.onLoaded(gameId)
    )
  );

  gameCreatingSubscription: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameSaveQuery: GamesaveQuery,
    private gameQuery: GameQuery,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.gameCreatingSubscription =
      this.game$.subscribe(
        game => this.goToGame(game.id)
      );
  }

  ngOnDestroy() {
    this.gameCreatingSubscription.unsubscribe();
  }

  goToGame(gameId: ID) {
    this.router.navigate([`/game/${gameId}`]);
  }

}
