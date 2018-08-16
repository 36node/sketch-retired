import ExtendableError from "./extendable";

export default class NotAcceptable extends ExtendableError {
  statusCode = 406;

  constructor(message = "Not acceptable request content") {
    super(message);
  }
}
