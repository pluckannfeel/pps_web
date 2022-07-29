import React, { useContext, Fragment } from 'react';

// react router
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from 'react-router-dom';

import UserLogin from './Accounts/UserLogin';
import UserRegister from './Accounts/UserRegister';
import UserRegsister from './Accounts/UserRegister';
import Workspace from './Dashboard/Workspace';

// Auth context
import UserAuthContext from './store/auth-context';
import { UserAuthContextProps } from './store/auth-props';

function useUserAuth() {
    return useContext(UserAuthContext) as UserAuthContextProps;
}

interface BasicProps {
    children: JSX.Element;
}

// this will be consist of react router's navigation and user auth context
const Main: React.FunctionComponent = () => {
    const userAuth = useUserAuth();
    return (
        <Fragment>
            {/* {userAuth.isAuthenticated ? 'loggedin' : 'loggedout'} */}
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={userAuth.isAuthenticated ? <Workspace />: <UserLogin />}
                    />
                    <Route path="/register" element={<UserRegister />} />

                    <Route
                        path="/dashboard"
                        element={
                            <AuthMixin>
                                <Workspace />
                            </AuthMixin>
                        }
                    />

                    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};

const AuthMixin = ({ children }: BasicProps) => {
    const userAuth = useUserAuth();
    let location = useLocation();

    // redirects to login page if user is not authenticated
    if (!userAuth.isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default Main;
