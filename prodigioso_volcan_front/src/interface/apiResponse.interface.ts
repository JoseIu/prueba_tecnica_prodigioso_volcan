export interface APIResponseInterface {
  error: boolean;
  user: User;
  message: string;
}

export interface User {
  iss: string;
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  picture: string;
  _id: string;
}
