/**
 * suppose we have a protocol
 * data start with ##, end whit ##
 *
 * #  #  {head} {month} {date} {hour} {minute} {second} #  #
 * 23 23 01     09      12     08     08       20       23 23
 *
 * send back date
 * hello 09-12 08:08:20
 */

export default class Protocol {
  /**
   * parse buffer to request
   *
   * @param {*} buf
   */
  parse(buf) {
    if (buf.length !== 10) {
      throw new Error("package length wrong");
    }

    if (buf[0] !== 0x23 && buf[1] !== 0x23) {
      throw new Error("pcakge should start with ##");
    }

    if (buf[8] !== 0x23 && buf[9] !== 0x23) {
      throw new Error("pcakge should end with ##");
    }

    const header = {
      command: buf[2]
    };

    const body = {
      month: buf[3],
      date: buf[4],
      hour: buf[5],
      minute: buf[6],
      second: buf[7]
    };

    return { header, body };
  }

  /**
   * build response data
   *
   * @param {Object} body response body
   */
  build(body) {
    return `time: ${body.month}-${body.date}-${body.hour}-${body.minute}-${body.second}`;
  }
}
