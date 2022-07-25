import React, { useContext } from 'react';
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
// import { useLocation } from 'react-router-dom';

// auth context
// import UserAuthContext from '../store/auth-context';
// import { UserAuthContextProps } from '../store/auth-props';
import { logInFormValues } from './UserProps';

const UserLogin: React.FunctionComponent = () => {
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    // const location = useLocation();
    // const authContext = useContext(UserAuthContext) as UserAuthContextProps;

    const loginHandler = (values: logInFormValues) => {
        console.log(values);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.child}>
                <Group direction="row" spacing="sm" position="left">
                    <ActionIcon
                        variant="outline"
                        color={dark ? 'yellow' : 'blue'}
                        onClick={() => toggleColorScheme()}
                        title="Toggle Color Scheme"
                    >
                        {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                    </ActionIcon>

                    <Button
                        size="xs"
                        variant="outline"
                        color={dark ? 'yellow' : 'blue'}
                        // onClick={() => toggleColorScheme()}
                        title="Toggle Color Scheme"
                        leftIcon={<World />}
                    >
                        {/* {dark ? <Sun size={18} /> : <MoonStars size={18} />} */}
                        {/* <World size={18}/> */}
                        ENG
                    </Button>
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

                    <UserLoginForm onLogin={loginHandler} />
                </SimpleGrid>
            </div>
        </div>
    );
};

export default UserLogin;
