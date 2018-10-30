import { ChessXAxisLabelPipe } from './chess-x-axis-label.pipe';

const expected_result_list: { n: number; s: string }[] = [
  { n: 0, s: '-' },
  { n: 1, s: 'A' },
  { n: 2, s: 'B' },
  { n: 8, s: 'H' },
  { n: 26, s: 'Z' }
];

describe('ChessXAxisLabelPipe', () => {
  let pipe: ChessXAxisLabelPipe;

  beforeEach(
    () => {
      pipe = new ChessXAxisLabelPipe();
    }
  );

  fit('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  expected_result_list.forEach(
    expected_result => {
      fit(`${expected_result.n} should equal ${expected_result.s}`, () => {
        expect(pipe.transform(expected_result.n)).toEqual(expected_result.s);
      });
    }
  );
});
