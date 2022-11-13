import React, { useState, useContext } from 'react';

import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme
} from '@mantine/core';

import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';

import { UserAuthContextProvider } from './components/store/auth-context';
import { LangContextProvider } from './components/store/lang-context';

import Main from './components/Main';

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
                <NotificationsProvider position="top-right">
                    <UserAuthContextProvider>
                        <LangContextProvider>
                            <Main />
                        </LangContextProvider>
                    </UserAuthContextProvider>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default App;
