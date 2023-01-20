import React, { useState, useEffect, useContext } from 'react';
import {
    AppShell,
    ActionIcon,
    Footer,
    Group,
    Text,
    useMantineTheme,
    useMantineColorScheme
} from '@mantine/core';
import MainNavbar from './WorskpaceNavbar';

import { useNavigate } from 'react-router-dom';
// import MainHeader from './MainHeader';

import { UserAuthContextProps } from '../store/auth-props';
import UserAuthContext from '../store/auth-context';

import { Sun, MoonStars, World, Check } from 'tabler-icons-react';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import Dashboard from './Dashboard';
import Applications from './Application/Applications';
import Profile from './Profile/Profile';
import Companies from './Company/Companies';
import ChangePassword from './Settings/ChangePassword';

// language
import { LangContextProps } from '../store/lang-props';
import LangContext from '../store/lang-context';
import { LanguagePicker } from '../ui/languagepicker';
import useStyles from '../StylesConfig';
import Contracts from './Contracts/Contracts';

const Workspace: React.FC = () => {
    const userAuthCtx = useContext(UserAuthContext);
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [activeUser, setActiveUser] = useState<string | null>(null);
    let navigate = useNavigate();

    const activeTab: string = userAuthCtx.activeTab;
    const userLangCtx = useContext(LangContext);

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

    // theme color
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    // language
    const languageClickHandler = (lang: string) => {
        userLangCtx.setLanguage(lang);
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
            // navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
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
                    <Group position="right">
                        <ActionIcon
                            variant="outline"
                            color={dark ? 'yellow' : 'blue'}
                            onClick={() => toggleColorScheme()}
                            title="Toggle Color Scheme"
                        >
                            {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                        </ActionIcon>

                        <LanguagePicker
                            onClickLanguage={languageClickHandler}
                        />
                    </Group>
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
            {activeTab === 'company' && <Companies user={activeUser} />}
            {activeTab === 'profile' && <Profile user={activeUser} />}
            {activeTab === 'applications' && <Applications user={activeUser} />}
            {activeTab === 'contracts' && <Contracts user={activeUser} />}
            {activeTab === 'change_password' && (
                <ChangePassword user={activeUser} />
            )}
        </AppShell>
    );
};

export default Workspace;
