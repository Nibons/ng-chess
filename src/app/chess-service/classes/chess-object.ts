import { Guid } from "@chess/guid";

export abstract class ChessObject {
  readonly id: Guid = Guid.newGuid();

}

