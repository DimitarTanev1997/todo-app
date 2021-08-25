import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAuthContext } from '../../../context/userState/authContext';
import './AuthForm.css';
import { Link } from 'react-router-dom';

type AuthInfo = {
    username: string;
    password: string;
    email?: string;
}

type AuthFormProps = {
    type: 'signUp' | 'signIn'
}

const AuthForm = ({ type }: AuthFormProps) => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [authInfo, setAuthInfo] = useState<AuthInfo>({
        username: '',
        password: ''
    });

    const { signIn, signUp, isLoaading, hasError } = useAuthContext()!;
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setAuthInfo(prevState => {
            return {
                ...prevState,
                [event.target.id]: event.target.value
            }
        })
    };

    const handleFormSubmit = (event: FormEvent): void => {
        event.preventDefault();

        if (type === 'signIn') {
            signIn(authInfo);
        } else if (type === 'signUp') {
            signUp(authInfo);
        }
    };

    return (
        <div className="AuthFormContainer">
            <form onSubmit={handleFormSubmit} className="AuthForm">
            <h1>{type}</h1>
            {type === 'signUp' && (
                <input
                ref={usernameRef}
                id="email"
                type="email"
                placeholder="Email"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                value={authInfo.email}
                disabled={isLoaading}
                required
            />
            )}
            <input
                ref={usernameRef}
                id="username"
                type="text"
                placeholder="Username"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                value={authInfo.username}
                disabled={isLoaading}
                required
            />

            <input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="Password"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                value={authInfo.password}
                disabled={isLoaading}
                required
            />

            <span className="FormMessage"></span>

            <button disabled={isLoaading}>{type}</button>
            </form>

            {type === 'signIn' ?
                <Link to="/auth/signup">No account? Sign up here.</Link>
                : 
                <Link to="/auth/signin">Already have an account? Sign in here.</Link>
            }
        </div>
    )
}

export default AuthForm;
