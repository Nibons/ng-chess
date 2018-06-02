export class Guid {
  private constructor(private _guid = Guid.newGuid()) { }
  public toString() {
    return this._guid;
  }
  static newGuid() {
    const _string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return new Guid(_string);
  }
}
