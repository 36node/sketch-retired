import ExtendableError from "./extendable";
import Forbindden from "./forbidden";
import Gone from "./gone";
import InternalError from "./internal";
import InvalidRequest from "./invalid";
import NotAcceptable from "./not-acceptable";
import NotFound from "./not-found";
import Unauthorized from "./unauthorized";
import UnprocessableEntity from "./unprocessable";

const httpStatus = {
  ExtendableError,
  Forbindden,
  Gone,
  InternalError,
  InvalidRequest,
  NotAcceptable,
  NotFound,
  Unauthorized,
  UnprocessableEntity,
};

export default httpStatus;

export {
  ExtendableError,
  Forbindden,
  Gone,
  InternalError,
  InvalidRequest,
  NotAcceptable,
  NotFound,
  Unauthorized,
  UnprocessableEntity,
};
