import { PieceStateModelList, PieceStateModel } from '@chess/ipiece.model';
import { State, Selector, Action, StateContext, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { SetPiece } from '@chess/SetPiece';
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
    // const pieceActor = (new GetPieceActor(piece.pieceType)).PieceActor;
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
