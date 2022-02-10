import AppError from "../../../errors/AppErrors";
import { NextFunction, Request, Response } from "express";

const ErrorHandler = (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction
): Response | void => {
  if (err instanceof AppError) {
    console.log("Handler do AppError");
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);
  return response.status(500).json({
    status: "error",
    message: `Internal server error -> ${err.message}`,
  });
};

export default ErrorHandler;
