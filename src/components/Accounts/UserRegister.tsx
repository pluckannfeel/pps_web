import React from 'react';
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
import { formValues } from './UserProps';

// custom hook http request
import useHttpRequest from '../hooks/use-httprequest';

const UserRegister = () => {
    const { classes } = useStyles();
    const {
        loading,
        error,
        sendRequest: sendUserRegistration
    } = useHttpRequest();

    const handleUserRegister = (values: formValues) => {
        sendUserRegistration(
            {
                url: 'http://localhost:8000/users/register',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
                    // 'Access-Control-Allow-Methods':
                    //     'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    // 'Access-Control-Allow-Headers':
                    //     'Content-Type, Authorization'
                },
                body: {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    username: values.email,
                    email: values.email,
                    password_hash: values.password,
                    confirm_password: values.password
                }
            },
            (data) => {
                console.log(data);
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
