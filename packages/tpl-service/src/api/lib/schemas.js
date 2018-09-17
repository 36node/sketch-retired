import { makesure } from "./utils";

export class Response {
  headers: {};
  content;
}

export class Pet {
  /**
   * @type { integer }
   */
  id;

  /**
   * @type { string }
   */
  name;

  /**
   * @type { string }
   */
  tag;

  constructor(obj) {
    this.id = makesure("id", obj.id, "integer", true);
    this.name = makesure("name", obj.name, "string", true);
    this.tag = makesure("tag", obj.tag, "string");
  }
}

export class NewPet {
  /**
   * @type { string }
   */
  name;

  /**
   * @type { string }
   */
  tag;

  constructor(obj) {
    this.name = makesure("name", obj.name, "string", true);
    this.tag = makesure("tag", obj.tag, "string");
  }
}

export class Error {
  /**
   * @type { string }
   */
  code;

  /**
   * @type { string }
   */
  message;

  constructor(obj) {
    this.code = makesure("code", obj.code, "string", true);
    this.message = makesure("message", obj.message, "string", true);
  }
}
