import { PieceStateModel } from '@chess/ipiece.model';
import { BoardStateModel } from '@chess/iboard.model';
import { PositionStateModel } from '@chess/IPosition.model';
import { IGameTemplate } from './../interfaces/igame-template.model';
import { Injectable } from '@angular/core';
import { IPieceActor } from '@chess/IPieceActor.model';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
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
import { SetGame } from '@chess/SetGame';
import { CreatePiece } from '@chess/CreatePiece';

@Injectable()
export class ChessService {
  pieceActors: IPieceActor[] = [];

  protected pieces$: Observable<PieceStateModel[]> = this.store.select(PieceState.PieceList);
  protected positions$: Observable<PositionStateModel[]> = this.store.select(PositionState.PositionList);
  protected boards$: Observable<BoardStateModel[]> = this.store.select(BoardState.BoardList);

  constructor(private store: Store, private actions$: Actions) {
    // create each type of piece actor, that will watch the PieceStateModel for changes
    // this.createPieceActors();
    this.actions$.pipe(
      ofActionSuccessful(SetGame)
    ).subscribe(() => {
      this.createPieceActors();
    });

  }
  public InvokeWatch() {
    this.pieceActors.forEach(
      (actor: IPieceActor) => actor.WatchAllPieces()
    );
  }

  public createPieceActors(): void {
    this.pieceActors.push(new King(this.store, this.actions$));
    this.pieceActors.push(new Queen(this.store, this.actions$));
    this.pieceActors.push(new Rook(this.store, this.actions$));
    this.pieceActors.push(new Knight(this.store, this.actions$));
    this.pieceActors.push(new Bishop(this.store, this.actions$));
    this.pieceActors.push(new Pawn(this.store, this.actions$));
  }

}
