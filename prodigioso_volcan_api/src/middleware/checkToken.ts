import { NextFunction, Request, Response } from 'express';
import { ErrorApi } from '../utils/erroApi';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) throw new ErrorApi('Token is required', 401);

  next();
};
