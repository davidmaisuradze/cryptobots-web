export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  token?: IToken;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
