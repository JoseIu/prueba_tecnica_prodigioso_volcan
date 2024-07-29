import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { jwtDecode } from 'jwt-decode';
import { UserInterface } from '../interfaces/user.interface';
import { User } from '../model/user.model';

const oAuthClient = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'postmessage');

export const loginGoogleController = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  const token = authorization!.split(' ')[1];
  const tokedDecoded = jwtDecode(token);
  const userDataByToken = tokedDecoded as UserInterface;

  const existUser = await User.findOne({ sub: userDataByToken.sub });

  //If not exit, create the user
  if (!existUser) {
    try {
      const newUser = new User(userDataByToken);
      const newUserSaved = await newUser.save();
      return res.status(201).json({ error: false, user: newUserSaved, message: 'Usuario logeado correctamente' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, user: null, message: 'Internal Server Error' });
    }
  }

  return res.status(200).json({ error: false, user: existUser, message: 'Usuario logeado correctamente' });
};

export const loginGoogleV2Controller = async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      error: true,
      message: 'Code is required'
    });
  }

  try {
    const { tokens } = await oAuthClient.getToken(code);
    const { id_token } = tokens;
    const tokedDecoded = jwtDecode(id_token!);

    const userDataByToken = tokedDecoded as UserInterface;
    const existUser = await User.findOne({ sub: userDataByToken.sub });

    if (!existUser) {
      try {
        const newUser = new User(userDataByToken);
        const newUserSaved = await newUser.save();
        return res
          .status(201)
          .json({ error: false, user: newUserSaved, message: 'Usuario logeado correctamente' });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, user: null, message: 'Internal Server Error' });
      }
    }
    res.status(200).json({ error: false, user: existUser, message: 'Usuario logeado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: true, message: 'Token or ID invalid' });
  }
};
