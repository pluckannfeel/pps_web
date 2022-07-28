import React, { useState, useEffect, useCallback } from 'react';
import { UserAuthContextProps, StoredTokenProps } from '../store/auth-props';

let logoutTimer: any;

const UserAuthContext = React.createContext<UserAuthContextProps>({
    token: '',
    isAuthenticated: false,
    login: (token: string, duration: number) => {},
    logout: () => {}
    // newAccount: false,
    // setNewAccount: () => {}
});

const calculateRemainingTime = (expirationTime: number): number => {
    const currentTime = new Date().getTime();
    const adjustedExpirationTime = new Date(expirationTime).getTime();
    const remainingTime = adjustedExpirationTime - currentTime;

    return remainingTime;
};

const fetchStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('tokenExpiration');
    if (storedExpirationDate && storedToken) {
        const remainingTime = calculateRemainingTime(+storedExpirationDate);
        if (remainingTime <= 86400) {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            return null;
        }

        return {
            token: storedToken,
            duration: remainingTime
        };
    }
};

interface FCProps {
    children: React.ReactNode;
}

export const UserAuthContextProvider: React.FunctionComponent<FCProps> = ({
    children
}) => {
    const fetchedToken = fetchStoredToken();

    let initialToken: string;
    initialToken = fetchedToken ? fetchedToken.token : '';

    const [token, setToken] = useState(initialToken);

    const isAuthenticated = !!token;
    const logoutHandler = useCallback(() => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        if (logoutTimer) clearTimeout(logoutTimer);
    }, [setToken]);

    const loginHandler = useCallback(
        (token: string, duration: number) => {
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiration', duration.toString());

            const remainingTime = calculateRemainingTime(duration);
            logoutTimer = setTimeout(logoutHandler, remainingTime);
        },
        [setToken, logoutHandler]
    );

    useEffect(() => {
        if (fetchedToken) {
            logoutTimer = setTimeout(logoutHandler, fetchedToken.duration);
        }
    }, [fetchedToken, logoutHandler]);

    const context = {
        token: token,
        isAuthenticated,
        login: loginHandler,
        logout: logoutHandler
        // newAccount: hasNewAccount,
        // setNewAccount: newAccountHandler
    };

    return (
        <UserAuthContext.Provider value={context}>
            {children}
        </UserAuthContext.Provider>
    );
};

export default UserAuthContext;
