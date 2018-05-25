import { EPlayerType } from '@chess/eplayer-type.enum';
import { IPlayer } from './../interfaces/iplayer.model';
import { BasePlayer } from '@chess/base-player';
export class Human extends BasePlayer implements IPlayer {
  readonly type: EPlayerType = EPlayerType.human;

}
