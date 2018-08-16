import only from "only";

/**
 * suppose we have a protocol
 * data start with ##, end whit ##
 *
 * #  #  {month} {date} {hour} {minute} {second} #  #
 * 23 23 09      12     08     08       20       23 23
 */

export default class Request {
  header;
  body;

  constructor({ header, body }) {
    this.header = header;
    this.body = body;
  }

  /**
   * Return JSON representation.
   * We only bother showing settings.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return only(this, ["header", "body"]);
  }
}
