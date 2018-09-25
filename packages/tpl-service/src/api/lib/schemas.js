import { makesure } from "./utils";

export class Pet {
  /** @type { Number } */
  id;

  /** @type { String } */
  name;

  /** @type { String } */
  tag;

  constructor(obj) {
    this.id = makesure("id", obj.id, String, true);
    this.name = makesure("name", obj.name, String, true);
    this.tag = makesure("tag", obj.tag, String);
  }
}
export class NewPet {
  /** @type { String } */
  name;

  /** @type { String } */
  tag;

  constructor(obj) {
    this.name = makesure("name", obj.name, String, true);
    this.tag = makesure("tag", obj.tag, String);
  }
}
export class Error {
  /** @type { String } */
  code;

  /** @type { String } */
  message;

  constructor(obj) {
    this.code = makesure("code", obj.code, String, true);
    this.message = makesure("message", obj.message, String, true);
  }
}
