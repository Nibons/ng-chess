
import { ID } from '@datorama/akita';
import { Gamesave } from 'src/app/chess-service/state/gamesave';

let id = 0;

export interface Game {
  id: ID;
  name: string;
  board: ID[];
  template: Gamesave;
}

export function createGame(params: Gamesave) {
  return {
    id: id++,
    name: '', // TODO fix this, cus this information needs a name
    board: [],
    template: params
  } as Game;
}
