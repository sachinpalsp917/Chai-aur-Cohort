import { OK } from "../constants/statusCode";
import { apiResponse } from "../utils/apiResponse";
import catchError from "../utils/catchError";

export const healthCheckController = catchError(async (req, res) => {
  res.status(OK).json(new apiResponse(OK, "Server is running"));
});
