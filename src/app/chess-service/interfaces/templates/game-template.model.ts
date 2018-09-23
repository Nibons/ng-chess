import { IOptionsTemplate } from 'src/app/chess-service/interfaces/templates/options-template.model';
import { IBoardTemplate } from 'src/app/chess-service/interfaces/templates/board-template.model';
import { IPlayerTemplate } from 'src/app/chess-service/interfaces/templates/player-template.model';
import { IPieceTemplate } from 'src/app/chess-service/interfaces/templates/piece-template.model';

export interface IGameTemplate {
  name: string;
  options: IOptionsTemplate;
  board: IBoardTemplate;
  players: IPlayerTemplate;
  pieces: IPieceTemplate;
}
