import { Component, OnInit, Input } from '@angular/core';
import { BoardQuery, Board } from 'src/app/chess-service/state/board';
import { ID } from '@datorama/akita';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() boardId: ID = 0;
  protected board$: Observable<Board> = this.boardQuery$.getBoardById$(of(this.boardId));

  rowIterate$: Observable<number[]> = of([]);
  columnIterate$: Observable<number[]> = of([]);

  constructor(protected boardQuery$: BoardQuery) { }

  ngOnInit() {
    this.board$ = this.boardQuery$.getBoardById$(of(this.boardId));
    this.rowIterate$ = this.board$.pipe(map(b => numberToCountArray(b.rowCount)));
    this.columnIterate$ = this.board$.pipe(map(b => numberToCountArray(b.columnCount)));
  }


}
export function numberToCountArray(totalCount: number, startingNumber = 0): number[] {
  // ex. (8 => [0,1,2,3,4,5,6,7])
  // ex. ((8,1) => [1,2,3,4,5,6,7,8])
  return Array(totalCount).fill(0).map((x, i) => i + startingNumber);
}
