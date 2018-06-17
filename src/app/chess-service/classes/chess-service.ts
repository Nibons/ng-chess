import { PieceStateModel } from '@chess/ipiece.model';
import { BoardStateModel } from '@chess/iboard.model';
import { PositionStateModel } from '@chess/IPosition.model';
import { IGameTemplate } from './../interfaces/igame-template.model';
import { Injectable } from '@angular/core';
import { IPieceActor } from '@chess/IPieceActor.model';
import { Store } from '@ngxs/store';
import { King } from '@chess/pieces/king';
import { Queen } from '@chess/pieces/queen';
import { Rook } from '@chess/pieces/rook';
import { Knight } from '@chess/pieces/knight';
import { Bishop } from '@chess/pieces/bishop';
import { Pawn } from '@chess/pieces/pawn';
import { Observable } from 'rxjs';
import { PieceState } from '@chess/piece-state';
import { PositionState } from '@chess/position-state';
import { BoardState } from '@chess/board-state';

@Injectable()
export class ChessService {
  pieceActors: IPieceActor[] = [];

  protected pieces$: Observable<PieceStateModel[]> = this.store.select(PieceState.PieceList);
  protected positions$: Observable<PositionStateModel[]> = this.store.select(PositionState.PositionList);
  protected boards$: Observable<BoardStateModel[]> = this.store.select(BoardState.BoardList);

  constructor(private store: Store) {
    // create each type of piece actor, that will watch the PieceStateModel for changes
    this.createPieceActors();
  }
  public static AddGame(template: IGameTemplate): void {

  }

  private createPieceActors() {
    this.pieceActors.push(new King(this.store));
    this.pieceActors.push(new Queen(this.store));
    this.pieceActors.push(new Rook(this.store));
    this.pieceActors.push(new Knight(this.store));
    this.pieceActors.push(new Bishop(this.store));
    this.pieceActors.push(new Pawn(this.store));
  }

}
