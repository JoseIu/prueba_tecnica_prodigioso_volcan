import express from 'express';
import { loginGoogleController, loginGoogleV2Controller } from '../controller/login.controller';
import { checkToken } from '../middleware/checkToken';

export const loginRouter = express.Router();

loginRouter.post('/login-google', checkToken, loginGoogleController);

loginRouter.post('/login-googlev2', loginGoogleV2Controller);
