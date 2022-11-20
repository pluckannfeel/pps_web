import React, { useContext } from 'react';
import {
    ActionIcon,
    CloseButton,
    Group,
    Button,
    Container,
    Text
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'tabler-icons-react';

import useStyles from '../StylesConfig';
import UserRegisterForm from './UserRegisterForm';

// load overlay
import CustomLoadOverlay from '../ui/LoadOverlay';

// user props
import { registerFormProps } from './UserProps';

// custom hook http request
import useHttpRequest from '../hooks/use-httprequest';

// React Router
import { useNavigate } from 'react-router-dom';

// user auth
import { UserAuthContextProps } from '../store/auth-props';
import UserAuthContext from '../store/auth-context';
import { showNotification } from '@mantine/notifications';
import { CheckIcon } from '@radix-ui/react-icons';

const UserRegister = () => {
    const authCtx = useContext(UserAuthContext) as UserAuthContextProps;

    const navigate = useNavigate();

    const { classes } = useStyles();
    const {
        loading,
        error,
        sendRequest: sendUserRegistration
    } = useHttpRequest();

    const handleUserRegister = (values: registerFormProps) => {
        sendUserRegistration(
            {
                url: 'http://localhost:8000/users/register',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    username: values.email,
                    birth_date: `${values.year}-${values.month}-${values.day}`,
                    email: values.email,
                    phone: values.phone,
                    password_hash: values.password,
                    confirm_password: values.password
                }
            },
            (data) => {
                // console.log(data);
                navigate('/', { replace: false, state: { success: data } });

                // authCtx.setNewAccount();

                showNotification({
                    id: 'account-created',
                    title: 'Successfully Registered.',
                    message: 'Your account has been created.',
                    color: 'green',
                    autoClose: 5000,
                    icon: <CheckIcon />
                });

                
            }
        );

        if (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            {loading && <CustomLoadOverlay />}
            {/* <Text variant="text">{error}</Text> */}
            <div className={classes.wrapper}>
                <div className={classes.child}>
                    <Container sx={{ minHeight: '95vh' }}>
                        <Group position="left">
                            <Button<typeof Link>
                                leftIcon={<ArrowLeft size={20} />}
                                p="xs"
                                title="Close Home"
                                // size=""
                                variant="outline"
                                // iconSize={20}
                                component={Link}
                                to="/"
                            >
                                Back
                            </Button>
                        </Group>
                        <UserRegisterForm onRegisterUser={handleUserRegister} />
                    </Container>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserRegister;
