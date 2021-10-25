import jwtDecode from 'jwt-decode';
import JWT from '../models/JWT.interface';

const decodeToken = (token: string): JWT | null => {
  if (token) {
    return jwtDecode<JWT | null>(token);
  }

  return null;
};

export default decodeToken;
