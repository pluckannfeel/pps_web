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

import PasswordInputWithStrength from '../ui/PasswordInputRequirements';

type changePassProps = {
    user?: string | null;
};

interface changePassFormProps {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

const ChangePassword: React.FunctionComponent<changePassProps> = ({ user }) => {
    const form = useForm({
        initialValues: {
            old_password: '',
            new_password: '',
            confirm_password: ''
        },
        validate: (values: changePassFormProps) => ({
            password: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(
                values.new_password
            )
                ? null
                : 'password must be up 8 characters long and alphanumeric (contains alphabets and numbers).',
            confirm:
                values.confirm_password === values.new_password
                    ? null
                    : 'Passwords must match.'
        })
    });

    const formSubmitHandler = (values: changePassFormProps) => {
        console.log(values);
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
                            // loading={loading}
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
