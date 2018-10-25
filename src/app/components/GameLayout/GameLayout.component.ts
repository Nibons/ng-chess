import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { mergeMap, map, tap, distinctUntilChanged, withLatestFrom, filter, switchMap, single } from 'rxjs/operators';
import { Observable, Subject, Subscription, merge, interval, of } from 'rxjs';
import { Game, GameQuery } from 'src/app/chess-service/state/game';
import { Board } from 'src/app/chess-service/state/board/board.model';
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

  // private setBoards(gameId: ID): void {
  //   this.boards = this.boardQuery.getAll().filter(
  //     board => board.gameId === gameId
  //   );
  // }

  // private setGame(gameId: ID): void {
  //   const game = this.gameQuery.getEntity(gameId);
  //   this.gameName = game.name;
  // }

}
