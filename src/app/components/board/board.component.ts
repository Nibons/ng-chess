import { Component, OnInit, Input } from '@angular/core';
import { BoardQuery, Board } from 'src/app/chess-service/state/board';
import { ID } from '@datorama/akita';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() boardId: ID = 0;
  protected board$: Observable<Board> = this.boardQuery$.getBoardById$(of(this.boardId));

  constructor(protected boardQuery$: BoardQuery) { }

  ngOnInit() { }
}
