import axios, { AxiosResponse } from 'axios';
import React, { useReducer, useContext, useEffect } from 'react';
import IUser from '../../models/User.interface';
import authReducer from './reducers';
import decodeToken from '../../utils/jwtDecode';
import JWT from '../../models/JWT.interface';

type ContextType = {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasError: boolean;
  signUp: (authInfo: AuthInfo) => void;
  signIn: (authInfo: AuthInfo) => void;
  signOut: () => void;
  checkToken: () => void;
};

type AuthInfo = {
  username: string;
  password: string;
  email?: string;
};

type Props = {
  children: React.ReactNode;
};

const AuthContext = React.createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    hasError: false,
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const tokenObj = localStorage.getItem('token');
    let localToken;

    if (tokenObj) {
      localToken = JSON.parse(tokenObj);
    }

    if (localToken) {
      const token: JWT | null = decodeToken(localToken);

      if (Date.now() >= token!.exp * 1000) {
        dispatch({ type: 'SIGNOUT' });
      } else {
        dispatch({
          type: 'SIGNIN',
          payload: { user: token!.user, token: localToken },
        });
      }
    }
  }, []);

  const checkToken = (): void => {
    const localeToken = localStorage.getItem('token');

    if (localeToken) {
      const token = decodeToken(localeToken);
    }
  };

  const signUp = (authInfo: AuthInfo): void => {
    dispatch({ type: 'SET_LOADING' });

    axios
      .post('/api/auth/signUp', authInfo)
      .then((response: AxiosResponse<{ token: string }>) => {
        const { token } = response.data;
        const jwtDecoded: JWT | null = decodeToken(token);
        const { user } = jwtDecoded!;

        dispatch({ type: 'SIGNUP', payload: { user, token } });
        dispatch({ type: 'SET_LOADING' });

        // axios.get('/api/auth/verify', { headers: {"Authorization" : `Bearer ${token}`} })
        //     .then((response: AxiosResponse) => {
        //     })
      })
      .catch((err) => {
        dispatch({ type: 'SET_LOADING' });
        dispatch({ type: 'SET_ERROR' });
        console.log(err);
      });
  };

  const signIn = (authInfo: AuthInfo): void => {
    dispatch({ type: 'SET_LOADING' });

    axios
      .post('/api/auth/signIn', authInfo)
      .then((response: AxiosResponse<{ token: string }>) => {
        const { token } = response.data;
        const jwtDecoded: JWT | null = decodeToken(token);
        const { user } = jwtDecoded!;

        dispatch({ type: 'SIGNIN', payload: { user, token } });
        dispatch({ type: 'SET_LOADING' });

        // axios.get('/api/auth/verify', { headers: {"Authorization" : `Bearer ${token}`} })
        //     .then((response: AxiosResponse) => {
        //     })
      })
      .catch((err) => {
        dispatch({ type: 'SET_LOADING' });
        dispatch({ type: 'SET_ERROR' });
        console.log(err);
      });
  };

  const signOut = (): void => {
    dispatch({ type: 'SIGNOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        isAuthenticated: authState.isAuthenticated,
        isLoading: authState.isLoading,
        hasError: false,
        signUp,
        signIn,
        signOut,
        checkToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): ContextType | undefined =>
  useContext(AuthContext);
export default AuthProvider;
