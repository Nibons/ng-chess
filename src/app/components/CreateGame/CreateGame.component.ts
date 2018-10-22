import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesaveQuery, Gamesave } from 'src/app/chess-service/state/gamesave';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-creategame',
  templateUrl: './CreateGame.component.html',
  styleUrls: ['./CreateGame.component.css']
})
export class CreateGameComponent implements OnInit, OnDestroy {
  gameSave$: Observable<Gamesave> = new Observable<Gamesave>();
  gameCreatingSubscription: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameSaveQuery: GamesaveQuery) { }

  ngOnInit() {
    // use the templateId parameter to filter the game to make
    this.gameSave$ = this.route.paramMap.pipe(
      mergeMap(params =>
        this.gameSaveQuery.getById(params.get('templateId'))
      )
    );

    // TODO this should output the game (id | game)
    // this.game$ = this.gameService.createFromSave()
  }

  ngOnDestroy() {
    this.gameCreatingSubscription.unsubscribe();
  }

  goToGame(gameId: ID) {
    this.router.navigate([`/game/${gameId}`]);
  }

}
