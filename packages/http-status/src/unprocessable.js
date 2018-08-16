import ExtendableError from "./extendable";

export default class UnprocessableEntity extends ExtendableError {
  statusCode = 422;

  constructor(message = "Unprocessable entity") {
    super(message);
  }
}
