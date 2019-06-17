import { Board } from './board';

describe('Board', () => {
  it('should create the default', () => {
    expect(
      Board.create(Board.defaultBoardMin, Board.defaultBoardMax, 0)
    ).toBeTruthy();
  });
});
