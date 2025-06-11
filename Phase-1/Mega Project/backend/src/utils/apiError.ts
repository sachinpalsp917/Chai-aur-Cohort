import { HttpStatusCode } from "../constants/statusCode";

class apiError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public error: string[] = [],
    public stack?: string,
  ) {
    super(message);
    this.name = "apiError";

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace?.(this, apiError);
    }
  }
}

export { apiError };
