import { OK } from "../constants/statusCode";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/catchError";

export const healthCheckController = asyncHandler(async (req, res) => {
  res.status(OK).json(new apiResponse(OK, { message: "Server is running" }));
});
