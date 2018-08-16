import ExtendableError from "./extendable";

export default class InternalError extends ExtendableError {
  statusCode = 500;

  constructor(message = "Internal server error") {
    super(message);
  }
}
