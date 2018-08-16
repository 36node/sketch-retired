import ExtendableError from "./extendable";

export default class NotFound extends ExtendableError {
  statusCode = 404;

  constructor(message = "Resource not found") {
    super(message);
  }
}
