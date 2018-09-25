export class Guid {

  constructor(private _guid: string) { }

  private static GetPrivateStringGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static newGuid(): Guid {
    const _string = Guid.GetPrivateStringGuid();
    return new Guid(_string);
  }
  static Compare(guid1: Guid, guid2: Guid): boolean {
    return guid1.toString() === guid2.toString();
  }
  public toString() {
    return this._guid;
  }
  public IsEqual(compareGuid: Guid): boolean {
    return this.toString() === compareGuid.toString();
  }
}
