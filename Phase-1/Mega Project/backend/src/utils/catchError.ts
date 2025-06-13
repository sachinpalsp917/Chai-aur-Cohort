import { NextFunction, Request, Response } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

// const catchError =
//   (controller: AsyncController): AsyncController =>
//   async (req, res, next) => {
//     try {
//       await controller(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };

// export default catchError;

export function asyncHandler(requestHandler: AsyncController) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(requestHandler(req, res, next)).catch(function (err) {
      next(err);
    });
  };
}
