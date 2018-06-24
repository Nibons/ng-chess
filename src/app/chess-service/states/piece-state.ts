import { PieceStateModelList, PieceStateModel } from '@chess/ipiece.model';
import { State, Selector, Action, StateContext, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { SetPiece } from '@chess/SetPiece';
import { AddPositionToBoard } from '@chess/AddPositionToBoard';
import { Guid } from '@chess/guid';
import { CreatePiece } from '@chess/CreatePiece';
import { SetPieceAtPosition } from '@chess/SetPieceAtPosition';
import { SetPieceThreat } from '@chess/SetPieceThreat';
import { SetPiecePotentialMoves } from '@chess/SetPiecePotentialMoves';
import { SetPieceWatchList } from '@chess/SetPieceWatchList';
import { AddToPositionWatchList } from '@chess/AddToPositionWatchList';
import { forkJoin, Observable } from 'rxjs';

@State<PieceStateModel[]>({
  name: 'pieces',
  defaults: []
})
export class PieceState {
  constructor(private actions$: Actions, private store: Store) {
    this.actions$.pipe(
      ofActionSuccessful(SetPieceAtPosition)
    ).subscribe(({ piece }: SetPieceAtPosition) => {
      this.store.dispatch(new SetPieceThreat(piece));
    });
    this.actions$.pipe(
      ofActionSuccessful(SetPieceThreat)
    ).subscribe(
      ({ piece }: SetPieceThreat) =>
        this.store.dispatch(new SetPiecePotentialMoves(piece))
    );
    this.actions$.pipe(
      ofActionSuccessful(SetPiecePotentialMoves)
    ).subscribe(
      ({ piece }: SetPiecePotentialMoves) =>
        this.store.dispatch(new SetPieceWatchList(piece))
    );
  }
  @Selector() static PieceList(state: PieceStateModelList): PieceStateModel[] {
    return state.pieces;
  }
  @Selector() static getPieceById(state: PieceStateModelList) {
    return (Id: Guid) => {
      return state.pieces.find((piece: PieceStateModel) => piece.Id === Id);
    };
  }

  @Action(SetPiece)
  setPiece({ getState, patchState }: StateContext<PieceStateModelList>, { piece }: SetPiece) {
    if (getState().pieces) {
      patchState({
        pieces: [
          piece,
          ...getState().pieces,
        ]
      });
    } else {
      patchState({
        pieces: [
          piece
        ]
      });
    }
  }
  @Action(CreatePiece)
  createPiece() { }

  @Action(SetPieceThreat)
  SetPieceThreat({ piece }: SetPieceThreat) {
    this.store.dispatch(new SetPiece(piece));
  }
  @Action(SetPiecePotentialMoves)
  SetPiecePotentialMoves({ piece }: SetPiecePotentialMoves) {
    this.store.dispatch(new SetPiece(piece));
  }

  @Action(SetPieceWatchList)
  setPieceWatchList({ positions, pieceId }: SetPieceWatchList) {
    let addToList$: Observable<any>;
    positions.forEach(
      positionId => {
        addToList$ = forkJoin(addToList$,
          this.store.dispatch(new AddToPositionWatchList(pieceId, positionId))
        );
      }
    );
    return addToList$;
  }
}
