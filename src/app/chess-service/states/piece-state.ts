import { SetPieceActionSet } from './../actions/SetPieceActionSet';
import { CreateAllPieces } from './../actions/CreateAllPieces';
import { debounce, map } from 'rxjs/operators';
import { PieceStateModel } from '@chess/ipiece.model';
import { State, Selector, Action, StateContext, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { SetPiece } from '@chess/SetPiece';
import { Guid } from '@chess/guid';
import { CreatePiece } from '@chess/CreatePiece';
import { timer } from 'rxjs';
import { AllPositionsOnBoardCreated } from '@chess/AllPositionsOnBoardCreated';
import { AllPiecesOnBoardCreated } from '@chess/AllPiecesOnBoardCreated';

@State<PieceStateModel[]>({
  name: 'pieces',
  defaults: []
})
export class PieceState {
  private allPiecesCreated$;
  constructor(private actions$: Actions, private store: Store) {
    // on allPositionsCreated, create the pieces
    this.actions$.pipe(
      ofActionSuccessful(AllPositionsOnBoardCreated),
      map(
        (action: AllPositionsOnBoardCreated) => {
          store.select(BoardState.BoardList).subscribe(
            boardList => {
              const gameId = boardList.find(b => b.Id.IsEqual(action.boardId)).gameId;
              store.dispatch(new CreateAllPieces(action.pieces, action.boardId, gameId, action.gameInfo, store));
            }
          );
        }
      )
    ).subscribe();

    // onSetPieceAtPosition, check to see if all pieces have been placed
    this.allPiecesCreated$ = this.actions$.pipe(
      ofActionSuccessful(CreatePiece),
      debounce(() => timer(100))
    ).subscribe(
      (action: CreatePiece) => {
        this.store.select(PieceState.PieceList).subscribe(
          (pieceList: PieceStateModel[]) => {
            const piecesCreated = pieceList.filter(piece => piece.gameId.IsEqual(action.gameId));
            const totalPieceCount = action.gameInfo.template.configStateTemplates.pieces.pieces.length;
            if (piecesCreated.length === totalPieceCount) {
              this.store.dispatch(new AllPiecesOnBoardCreated(action.gameInfo, piecesCreated));
              this.allPiecesCreated$.unsubscribe();
            }
          }
        );
      }
    );
  }
  @Selector() static PieceList(state: PieceStateModel[]): PieceStateModel[] {
    return state;
  }
  @Selector() static getPieceById(state: PieceStateModel[]) {
    return (Id: Guid) => {
      return state.find((piece: PieceStateModel) => piece.Id === Id);
    };
  }

  @Action(SetPiece)
  setPiece({ getState, patchState }: StateContext<PieceStateModel[]>, action: SetPiece) {
    if (action.piece !== undefined) {
      if (getState().length === 0) {
        patchState([action.piece]);
      } else {
        patchState([
          ...getState().filter((p: PieceStateModel) => !p.Id.IsEqual(action.piece.Id)),
          action.piece
        ]);
      }
    }
  }
  @Action(CreatePiece)
  createPiece() { }

  @Action(SetPieceActionSet)
  setPieceActionSet({ getState, dispatch }: StateContext<PieceStateModel[]>, { payload }: SetPieceActionSet) {
    const currentPiece = getState().find(p => p.Id.IsEqual(payload.Id));
    if (currentPiece.potentialMoves === payload.potentialMoves && currentPiece.threatList === payload.threatList) {
      console.log('lists are equal');
    } else {
      const setPiece = { ...currentPiece, ...payload };
      dispatch(new SetPiece(setPiece));
    }
  }


  @Action(CreateAllPieces)
  createAllPieces() { }
}
