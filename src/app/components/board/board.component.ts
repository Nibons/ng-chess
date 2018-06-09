import { IBoardDimensions, ICoordinates } from '@chess/icoordinates.model';
import { PositionStateModelList, PositionStateModel } from '@chess/iposition.model';
import { BoardStateModelList, BoardStateModel } from '@chess/iboard.model';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { BoardState } from '@chess/board-state';
import { PositionState } from '@chess/position-state';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() boardId: number;
  @Select(BoardState) boardState$: Observable<BoardStateModelList>;
  @Select(PositionState.GetPositionAt) positionAt$: Observable<(c: ICoordinates) => PositionStateModel>;
  board: BoardStateModel;
  columns = [];
  rows = [];



  constructor(private store: Store) {
  }

  ngOnInit() {
    this.boardState$.subscribe(
      state => this.setBoard(state.boards.find(b => b.Id === this.boardId))
    );
  }
  setBoard(board: BoardStateModel) {
    this.board = board;
    this.setBoardRange(board.range);
  }
  setBoardRange(boardDimensions: IBoardDimensions) {
    this.columns = Array(this.board.range.max.dimensions[0] - this.board.range.min.dimensions[0]);
    this.rows = Array(this.board.range.max.dimensions[1] - this.board.range.min.dimensions[1]);
  }
  getPositionAt(coordinates: ICoordinates): Observable<PositionStateModel> {
    return this.positionAt$.pipe(map(filterFn => filterFn(coordinates)));
  }
}
