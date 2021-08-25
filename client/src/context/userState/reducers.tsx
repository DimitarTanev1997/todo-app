import IUser from "../../models/User.interface";

type AuthState = {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    hasError: boolean;
};

const signUp = (user: IUser, token: string, state: AuthState): AuthState => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));

    return {
        ...state,
        user: user,
        token: token,
        isAuthenticated: true
    };
};

const signIn = (user: IUser, token: string, state: AuthState): AuthState => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));

    return {
        ...state,
        user: user,
        token: token,
        isAuthenticated: true
    };
};

const signOut = (state: AuthState): AuthState => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false
    };
};

const setLoading = (state: AuthState): AuthState => {
    
    return {
        ...state,
        isLoading: !state.isLoading
    };
}; 

const setError = (state: AuthState): AuthState => {
    
    return {
        ...state,
        hasError: !state.hasError
    };
}; 


type ReducerAction =
    | { type: 'SIGNUP', payload: { user: IUser, token: string } }
    | { type: 'SIGNIN', payload: { user: IUser, token: string } }
    | { type: 'SIGNOUT' }
    | { type: 'SET_LOADING' }
    | { type: 'SET_ERROR' }
    ;

const authReducer = (state: AuthState, action: ReducerAction): AuthState => {
    switch (action.type) {
        case 'SIGNUP': {
            return signUp(action.payload.user, action.payload.token, state);
        }

        case 'SIGNIN': {
            return signIn(action.payload.user, action.payload.token, state);
        }

        case 'SIGNOUT': {
            return signOut(state);
        }

        case 'SET_LOADING': {
            return setLoading(state);
        }

        case 'SET_ERROR': {
            return setError(state);
        }

        default: 
            return state;
    }
};


export default authReducer;