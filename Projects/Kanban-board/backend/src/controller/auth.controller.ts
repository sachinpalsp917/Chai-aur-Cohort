import { OK } from "../constants/statusCode";
import { apiResponse } from "../utils/appResponse";
import { catchError } from "../utils/catchError";

export const registerUser = catchError(async (req, res) => {
  res.json(new apiResponse(OK, "registerd"));
});
