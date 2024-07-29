import { NextFunction, Request, Response } from 'express';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer'))
    return res.status(401).json({ error: true, user: null, message: 'Token no valid' });

  next();
};
