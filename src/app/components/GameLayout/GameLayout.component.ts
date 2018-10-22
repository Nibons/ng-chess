import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { mergeMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Game, GameQuery } from 'src/app/chess-service/state/game';
import { Board } from 'src/app/chess-service/state/board/board.model';
import { BoardQuery } from 'src/app/chess-service/state/board';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gamelayout',
  templateUrl: './GameLayout.component.html',
  styleUrls: ['./GameLayout.component.css']
})
export class GameLayoutComponent implements OnInit {
  gameId$: Observable<ID> = this.route.paramMap.pipe(
    mergeMap(params => params.get('gameId') as string),
    map(s => Number(s))
  );

  game$: Observable<Game> = this.gameId$.pipe(
    // mergeMap(id => this.gameQuery.onLoaded(id))
    mergeMap(id => this.gameQuery.selectEntity(id)),
    tap(game => this.setTitle(game.name))
  );

  boards$: Observable<Board[]> = this.gameId$.pipe(
    mergeMap(id =>
      this.boardQuery.selectBoardsInGame(id)
    )
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameQuery: GameQuery,
    private boardQuery: BoardQuery,
    private titleService: Title
  ) { }

  ngOnInit() {
  }

  private setTitle(title: string) {
    this.titleService.setTitle(title);
  }

}
