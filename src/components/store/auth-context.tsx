import React, { useState, useEffect, useCallback } from 'react';
import { UserAuthContextProps, StoredTokenProps } from '../store/auth-props';

let logoutTimer: any;

const UserAuthContext = React.createContext<UserAuthContextProps | null>({
    token: '',
    isAuthenticated: false,
    login: (token: string, duration: number) => {},
    logout: () => {}
    // newAccount: false,
    // setNewAccount: () => {}
});

const calculateRemainingTime = (expirationTime: number): number => {
    const adjustedExpirationTime = new Date(expirationTime).getTime();
    const remainingTime = adjustedExpirationTime - Date.now();
    return remainingTime > 0 ? remainingTime : 0;
};

const fetchStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('tokenExpTime');

    if (storedExpirationDate && storedToken) {
        const remainingTime = calculateRemainingTime(
            new Date(storedExpirationDate).getTime()
        );

        if (remainingTime <= 86400) {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpTime');
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
    // this will display notification to the user which just registered
    // const [hasNewAccount, setHasNewAccount] = useState<boolean>(false);

    // if this is called means that new account is created, will then display a notification message in the UI
    // const newAccountHandler = useCallback(() => {
    //     setHasNewAccount(true);

    //     setTimeout(function () {
    //         if (hasNewAccount) {
    //             setHasNewAccount(false);
    //         }
    //     }, 5000);
    // }, [setHasNewAccount, hasNewAccount]);

    const FetchedToken = fetchStoredToken();

    let initialToken = FetchedToken ? FetchedToken.token : '';

    const [token, setToken] = useState(initialToken);

    const isAuthenticated = !!token;

    const logoutHandler = useCallback(() => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        console.log('i was logged out');
        if (logoutTimer) clearTimeout(logoutTimer);
    }, [setToken]);

    const loginHandler = useCallback(
        (token: string, duration: number) => {
            // console.log(token);
            // console.log(duration);
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiration', duration.toString());

            const remainingTime = calculateRemainingTime(duration);
            logoutTimer = setTimeout(logoutHandler, remainingTime);
        },
        [setToken, logoutHandler]
    );

    useEffect(() => {
        const storedToken = fetchStoredToken();
        if (storedToken) {
            loginHandler(storedToken.token, storedToken.duration);
        }
    }, [loginHandler]);

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
