import React, { useContext, useState } from 'react';
import useHttpRequest from '../hooks/use-httprequest';
import {
    TextInput,
    // Checkbox,
    Button,
    Group,
    // Box,
    CSSObject,
    Text,
    Paper,
    Center,
    Notification,
    Stack,
    Alert
} from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from './UserLoginForm.module.css';
import { sectionTitleStyleProp } from './CssHelpers';

// react router
import { Link } from 'react-router-dom';
import { Check, AlertCircle } from 'tabler-icons-react';
import { CheckIcon } from '@radix-ui/react-icons';
import { showNotification } from '@mantine/notifications';

import { logInFormValues } from './UserProps';

// auth context
import UserAuthContext from '../store/auth-context';
import { UserAuthContextProps } from '../store/auth-props';

import { useNavigate } from 'react-router-dom';

type userRegisterFormProps = {
    // onLogin: (values: logInFormValues) => void;
};

const UserLoginForm: React.FunctionComponent<userRegisterFormProps> = (
    props
) => {
    const authCtx = useContext(UserAuthContext) as UserAuthContextProps;

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
            // termsOfService: false
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
            password: (value) =>
                // (?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
                /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)
                    ? null
                    : 'password must be alphanumeric (contains alphabets and numbers).'
        }
    });

    const { loading, error, sendRequest: loginRequest } = useHttpRequest();
    const [responseError, setResponseError] = useState<string | undefined>('');

    const navigate = useNavigate();

    const formSubmitHandler = (values: logInFormValues) => {
        // console.log(values);
        loginRequest(
            {
                url: 'http://localhost:8000/users/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    username: values.email,
                    password: values.password
                }
            },
            (data: { token?: string; detail?: string }) => {
                // error occured
                const hasError = !!data.detail;
                if (hasError) {
                    console.log(data.detail);
                    setResponseError(data.detail);
                    return;
                }
                const token = data.token!;

                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);

                const expiration = tomorrow.getTime();
                // console.log(expiration);

                authCtx.login(token, expiration);
                navigate('/dashboard', {
                    replace: true,
                    state: { success: data }
                });
                // console.log(data.token);
                form.reset();

                setResponseError('');
            }
        );
    };

    const textInput: CSSObject = {
        lineHeight: '2rem'
    };

    return (
        <Center>
            <Stack>
                {!loading && responseError && (
                    <Alert
                        icon={<AlertCircle size={16} />}
                        title="Please try again."
                        color="orange"
                        variant="filled"
                    >
                        <Text>{responseError}</Text>
                    </Alert>
                )}
                <form
                    className={classes.signin_form}
                    onSubmit={form.onSubmit(formSubmitHandler)}
                >
                    {/* {authContext.newAccount && <Notification
                        icon={<Check size={16} />}
                        color="teal"
                        title="Successfully Registered."
                    >
                        Your account has been created.
                    </Notification>} */}

                    <Paper p="md">
                        <TextInput
                            required
                            label="E-mail Address"
                            type="email"
                            placeholder="your@email.com"
                            sx={textInput}
                            {...form.getInputProps('email')}
                        />
                    </Paper>

                    <Paper p="md">
                        <TextInput
                            required
                            type="password"
                            label="Password"
                            placeholder="*********"
                            sx={textInput}
                            {...form.getInputProps('password')}
                        />
                    </Paper>

                    <Paper p="">
                        <Text variant="link" component="a" href="#">
                            Forgot password?
                        </Text>
                    </Paper>

                    {/* <Paper p="md">
                        <Checkbox
                            mt="md"
                            label="I agree to sell my privacy"
                            {...form.getInputProps('termsOfService', {
                                type: 'checkbox'
                            })}
                        />
                    </Paper> */}

                    <Paper p="md">
                        <Group position="center">
                            <Button
                                size="md"
                                variant="gradient"
                                gradient={{ from: 'orange', to: 'red' }}
                                type="submit"
                                loaderPosition="right"
                                loading={loading}
                            >
                                Sign In
                            </Button>
                        </Group>
                    </Paper>

                    <Paper p="md">
                        <Text<typeof Link>
                            variant="link"
                            component={Link}
                            to="/register"
                        >
                            No Account? Sign up here.
                        </Text>
                    </Paper>
                </form>
            </Stack>
        </Center>
    );
};

export default UserLoginForm;
function AuthContext(AuthContext: any) {
    throw new Error('Function not implemented.');
}
