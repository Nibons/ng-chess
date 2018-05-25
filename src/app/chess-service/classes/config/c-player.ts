import { EPlayerType } from '@chess/eplayer-type.enum';

export class CPlayer {
  readonly name: string;
  readonly color: string;
  readonly playerId: number;
  isCurrentTurn: boolean;
  playerType: EPlayerType;
}
