export class DetailError {
  path;
  value;
  type;
  message;
}

export default class ExtendableError extends Error {
  statusCode;
  errors;

  constructor(message = "Extandable error") {
    super(message);

    // extending Error is weird and does not propagate `message`
    Object.defineProperty(this, "message", {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true,
    });

    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    if (Error.hasOwnProperty("captureStackTrace")) {
      Error.captureStackTrace(this, this.constructor);
      return;
    }

    Object.defineProperty(this, "stack", {
      configurable: true,
      enumerable: false,
      value: new Error(message).stack,
      writable: true,
    });
  }

  toJSON() {
    const json = {
      name: this.name,
      message: this.message,
      errors: this.errors,
      stack: this.stack,
    };

    if (!json.errors || json.errors.length === 0) {
      delete json.errors;
    }
    if (process && process.env && process.env.NODE_ENV === "development") {
      delete json.stack;
    }
    return json;
  }
}
