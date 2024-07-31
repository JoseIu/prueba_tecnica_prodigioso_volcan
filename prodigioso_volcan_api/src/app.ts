import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';

import { conectDB } from './config/conectDB';
import { loginRouter } from './routes/login.routes';
import { ErrorApi } from './utils/erroApi';

conectDB();
export const expressApp = express();

const dominPermit = process.env.FRONT_URL;

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow: boolean) => void) {
    if (!origin || dominPermit!.indexOf(origin) !== -1) return callback(null, true);
    else callback(new Error('No permitido por CORS'), false);
  }
};
expressApp.use(cors(corsOptions));
expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use(loginRouter);

expressApp.use((err: Error, req: Request, res: Response) => {
  if (err instanceof ErrorApi) {
    return res.status(err.statusCode).json({
      error: true,
      message: err.message
    });
  } else {
    res.status(500).json({
      error: true,
      message: err.message
    });
  }
});
