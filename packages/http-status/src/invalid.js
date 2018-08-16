import ExtendableError from "./extendable";

export default class InvalidRequest extends ExtendableError {
  statusCode = 400;

  constructor(message = "Invalid request") {
    super(message);
  }
}
