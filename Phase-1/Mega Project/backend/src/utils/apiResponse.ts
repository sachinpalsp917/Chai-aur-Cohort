import { HttpStatusCode } from "../constants/statusCode";

class apiResponse {
  constructor(
    public statusCode: HttpStatusCode,
    public data: any,
    public message: string = "Success",
  ) {}
}

export { apiResponse };
