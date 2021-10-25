import IUser from './User.interface';

export default interface JWT {
  user: IUser;
  iat: number;
  exp: number;
}
