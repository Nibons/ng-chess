import { Coordinates } from './coordinates';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';

describe('Coordinates.IsSameCoordinates', () => {
  const coords: ICoordinates = { dimensions: [0, 0] };
  it('Response true for the same coordinates', () => {
    expect(Coordinates.IsSameCoordinates(coords, coords)).toBe(true);
  });

  it('Responds false if coordinates are different', () => {
    const diff_coords: ICoordinates = { dimensions: [0, 1] };
    expect(Coordinates.IsSameCoordinates(coords, diff_coords)).toBe(false);
  });

  it('responds false when the number of dimensions do not match', () => {
    const diff_dCount: ICoordinates = { dimensions: [0, 0, 0] };
    expect(Coordinates.IsSameCoordinates(coords, diff_dCount)).toBe(false);
  });
});
