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

@Injectable()
export class ChessService {
  pieceActors: IPieceActor[] = [];

  constructor(private store: Store, private actions$: Actions) {
    // create each type of piece actor, that will watch the PieceStateModel for changes
    this.createPieceActors();
    this.actions$.pipe(
      ofActionSuccessful(AllPiecesOnBoardCreated)
    ).subscribe(
      ({ pieces }: AllPiecesOnBoardCreated) => {
        for (const p of pieces) {
          if (p !== undefined) {
            this.processPiece(p);
          }
        }
      }
    );
  }
  private processPiece(piece: PieceStateModel) {
    if (piece !== undefined) {
      this.store.dispatch(new SetPieceThreat(this.GetThreat(piece)))
        .subscribe(
          () =>
            this.store.dispatch(new SetPiecePotentialMoves(this.GetPotentialMoves(piece)))
              .subscribe(
                () =>
                  this.store.dispatch(new SetPieceWatchList(piece.Id, this.GetWatchList(piece)))
              )
        );
    }
  }
  private GetPieceActor(piece: PieceStateModel): IPieceActor {
    const pieceActor = this.pieceActors.filter(
      (pA: IPieceActor) =>
        pA.pieceType === piece.pieceType
    );
    return pieceActor[0];
  }

  private GetThreat(piece: PieceStateModel): PieceStateModel {
    if (piece !== undefined) {
      const pieceActor = this.GetPieceActor(piece);
      const threatPositions = pieceActor.GetThreatPositionIds(piece);
      piece.threatList = threatPositions;
      return piece;
    }
  }

  private GetPotentialMoves(piece: PieceStateModel): PieceStateModel {
    if (piece !== undefined) {
      const pieceActor = this.GetPieceActor(piece);
      const positionIds = pieceActor.GetPotentialMovePositionIds(piece);
      piece.potentialMoves = positionIds;
      return piece;
    }
  }

  private GetWatchList(piece: PieceStateModel): Guid[] {
    if (piece !== undefined) {
      const pieceActor = this.GetPieceActor(piece);
      return pieceActor.GetWatchList(piece);
    }
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
