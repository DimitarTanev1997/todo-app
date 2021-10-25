import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/userState/authContext';
import './AuthForm.css';
import { ReactComponent as MainImage } from '../../../assets/main-image.svg';
import Button from '../../Buttons/Button/Button';

type AuthInfo = {
  username: string;
  password: string;
  email?: string;
};

type AuthFormProps = {
  type: 'Create Account' | 'Login';
};

const AuthForm = ({ type }: AuthFormProps): JSX.Element => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    username: '',
    password: '',
  });

  const { signIn, signUp, isLoading } = useAuthContext()!;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setAuthInfo((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value,
      };
    });
  };

  const handleFormSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (type === 'Login') {
      signIn(authInfo);
    } else if (type === 'Create Account') {
      signUp(authInfo);
    }
  };

  return (
    <div className="auth-form">
      <MainImage />
      <form onSubmit={handleFormSubmit}>
        <h2>{type}</h2>
        {type === 'Create Account' && (
          <input
            ref={usernameRef}
            id="email"
            type="email"
            placeholder="Email..."
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(event)
            }
            value={authInfo.email}
            disabled={isLoading}
            required
          />
        )}
        <input
          ref={usernameRef}
          id="username"
          type="text"
          placeholder="Username..."
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event)
          }
          value={authInfo.username}
          disabled={isLoading}
          required
        />

        <input
          ref={passwordRef}
          id="password"
          type="password"
          placeholder="Password..."
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event)
          }
          value={authInfo.password}
          disabled={isLoading}
          required
        />

        <span className="FormMessage" />
        <Button
          typeOption="button"
          styleOption="button"
          spinner={isLoading}
          disabled={isLoading}
          buttonType="submit"
          callback={handleFormSubmit}
          text="Continue"
        />
      </form>

      {type === 'Login' ? (
        <Link to="/auth/signup">
          No account? <span className="link">Sign up</span>
        </Link>
      ) : (
        <Link to="/auth/signin">
          Already have an account? <span className="link">Login</span>
        </Link>
      )}
    </div>
  );
};

export default AuthForm;
