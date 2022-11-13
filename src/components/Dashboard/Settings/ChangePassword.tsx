import React from 'react';
import Proptypes from 'prop-types';

import {
    Box,
    Center,
    Text,
    Title,
    TextInput,
    CSSObject,
    Stack,
    Button,
    Space,
    Divider,
    Container
} from '@mantine/core';
import { useForm } from '@mantine/form';
import useHttpRequest from '../../hooks/use-httprequest';

import PasswordInputWithStrength from '../../ui/PasswordInputRequirements';
import { showNotification } from '@mantine/notifications';

type changePassProps = {
    user?: string | null;
};

interface changePassFormProps {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

const ChangePassword: React.FunctionComponent<changePassProps> = ({ user }) => {
    const {
        loading,
        error,
        sendRequest: sendChangePassword
    } = useHttpRequest();

    const form = useForm({
        initialValues: {
            old_password: '',
            new_password: '',
            confirm_password: ''
        },
        validate: (values: changePassFormProps) => ({
            old_password:
                values.old_password.length > 8
                    ? null
                    : 'Old password is too short',
            new_password: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(
                values.new_password
            )
                ? null
                : 'Password must be up 8 characters long and alphanumeric (contains alphabets and numbers).',
            confirm_password:
                values.confirm_password === values.new_password
                    ? null
                    : 'Passwords must match.'
        })
    });

    const formSubmitHandler = (values: changePassFormProps) => {
        console.log(values);

        sendChangePassword(
            {
                url: 'http://localhost:8000/users/change_password',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    username: user,
                    old_password: values.old_password,
                    new_password: values.new_password
                }
            },
            (data: { msg?: string; detail?: string }) => {
                const hasError = !!data.detail;

                if (hasError) {
                    showNotification({
                        title: 'Error changing password',
                        message: data.detail,
                        color: 'orange',
                        autoClose: 5000
                    });
                }

                // success
                if (data.msg) {
                    form.reset();
                    showNotification({
                        title: 'Success',
                        message: data.msg,
                        color: 'teal',
                        autoClose: 3000
                    });
                }
            }
        );

        if (error && !loading) {
            showNotification({
                title: 'Error changing password',
                message: error,
                color: 'orange',
                autoClose: 5000
            });
        }
    };

    const textInput: CSSObject = {
        lineHeight: '2rem'
    };

    const { onChange: otherOnChange, ...passwordInputProps } =
        form.getInputProps('new_password');

    return (
        <Box
            sx={(theme) => ({
                textalign: 'center',
                cursor: 'pointer',
                padding: theme.spacing.md
            })}
        >
            <Box>
                <Title order={1}>Change Password</Title>
                <Divider my="sm" />
            </Box>
            <Center>
                <form onSubmit={form.onSubmit(formSubmitHandler)}>
                    <Stack align="stretch">
                        <TextInput
                            required
                            label="Old Password"
                            type="password"
                            sx={textInput}
                            {...form.getInputProps('old_password')}
                        />

                        <PasswordInputWithStrength
                            formInputProps={{
                                otherHandler: passwordInputProps,
                                onChange: otherOnChange
                            }}
                        />

                        <TextInput
                            required
                            label="Confirm Password"
                            type="password"
                            sx={textInput}
                            {...form.getInputProps('confirm_password')}
                        />

                        <Space />
                        <Button
                            size="md"
                            variant="gradient"
                            gradient={{ from: 'orange', to: 'red' }}
                            type="submit"
                            loaderPosition="right"
                            loading={loading}
                        >
                            Change Password
                        </Button>
                    </Stack>
                </form>
            </Center>
        </Box>
    );
};

export default ChangePassword;
