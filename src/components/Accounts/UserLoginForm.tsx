import {
    TextInput,
    // Checkbox,
    Button,
    Group,
    // Box,
    CSSObject,
    Text,
    Paper,
    Center
} from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from './UserLoginForm.module.css';
import {sectionTitleStyleProp} from './CssHelpers'

// react router
import { Link } from 'react-router-dom';

interface formValues {
    email: string;
    password: string;
    termsOfService: boolean;
}

const UserLoginForm = () => {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            termsOfService: false
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
            password: (value) =>
            // (?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
                /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
                    value
                )
                    ? null
                    : 'password must be alphanumeric (contains alphabets and numbers).'
        }
    });

    const formSubmitHandler = (values: formValues) => {
        console.log(values);
    };

    const textInput: CSSObject = {
        lineHeight: "2rem",
    }

    return (
        <Center>
            <form
                    className={classes.signin_form}
                    onSubmit={form.onSubmit(formSubmitHandler)}
                >
                    <Paper p="md">
                        <Text sx={sectionTitleStyleProp} >
                            Welcome! Sign in to proceed.
                        </Text>
                    </Paper>

                    <Paper p="md">
                        <TextInput
                            required
                            label="E-mail Address"
                            type='email'
                            placeholder="your@email.com"
                            sx={textInput}
                            {...form.getInputProps('email')}
                        />
                    </Paper>

                    <Paper p="md">
                        <TextInput
                            required
                            type='password'
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
                            <Button size='md' variant="gradient" gradient={{ from: 'orange', to: 'red' }} type="submit">
                                Sign In
                            </Button>
                        </Group>
                    </Paper>

                    <Paper p="md">
                        <Text<typeof Link> variant="link" component={Link} to="/register">
                            No Account? Sign up here.
                        </Text>
                    </Paper>
                </form>
        </Center>
    );
};

export default UserLoginForm;
