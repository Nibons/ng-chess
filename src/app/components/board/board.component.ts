import { Component, OnInit, Input } from '@angular/core';
import { BoardQuery, Board } from 'src/app/chess-service/state/board';
import { ID } from '@datorama/akita';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() boardId: ID = 0;
  protected board$: Observable<Board> = this.boardQuery$.getBoardById$(of(this.boardId));

  // column = x value
  // row = y value
  columnIterate$: Observable<number[]> = this.boardQuery$.selectBoardDimensionIterate(this.boardId, 0);
  rowIterate$: Observable<number[]> = this.boardQuery$.selectBoardDimensionIterate(this.boardId, 1).pipe(
    // this makes the graph look like this, which is how i wrote everything else
    // [0,1][1,1]
    // [0,0][1,0]
    map(rowNumberList => rowNumberList.reverse())
  );

  constructor(protected boardQuery$: BoardQuery) { }
  ngOnInit() { }
}
