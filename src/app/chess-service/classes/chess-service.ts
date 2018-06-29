import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';
import { Injectable } from '@angular/core';
import { IPieceActor } from '@chess/IPieceActor.model';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { King } from '@chess/pieces/king';
import { Queen } from '@chess/pieces/queen';
import { Rook } from '@chess/pieces/rook';
import { Knight } from '@chess/pieces/knight';
import { Bishop } from '@chess/pieces/bishop';
import { Pawn } from '@chess/pieces/pawn';
import { SetPieceThreat } from '@chess/SetPieceThreat';
import { SetPiecePotentialMoves } from '@chess/SetPiecePotentialMoves';
import { SetPieceWatchList } from '@chess/SetPieceWatchList';
import { AllPiecesOnBoardCreated } from '@chess/AllPiecesOnBoardCreated';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { SetPieceActionSet } from '@chess/SetPieceActionSet';

@Injectable()
export class ChessService {
  pieceActors: IPieceActor[] = [];

  constructor(private store: Store, private actions$: Actions) {
    // create each type of piece actor, that will watch the PieceStateModel for changes
    this.createPieceActors();


    this.actions$.pipe(
      ofActionSuccessful(AllPiecesOnBoardCreated),
      map(
        ({ pieces }: AllPiecesOnBoardCreated) => {
          if (pieces !== undefined) {
            for (const p of pieces) {
              this.store.dispatch(new SetPieceActionSet(p, this.GetPieceActor(p.pieceType)));
            }
          } else {
            of(null);
          }
        })
    ).subscribe();
  }

  private GetPieceActor(pieceType: EPieceType): IPieceActor {
    return this.pieceActors.find(pA => pA.pieceType === pieceType);
  }

  private createPieceActors(): void {
    this.pieceActors.push(new King(this.store));
    this.pieceActors.push(new Queen(this.store));
    this.pieceActors.push(new Rook(this.store));
    this.pieceActors.push(new Knight(this.store));
    this.pieceActors.push(new Bishop(this.store));
    this.pieceActors.push(new Pawn(this.store));
  }
}
