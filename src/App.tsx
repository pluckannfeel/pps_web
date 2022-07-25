import React, { useState } from 'react';

import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme
} from '@mantine/core';

import { useHotkeys, useLocalStorage } from '@mantine/hooks';

// react router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import UserLogin from './components/Accounts/UserLogin';
import UserRegister from './components/Accounts/UserRegister';
import Main from './components/Dashboard/Main';

// Auth context
import { UserAuthContextProvider } from './components/store/auth-context';
import { NotificationsProvider } from '@mantine/notifications';

const App: React.FC = () => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme,
                    colors: {
                        pps_darkblue: ['#112D4E'],
                        pps_lightblue: ['#3F72AF'],
                        pps_white: ['#F9F7F7'],
                        pps_gray: ['#DBE2EF']
                    },

                    black: '112D4E',
                    primaryColor: 'orange'
                }}
            >
                <NotificationsProvider>
                    <UserAuthContextProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<UserLogin />} />
                                <Route
                                    path="/register"
                                    element={<UserRegister />}
                                />
                                <Route path="/dashboard" element={<Main />} />
                                <Route
                                    path="*"
                                    element={<Navigate to="/" replace />}
                                />
                            </Routes>
                        </BrowserRouter>
                    </UserAuthContextProvider>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default App;
