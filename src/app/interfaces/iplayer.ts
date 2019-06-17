import { IPiece } from 'src/app/interfaces/ipiece';

export interface IPlayer {
  IsCurrentTurn: boolean;
  playerNumber: number;
  pieces: IPiece[];
}
