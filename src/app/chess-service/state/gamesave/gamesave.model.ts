import { ID } from '@datorama/akita';

let id = 0;

export interface Gamesave {
  id: ID;
}

export function createGamesave(params: Partial<Gamesave>) {
  return {
    id: id++
  } as Gamesave;
}
