import ExtendableError from "./extendable";

export default class Unauthorized extends ExtendableError {
  statusCode = 401;

  constructor(message = "Unauthorized request") {
    super(message);
  }
}
