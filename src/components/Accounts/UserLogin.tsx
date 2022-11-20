import React, { useContext, useState } from 'react';
import {
    ActionIcon,
    useMantineColorScheme,
    SimpleGrid,
    Group,
    Text,
    Button,
    Notification
} from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';

import { Sun, MoonStars, World, Check } from 'tabler-icons-react';
import useStyles from '../StylesConfig';
import UserLoginHeadline from './UserLoginHeadline';
import UserLoginForm from './UserLoginForm';
import { LanguagePicker } from '../ui/languagepicker';
// import { useLocation } from 'react-router-dom';


import { LangContextProps } from '../store/lang-props';
import LangContext from '../store/lang-context';


const UserLogin: React.FunctionComponent = () => {
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const userLangCtx = useContext(LangContext);
    // const [language, setLanguage] = useState(userLangCtx.language);
    
    const languageClickHandler = (lang: string) => {
        userLangCtx.setLanguage(lang);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.child}>
                <Group spacing="sm" position="left">
                    <ActionIcon
                        variant="outline"
                        color={dark ? 'yellow' : 'blue'}
                        onClick={() => toggleColorScheme()}
                        title="Toggle Color Scheme"
                    >
                        {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                    </ActionIcon>   
                    
                    <LanguagePicker onClickLanguage={languageClickHandler} />
                </Group>

                <SimpleGrid
                    cols={2}
                    spacing="xs"
                    breakpoints={[
                        { maxWidth: 900, cols: 1 },
                        { maxWidth: 1200, cols: 2 }
                    ]}
                    sx={{ minHeight: '93vh' }}
                >
                    <UserLoginHeadline />
                    <UserLoginForm />
                </SimpleGrid>
            </div>
        </div>
    );
};

export default UserLogin;
