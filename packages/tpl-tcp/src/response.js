import only from "only";

/**
 * for example purpose
 * we build response in string format
 * send string back to client
 * usally you should build buffer
 */

export default class Response {
  month = 0;
  date = 1;
  hour = 0;
  minute = 0;
  second = 0;

  constructor({ month, date, hour, minute, second }) {
    this.month = month;
    this.date = date;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  /**
   * Return JSON representation.
   * We only bother showing settings.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return only(this, ["month", "date", "hour", "minute", "second"]);
  }
}
