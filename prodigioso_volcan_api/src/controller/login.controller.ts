import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { jwtDecode } from 'jwt-decode';
import { UserInterface } from '../interfaces/user.interface';
import { User } from '../model/user.model';
import { catchedAsyc } from '../utils/catchAsyc';
import { ErrorApi } from '../utils/erroApi';
import { responseApi } from '../utils/responseApi';

const oAuthClient = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'postmessage');

const loginGoogleController = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  const token = authorization!.split(' ')[1];
  const tokedDecoded = jwtDecode(token);
  const userDataByToken = tokedDecoded as UserInterface;

  const existUser = await User.findOne({ sub: userDataByToken.sub });

  //If not exit, create the user
  if (!existUser) {
    const newUser = new User(userDataByToken);
    const newUserSaved = await newUser.save();
    return responseApi(res, 201, {
      error: false,
      user: newUserSaved,
      message: 'Usuario logeado correctamente'
    });
  }
  return responseApi(res, 200, { user: existUser, message: 'Usuario logeado correctamente' });
};

const loginGoogleV2Controller = async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) throw new ErrorApi('Code is required', 400);

  const { tokens } = await oAuthClient.getToken(code);
  const { id_token } = tokens;
  const tokedDecoded = jwtDecode(id_token!);

  const userDataByToken = tokedDecoded as UserInterface;
  const existUser = await User.findOne({ sub: userDataByToken.sub });

  if (!existUser) {
    const newUser = new User(userDataByToken);
    const newUserSaved = await newUser.save();

    return responseApi(res, 201, { user: newUserSaved, message: 'Usuario logeado correctamente' });
  }
  return responseApi(res, 200, { user: existUser, message: 'Usuario logeado correctamente' });
};

export default {
  loginGoogleController: catchedAsyc(loginGoogleController),
  loginGoogleV2Controller: catchedAsyc(loginGoogleV2Controller)
};
