import { Request, Response, NextFunction } from 'express';

//Error Middleware

export const errorMiddleWare = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send({ Error: `${error}` });
  } catch (error) {
    next(error);
  }
};
