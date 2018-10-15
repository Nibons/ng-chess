
import { ID } from '@datorama/akita';
import { Gamesave } from 'src/app/chess-service/state/gamesave';

let id = 0;

export interface Game {
  id: ID;
  name: string;
  template: Gamesave;
}

export function createGame(params: Gamesave, name: string): Game {
  return {
    id: id++,
    name: name, // TODO fix this, cus this information needs a name
    template: params
  };
}
