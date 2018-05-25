import { Guid } from 'guid-typescript';
export abstract class ChessObject {
  readonly id: Guid = Guid.create();
}

