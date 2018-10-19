import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesaveQuery, Gamesave } from 'src/app/chess-service/state/gamesave';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, observable, Subscription } from 'rxjs';
import { GameQuery, Game } from 'src/app/chess-service/state/game';
import { ID } from '@datorama/akita';
import { GameService } from 'src/app/chess-service/classes/GameService';

@Component({
  selector: 'app-creategame',
  templateUrl: './CreateGame.component.html',
  styleUrls: ['./CreateGame.component.css']
})
export class CreateGameComponent implements OnInit, OnDestroy {
  gameSave$: Observable<Gamesave> = new Observable<Gamesave>();
  game$: Observable<Game> = new Observable<Game>();
  gameCreatingSubscription: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameSaveQuery: GamesaveQuery,
    private gameQuery: GameQuery,
    private gameService: GameService) { }

  ngOnInit() {
    this.gameSave$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.gameSaveQuery.getById(params.get('templateId'))
      )
    );

    // TODO this should output
    // this.game$ = this.gameService.createFromSave()
  }

  ngOnDestroy() {
    this.gameCreatingSubscription.unsubscribe();
  }

  goToGame(gameId: ID) {
    this.router.navigate([`/game/${gameId}`]);
  }

}
