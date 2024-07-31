import { Response } from 'express';

export const responseApi = (res: Response, statusCode: number, data?: unknown, message?: string) => {
  if (!message) {
    res.status(statusCode).json({
      error: false,
      data
    });
    return;
  }
  res.status(statusCode).json({
    error: false,
    message
  });
};
