import { Piece } from './piece';
import { EPieceType } from 'src/app/enums/epiece-type.enum';
import { IPiece } from 'src/app/interfaces/ipiece';
import { Position } from 'src/app/classes/position';

describe('Piece', () => {
  it('should create an instance', () => {
    const p: IPiece = {
      playerNumber: 0,
      pieceType: EPieceType.pawn,
      hasMoved: false,
      position: new Position({})
    };
    expect(new Piece(p)).toBeTruthy();
  });
});
