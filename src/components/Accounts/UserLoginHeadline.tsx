import React from 'react';
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

const UserLoginHeadline = () => {
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    // const navigate = useNavigate();

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
                    Polo Processing <br /> System
                </Text>
                <Text align="center" m="xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.{' '}
                    <br />
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                </Text>

                <Group position="center">
                    <Button<typeof Link>
                        size="lg"
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan' }}
                        component={Link}
                        to="/register"
                    >
                        Create an Account
                    </Button>
                </Group>
            </Paper>
        </Center>
    );
};

export default UserLoginHeadline;
