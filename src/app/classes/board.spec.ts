import { Board } from './board';

describe('Board', () => {
  it('should create the default', () => {
    const board = Board.create(Board.defaultBoardMin, Board.defaultBoardMax, 0);
    expect(
      board
    ).toBeTruthy();
    expect(board.positions.length).toEqual(64);
  });
});
