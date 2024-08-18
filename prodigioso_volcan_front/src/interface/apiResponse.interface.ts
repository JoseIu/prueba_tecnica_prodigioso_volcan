export interface APIResponseInterface {
  error: boolean;
  data: Data;
}

export interface Data {
  user: User;
  message: string;
}

export interface User {
  _id: string;
  iss: string;
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  picture: string;
}
