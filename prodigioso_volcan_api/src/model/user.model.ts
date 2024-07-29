import mongoose from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

const userModel = new mongoose.Schema<UserInterface>(
  {
    iss: { type: String, required: true },
    sub: { type: String, required: true },
    email: { type: String, required: true },
    email_verified: { type: Boolean, required: true },
    name: { type: String, required: true },
    given_name: { type: String, required: true },
    picture: { type: String, required: true }
  },
  { versionKey: false }
);

export const User = mongoose.model<UserInterface>('User', userModel);
