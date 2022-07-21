import { ActionIcon, CloseButton, Group, Button, Container } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'tabler-icons-react';

import useStyles from '../StylesConfig';
import UserRegisterForm from './UserRegisterForm';

interface formValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    day: string;
    month: string;
    year: string;
    confirm: string;
    termsOfService: boolean;
}

const UserRegister = () => {
    const { classes } = useStyles();

    const handleUserRegister = (values: formValues) => {
        console.log(values)
    }

    return (
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
                    <UserRegisterForm onRegisterUser={handleUserRegister}/>
                </Container>
            </div>
        </div>
    );
};

export default UserRegister;
