import { Position } from './position';
import { Coordinates } from 'src/app/classes/coordinates';

describe('Position', () => {
  it('should create an instance', () => {
    expect(new Position({ boardNumber: 0, coordinates: new Coordinates({}) })).toBeTruthy();
  });
});
