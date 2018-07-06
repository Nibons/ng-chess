import { SetPieceActionSet } from './../actions/SetPieceActionSet';
import { CreateAllPieces } from './../actions/CreateAllPieces';
import { map } from 'rxjs/operators';
import { BoardState } from '@chess/board-state';
import { PieceStateModelList, PieceStateModel } from '@chess/ipiece.model';
import { State, Selector, Action, StateContext, Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { SetPiece } from '@chess/SetPiece';
import { Guid } from '@chess/guid';
import { CreatePiece } from '@chess/CreatePiece';
import { AllPositionsOnBoardCreated } from '@chess/AllPositionsOnBoardCreated';
import { AllPiecesOnBoardCreated } from '@chess/AllPiecesOnBoardCreated';

@State<PieceStateModelList>({
  name: 'pieces',
  defaults: {
    pieces: [
      {
        Id: null,
        gameId: null,
        playerNumber: null,
        playerId: null,
        pieceType: null,
        IsVital: null,
        IsAlive: null,
        HasMoved: null,
        positionId: null,
        threatList: null,
        potentialMoves: null,
        value: null,
        boardNumber: null,
        coordinates: null
      }
    ]
  }
})
export class PieceState {
  private allPiecesCreated$;
  constructor(private actions$: Actions, store: Store) {
    // on allPositionsCreated, create the pieces
    this.actions$.pipe(
      ofActionSuccessful(AllPositionsOnBoardCreated),
      map(
        (action: AllPositionsOnBoardCreated) => {
          store.select(BoardState.BoardList).subscribe(
            boardList => {
              const gameId = boardList.find(b => b.Id.IsEqual(action.boardId)).gameId;
              store.dispatch(new CreateAllPieces(action.boardId, gameId, action.gameInfo));
            }
          );
        }
      )
    ).subscribe();
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
  setPiece({ getState, patchState }: StateContext<PieceStateModelList>, action: SetPiece) {
    if (action.piece !== undefined) {
      if (getState().pieces[0].Id === null) {
        patchState({ pieces: [action.piece] });
      } else {
        patchState({
          pieces: [
            ...getState().pieces.filter((p: PieceStateModel) => !p.Id.IsEqual(action.piece.Id)),
            action.piece
          ]
        });
      }
    }
  }
  @Action(CreatePiece)
  createPiece() { }

  @Action(SetPieceActionSet)
  setPieceActionSet({ getState, dispatch }: StateContext<PieceStateModelList>, { payload }: SetPieceActionSet) {
    const currentPiece = getState().pieces.find(p => p.Id.IsEqual(payload.Id));
    if (currentPiece.potentialMoves === payload.potentialMoves && currentPiece.threatList === payload.threatList) {
      console.log('lists are equal');
    } else {
      const setPiece = { ...currentPiece, ...payload };
      dispatch(new SetPiece(setPiece));
    }
  }


  @Action(CreateAllPieces)
  createAllPieces({ gameInfo }: CreateAllPieces) {
    const pieces = gameInfo;
    // this.allPiecesCreated$ = this.actions$.pipe(
    //   ofActionSuccessful(CreatePiece),
    //   debounce(() => timer(100)),
    //   first(
    //     (action: CreatePiece) =>
    //       getState().pieces.filter(p => p.gameId === action.gameId).length === totalPieceCount
    //   )
    // ).subscribe(
    //   () => {
    //     const piecesCreated = getState().pieces.filter(p => p.gameId === gameId);
    //     this.store.dispatch(new AllPiecesOnBoardCreated(gameInfo, piecesCreated));
    //   }
    // );
  }
  @Action(AllPiecesOnBoardCreated)
  AllPiecesOnBoardCreated() {
    this.allPiecesCreated$.unsubscribe();
  }

}
