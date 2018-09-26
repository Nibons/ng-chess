import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { Position, createPosition } from './position.model';
import { Board } from './../board/board.model';

import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { PositionStore } from './position.store';
import { HttpClient } from '@angular/common/http';
import { BoardQuery, BoardService } from 'src/app/chess-service/state/board';

@Injectable({ providedIn: 'root' })
export class PositionService {

  constructor(private positionStore: PositionStore,
    private boardService: BoardService,
    private boardQuery: BoardQuery) {
    this.boardQuery.incompleteBoards$.subscribe(
      boardList => this.iterateOverBoardList(boardList)
    );
  }

  private iterateOverBoardList(boardList: Board[]) {
    boardList.forEach(
      (board) => {
        this.iterateOverBoardPositions(board);
        this.boardService.OnAllPositionsPlaced(board);
      }
    );
  }

  private iterateOverBoardPositions(board: Board) {
    const range = board.range;
    let coordinates: ICoordinates = { dimensions: [] };
    for (let x = range.min.dimensions[0]; x <= range.max.dimensions[0]; x++) {
      for (let y = range.min.dimensions[1]; y <= range.max.dimensions[1]; y++) {
        if (range.min.dimensions.length === 3) {
          for (let z = range.min.dimensions[2]; z <= range.max.dimensions[2]; z++) {
            coordinates = { dimensions: [x, y, z] };
          }
        } else {
          coordinates = { dimensions: [x, y] };
        }
        this.add(createPosition({ coordinates: coordinates }, board.id));
      }
    }
  }

  add(position: Position) {
    this.positionStore.add(position);
  }

}
