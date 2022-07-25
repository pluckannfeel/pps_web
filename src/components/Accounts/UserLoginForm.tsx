import React, { useContext } from 'react';
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
    Stack
} from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from './UserLoginForm.module.css';
import { sectionTitleStyleProp } from './CssHelpers';

// react router
import { Link } from 'react-router-dom';
import { Check } from 'tabler-icons-react';
import { CheckIcon } from '@radix-ui/react-icons';
import { showNotification } from '@mantine/notifications';

import { logInFormValues } from './UserProps'

type userRegisterFormProps = {
    onLogin: (values: logInFormValues) => void;
};

const UserLoginForm: React.FunctionComponent<userRegisterFormProps> = (props) => {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
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

    const formSubmitHandler = (values: logInFormValues) => {
        props.onLogin(values);
    };

    const textInput: CSSObject = {
        lineHeight: '2rem'
    };

    return (
        <Center>
            <Stack>
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
