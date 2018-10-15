import { Component, OnInit } from '@angular/core';
import { GamesaveQuery, Gamesave, GamesaveService } from 'src/app/chess-service/state/gamesave';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-gameconsole',
  templateUrl: './GameConsole.component.html',
  styleUrls: ['./GameConsole.component.css']
})
export class GameConsoleComponent implements OnInit {
  games$: Observable<Gamesave[]> = this.gameQuery.selectAll();
  gameSave$: Observable<Gamesave> = this.games$.pipe(map(boardList => boardList[0]));
  build_game: ID = 0;

  constructor(private gameQuery: GamesaveQuery, private gameSaveService: GamesaveService) { }

  ngOnInit() {
    this.games$ = this.gameQuery.selectAll();
  }

}
