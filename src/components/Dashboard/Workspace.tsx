import React, { useState, useEffect, useContext } from 'react';
import { AppShell, Footer, Text, useMantineTheme } from '@mantine/core';
import MainNavbar from './WorskpaceNavbar';

import { useNavigate } from 'react-router-dom';
// import MainHeader from './MainHeader';

import { UserAuthContextProps } from '../store/auth-props';
import userAuthContext from '../store/auth-context';

import jwtDecode, { JwtPayload } from 'jwt-decode';
import Dashboard from './Dashboard';
import Profile from './Profile';

const Workspace: React.FC = () => {
    const userAuthCtx = useContext(userAuthContext) as UserAuthContextProps;
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [activeUser, setActiveUser] = useState<string | null>(null);
    let navigate = useNavigate();

    const activeTab: string = userAuthCtx.activeTab;

    // use to load token user credentials and tab state = only on first load!
    useEffect(() => {
        // navigate('/dashboard');

        if (userAuthCtx.token) {
            const { username } = jwtDecode<{ username: string }>(
                userAuthCtx.token
            );

            setActiveUser(username);

            // for initial tabf
            userAuthCtx.setActiveTab('dashboard');
        }
    }, []);

    const logoutHandler = () => {
        userAuthCtx.logout();

        navigate('/', { replace: true });
    };

    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0]
                }
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={<MainNavbar onLogout={logoutHandler} opened={opened} />}
            // aside={
            //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            //         <Aside
            //             p="md"
            //             hiddenBreakpoint="sm"
            //             width={{ sm: 200, lg: 300 }}
            //         >
            //             <Text>Application sidebar</Text>
            //         </Aside>
            //     </MediaQuery>
            // }
            footer={
                <Footer height={60} p="md">
                    Application Taskbar
                </Footer>
            }
            // header={
            //     <Header height={60} p="md">
            //         <div
            //             style={{
            //                 display: 'flex',
            //                 alignItems: 'center',
            //                 height: '100%'
            //             }}
            //         >
            //             <MediaQuery
            //                 largerThan="sm"
            //                 styles={{ display: 'none' }}
            //             >
            //                 <Burger
            //                     opened={opened}
            //                     onClick={() => setOpened((o) => !o)}
            //                     size="sm"
            //                     color={theme.colors.gray[6]}
            //                     mr="xl"
            //                 />
            //             </MediaQuery>

            //             <Text>PPS</Text>
            //         </div>
            //     </Header>
            // }
        >
            {activeTab === 'dashboard' && <Dashboard user={activeUser} />}
            {activeTab === 'profile' && <Profile user={activeUser} />}
        </AppShell>
    );
};

export default Workspace;
