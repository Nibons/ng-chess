import { Component, OnInit } from '@angular/core';
import { GamesaveQuery, Gamesave } from 'src/app/chess-service/state/gamesave';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-gameconsole',
  templateUrl: './GameConsole.component.html',
  styleUrls: ['./GameConsole.component.css']
})
export class GameConsoleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
