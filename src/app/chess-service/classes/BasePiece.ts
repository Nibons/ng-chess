import { GameService } from 'src/app/chess-service/classes/GameService';
import { IPieceData } from 'src/app/chess-service/interfaces/ipiece-data.model';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';
import { IPiece } from 'src/app/chess-service/interfaces/ipiece.model';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export abstract class BasePiece implements IPieceData {
  playerNumber: number;
  pieceType: EPieceType = EPieceType.base;
  coordinates: ICoordinates;
  HasMoved: boolean;
  IsVital: boolean;
  boardNumber: number;

  processPieceList: Observable<IPiece>;

  static PieceFactory(pieceTemplate: Partial<IPieceData>, pieceDefaults: Partial<IPieceData>, gameService: GameService) {
    const pieceInfo = BasePiece.combine(pieceTemplate, pieceDefaults) as IPiece;
    gameService.publishToPieceList(pieceInfo);
  }

  private static combine(
    pieceTemplate: Partial<IPieceData>,
    pieceDefaults: Partial<IPieceData>
  ): IPieceData {
    return { ...pieceDefaults, ...pieceTemplate } as IPieceData;
  }

  constructor(public gameService: GameService) {

    this.processPieceList = gameService.processPieceList
      .pipe(
        filter((piece: IPiece) => piece.pieceType === this.pieceType)
      );

    this.processPieceList.subscribe(
      (piece: IPiece) => this.processPiece(piece),
      () => console.error('Error on IPiece')
    );
  }

  abstract processPiece(piece: IPiece): void;

}
