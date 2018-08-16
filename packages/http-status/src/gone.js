import ExtendableError from "./extendable";

export default class Gone extends ExtendableError {
  statusCode = 410;

  constructor(message = "Resource is gone") {
    super(message);
  }
}
