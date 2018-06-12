import { IBoardDimensions, ICoordinates } from '@chess/icoordinates.model';
import { GameState } from './../states/game-state';
import { BoardStateModel, IBoard } from '@chess/iboard.model';
import { Store } from '@ngxs/store';

export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  public payload: BoardStateModel;
  constructor({ gameId, direction, range }: BoardStateModel, store: Store) {
    // convert the max dimensions into a number stream (which can be reversed) and just... count up
    // okidoki
    const dimension_value_list = [];
    let current_digit_multiplier = 1;
    range.max.dimensions.forEach((max, d) => {
      const dimension_length = range.max.dimensions[d] - range.min.dimensions[d];
      dimension_value_list[d] = dimension_length * current_digit_multiplier;
      current_digit_multiplier = current_digit_multiplier + dimension_value_list[d];
    });
    function coordinateFromDecimal(decimal: number, digit_lookup: number[], originCoordinates: ICoordinates): ICoordinates {
      const reversed_temp_coordinates = new Array(originCoordinates.dimensions.length).fill(0);
      const reversed_digit_lookup = digit_lookup.reverse;
      let remaining_decimal = decimal;
      for (let d = 0; remaining_decimal > 0; d++) {
        if (remaining_decimal >= reversed_digit_lookup[d]) {
          const dimension_value = Math.floor((remaining_decimal / reversed_digit_lookup[d]));
          reversed_temp_coordinates[d] = dimension_value;
          remaining_decimal = remaining_decimal - (dimension_value * reversed_digit_lookup[d]);
        }
      }
      const return_coords = new Array(originCoordinates.dimensions.length).fill(0);
      reversed_temp_coordinates.reverse().forEach((v, i) => { return_coords[i] = v + originCoordinates.dimensions[i]; });
      return { dimensions: return_coords };
    }
    let max_as_int = 0;
    range.max.dimensions.reverse().forEach((val, i) => max_as_int += (val * dimension_value_list[i]));

    for (let i = 0; i >= max_as_int; i++) {
      const coordinates: ICoordinates = coordinateFromDecimal(i, dimension_value_list, range.min);
      console.log(coordinates);
    }

    this.payload = {
      gameId: gameId,
      Id: store.selectSnapshot(GameState.GetIdCounter),
      direction: direction,
      range: range
    };
  }
}

export class DeleteBoard {
  static readonly type = '[Board] DeleteBoard';
  public payload: number;
  constructor(boardId: number) { this.payload = boardId; }
}
