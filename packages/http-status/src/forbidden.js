import ExtendableError from "./extendable";

export default class Forbidden extends ExtendableError {
  statusCode = 403;

  constructor(message = "Request is forbidden") {
    super(message);
  }
}
