import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';
import { PositionStateModel } from '@chess/iposition.model';
import { BoardStateModel } from '@chess/iboard.model';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { BoardState } from '@chess/board-state';
import { PositionState } from '@chess/position-state';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() boardId: Guid;
  @Select(BoardState) boardState$: Observable<BoardStateModel[]>;
  @Select(PositionState.GetPositionAt) positionAt$: Observable<(c: ICoordinates) => PositionStateModel>;
  board: BoardStateModel;
  columns = [];
  rows = [];



  constructor() {
  }

  ngOnInit() {
    this.boardState$.subscribe(
      state => this.setBoard(state.find((b: BoardStateModel) => b.Id === this.boardId))
    );
  }
  setBoard(board: BoardStateModel) {
    this.board = board;
    this.setBoardRange();
  }
  setBoardRange() {
    this.columns = Array(this.board.range.max.dimensions[0] - this.board.range.min.dimensions[0]);
    this.rows = Array(this.board.range.max.dimensions[1] - this.board.range.min.dimensions[1]);
  }
  getPositionAt(coordinates: ICoordinates): Observable<PositionStateModel> {
    return this.positionAt$.pipe(map(filterFn => filterFn(coordinates)));
  }
}
