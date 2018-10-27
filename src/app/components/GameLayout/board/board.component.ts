import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BoardQuery, Board } from 'src/app/chess-service/state/board';
import { ID } from '@datorama/akita';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  @Input() boardId: ID = 0;
  protected board$: Observable<Board> = this.boardQuery$.getBoardById$(of(this.boardId));
  private subscriptionList: Subscription = new Subscription;

  // column = x value
  // row = y value
  private columnIterate$: Observable<number[]> =
    this.boardQuery$.selectBoardDimensionIterate(this.boardId, 0).pipe(
      tag('board-columnIterate')
    );
  private rowIterate$: Observable<number[]> =
    this.boardQuery$.selectBoardDimensionIterate(this.boardId, 1).pipe(
    // this makes the graph look like this, which is how i wrote everything else
    // [0,1][1,1]
    // [0,0][1,0]
    map(rowNumberList => rowNumberList.reverse()),
    tag('board-rowIterate')
  );
  private columnCount$: Observable<number> =
    this.boardQuery$.selectBoardDimensionCount(this.boardId, 0);
  private rowCount$: Observable<number> =
    this.boardQuery$.selectBoardDimensionCount(this.boardId, 1);

  columnIterate: number[] = [];
  rowIterate: number[] = [];
  columnCount = 0;
  rowCount = 0;

  constructor(protected boardQuery$: BoardQuery) { }
  ngOnInit() {
    [
      this.rowIterate$.subscribe(list => this.rowIterate = list),
      this.columnIterate$.subscribe(list => this.columnIterate = list),
      this.rowCount$.subscribe(n => this.rowCount = n),
      this.columnCount$.subscribe(n => this.columnCount = n)
    ].forEach(
      s => this.subscriptionList.add(s)
    );
  }

   ngOnDestroy(): void {
     this.subscriptionList.unsubscribe();
  }
}
