import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Group,
    Button,
    Center,
    Paper,
    Text,
    useMantineColorScheme
} from '@mantine/core';

import { headerTitleStyleProp } from './CssHelpers';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { LangContextProps } from '../store/lang-props';
import LangContext from '../store/lang-context';
import { languageContent } from '../store/languageContent';

const UserLoginHeadline = () => {
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    // const navigate = useNavigate();

    // language
    const { language: selectedLanguage } = useContext(LangContext) as LangContextProps;

    let langSetup = {
        loginHeadline:selectedLanguage === 'en' ? languageContent.en.loginHeadline : languageContent.jp.loginHeadline,
        loginSubHeadline:selectedLanguage === 'en' ? languageContent.en.loginSubHeadline : languageContent.jp.loginSubHeadline,
        loginButtonLabel:selectedLanguage === 'en' ? languageContent.en.loginCreateAccountLink1 : languageContent.jp.loginCreateAccountLink1,
    };


    return (
        <Center>
            <Paper
                sx={{
                    backgroundColor: 'transparent'
                }}
            >
                <Text
                    align="center"
                    color={dark ? '#F9F7F7' : '#112D4E'}
                    sx={headerTitleStyleProp}
                >
                    {langSetup.loginHeadline}
                </Text>
                <Text align="center" m="xs">
                    {langSetup.loginSubHeadline}
                </Text>

                <Group position="center">
                    <Button<typeof Link>
                        size="lg"
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan' }}
                        component={Link}
                        to="/register"
                    >
                        {langSetup.loginButtonLabel}
                    </Button>
                </Group>
            </Paper>
        </Center>
    );
};

export default UserLoginHeadline;
