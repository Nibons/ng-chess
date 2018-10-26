import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ID } from '@datorama/akita';
import { mergeMap, map, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { GameQuery } from 'src/app/chess-service/state/game';
import { BoardQuery } from 'src/app/chess-service/state/board';
import { Title } from '@angular/platform-browser';
import { GameService } from 'src/app/chess-service/state/game/game.service';
import { GamesaveQuery } from 'src/app/chess-service/state/gamesave';

@Component({
  selector: 'app-gamelayout',
  templateUrl: './GameLayout.component.html',
  styleUrls: ['./GameLayout.component.css']
})
export class GameLayoutComponent implements OnInit, OnDestroy {
  private gameCreateSubscription = new Subscription;
  gameId$: Observable<ID> = this.route.paramMap.pipe(
    mergeMap(params => params.get('gameId') as string),
    map(s => Number(s)),
  );

  game$ = this.gameId$.pipe(
    mergeMap(id => this.gameQuery.selectEntity(id)),
    tap(game => console.log('Got a game: ' + game.name)),
    tap(game => this.setTitle(game.name))
  );
  boardList$ = this.gameId$.pipe(
    mergeMap(id => this.boardQuery.selectBoardsInGame(id))
  );


  constructor(
    private route: ActivatedRoute,
    private gameQuery: GameQuery,
    private boardQuery: BoardQuery,
    private gameSaveQuery: GamesaveQuery,
    private gameService: GameService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.gameCreateSubscription = this.gameId$.pipe(
      mergeMap(id => this.gameSaveQuery.selectEntity(id))
    ).subscribe(
      gameSave => this.gameService.createFromGameSave(gameSave)
    );
  }
  ngOnDestroy() {
    this.gameCreateSubscription.unsubscribe();
  }

  private setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
