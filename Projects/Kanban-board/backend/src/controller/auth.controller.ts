import { OK } from "../constants/statusCode";
import { registerSchema } from "../schema/auth.schema";
import { createAccount } from "../services/auth.service";
import { apiResponse } from "../utils/appResponse";
import { catchError } from "../utils/catchError";

export const registerUser = catchError(async (req, res) => {
  //validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  //call service
  //const { user, accessToken, refreshToken } = await createAccount(request);
  //return response
});
