import React, { useState } from 'react';
import {
    TextInput,
    Checkbox,
    Button,
    Group,
    // Box,
    CSSObject,
    Text,
    Paper,
    Center,
    Select,
    Progress,
    PasswordInput,
    Tooltip
} from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from './UserRegisterForm.module.css';
import { sectionTitleStyleProp } from './CssHelpers';

import { monthOptions, dayOptions, yearsOptions } from './DateHelper';

// user props
import { registerFormProps } from './UserProps';
import PasswordInputWithStrength from '../ui/PasswordInputRequirements';

type userRegisterFormProps = {
    onRegisterUser: (values: registerFormProps) => void;
};

const UserRegisterForm: React.FunctionComponent<userRegisterFormProps> = (
    props
) => {
    // terms of service and privacy policy
    const [isTPChecked, setIsTPChecked] = useState(true);
    const [passwordHelper, setPasswordHelper] = useState(null);

    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            day: '',
            month: '',
            year: '',
            email: '',
            password: '',
            confirm: '',
            termsOfService: false
        },

        validate: (values: {
            firstName: string | any[];
            lastName: string | any[];
            email: string;
            password: string;
            confirm: any;
        }) => ({
            firstName:
                values.firstName.length < 3
                    ? 'First name must be at least 3 characters long'
                    : null,
            lastName:
                values.lastName.length < 3
                    ? 'Last name must be at least 3 characters long'
                    : null,
            email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
            password: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(
                values.password
            )
                ? null
                : 'password must be up 8 characters long and alphanumeric (contains alphabets and numbers).',
            confirm:
                values.confirm === values.password
                    ? null
                    : 'Passwords must match.'
            // termsOfService: values.termsOfService ? null : 'You must accept terms of service.'
        })
        // 'You must accept the terms of service and privacy policy.'
        // validate:  {
        //     email: (value) =>
        //         /^\S+@\S+$/.test(value) ? null : 'Invalid email',
        //     password: (value) =>
        //         /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/.test(value)
        //             ? null
        //             : 'password must be alphanumeric (contains alphabets and numbers) and must be more than 8 characters.'
        // }
    });

    const formSubmitHandler = (values: registerFormProps) => {
        setIsTPChecked(values.termsOfService);
        // console.log(values);
        if (values.termsOfService) {
            // console.log(values)
            props.onRegisterUser(values);
        }
    };

    const textInput: CSSObject = {
        lineHeight: '2rem'
    };

    // for password input props
    const { onChange: otherOnChange, ...passwordInputProps } =
        form.getInputProps('password');

    return (
        <Center>
            <form
                className={classes.signup_form}
                onSubmit={form.onSubmit(formSubmitHandler)}
            >
                <Paper p="md">
                    <Text sx={sectionTitleStyleProp}>Create an Account</Text>
                </Paper>

                <Paper p="sm">
                    <Group
                        // direction="row"
                        grow
                    >
                        <TextInput
                            required
                            label="Last Name"
                            placeholder="Hashimoto"
                            sx={textInput}
                            {...form.getInputProps('lastName')}
                        />
                        <TextInput
                            required
                            label="First Name"
                            placeholder="Satoshi"
                            sx={textInput}
                            {...form.getInputProps('firstName')}
                        />
                    </Group>
                </Paper>

                <Paper p="sm">
                    <Group
                        //  direction="row"
                        grow
                    >
                        <Select
                            label="Month"
                            placeholder="April"
                            searchable
                            clearable
                            required
                            nothingFound="No options"
                            data={monthOptions}
                            {...form.getInputProps('month')}
                        />
                        <Select
                            label="Day"
                            placeholder="21"
                            searchable
                            clearable
                            required
                            nothingFound="No options"
                            data={dayOptions}
                            {...form.getInputProps('day')}
                        />
                        <Select
                            label="Year"
                            placeholder="1996"
                            searchable
                            required
                            nothingFound="No options"
                            data={yearsOptions}
                            {...form.getInputProps('year')}
                        />
                    </Group>
                </Paper>

                <Paper p="md">
                    <TextInput
                        required
                        label="E-mail Address"
                        placeholder="your@email.com"
                        sx={textInput}
                        {...form.getInputProps('email')}
                    />
                </Paper>

                <Paper p="md">
                    {/* <TextInput
                        required
                        label="Password"
                        type="password"
                        sx={textInput}
                        {...form.getInputProps('password')}
                    /> */}
                    <PasswordInputWithStrength
                        formInputProps={{
                            otherHandler: passwordInputProps,
                            onChange: otherOnChange
                        }}
                    />

                    {/* <PasswordInput
                        required
                        sx={textInput}
                        label="Your password"
                        placeholder="Your password"
                        description="Strong password should include letters in lower and uppercase, at least 1 number, and at least 8 characters long."
                        visibilityToggleIcon={({ reveal, size }) =>
                            reveal ? (
                                <EyeOff size={size} />
                            ) : (
                                <EyeCheck size={size} />
                            )
                        }
                        {...form.getInputProps('password')} */}
                </Paper>

                <Paper p="md">
                    <TextInput
                        required
                        label="Confirm Password"
                        type="password"
                        sx={textInput}
                        {...form.getInputProps('confirm')}
                    />
                </Paper>

                {/* <Paper p="">
                        <Text variant="link" component="a" href="#">
                            Forgot password?
                        </Text>
                    </Paper> */}

                <Paper p="md">
                    <Checkbox
                        mt="md"
                        sx={textInput}
                        label="By registering, you agree to PPS's Terms of Service and Privacy Policy"
                        {...form.getInputProps('termsOfService', {
                            type: 'checkbox'
                        })}
                    />

                    {!isTPChecked ? (
                        <Text variant="text" size="sm" color="red">
                            You must accept the terms of service and privacy
                            policy.
                        </Text>
                    ) : null}
                </Paper>

                <Paper p="md">
                    <Group position="center">
                        <Button
                            fullWidth
                            size="md"
                            variant="gradient"
                            gradient={{ from: 'orange', to: 'red' }}
                            type="submit"
                        >
                            Create Account
                        </Button>
                    </Group>
                </Paper>

                {/* <Paper p="md">
                        <Text variant="link" component="a" href="#">
                            No Account? Sign up here.
                        </Text>
                    </Paper> */}
            </form>
        </Center>
    );
};

export default UserRegisterForm;
