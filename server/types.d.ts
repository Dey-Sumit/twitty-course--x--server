declare namespace Express {
  export interface Request {
    user: IUser;
    file: any;
  }
  export interface Response {
    user: any;
  }
}
