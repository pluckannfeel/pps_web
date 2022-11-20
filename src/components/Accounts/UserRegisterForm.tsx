import React, { useContext, useState } from 'react';
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
import { sectionTitleStyleProp } from '../helpers/CssHelpers';

import { monthOptions, dayOptions, yearsOptions } from '../helpers/./DateHelper';

// user props
import { registerFormProps } from './UserProps';
import PasswordInputWithStrength from '../ui/PasswordInputRequirements';

// language
import { LangContextProps } from '../store/lang-props';
import LangContext from '../store/lang-context';
import { languageContent } from '../store/languageContent';
import { At, Check, Phone } from 'tabler-icons-react';

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
            phone: '',
            password: '',
            confirm: '',
            termsOfService: false
        },

        validate: (values: {
            firstName: string | any[];
            lastName: string | any[];
            email: string;
            phone: string;
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
            phone: /^\d{11}$/.test(values.phone) ? null : 'Invalid phone',
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

    // language
    const { language: selectedLanguage } = useContext(LangContext);

    const langSetup = {
        registerHeadline: selectedLanguage === 'en' ? languageContent.en.registerHeadline : languageContent.jp.registerHeadline,
        registerLastName: selectedLanguage === 'en' ? languageContent.en.registerUserLastNameLabel : languageContent.jp.registerUserLastNameLabel,
        registerFirstName: selectedLanguage === 'en' ? languageContent.en.registerUserFirstNameLabel : languageContent.jp.registerUserFirstNameLabel,
        registerMonth: selectedLanguage === 'en' ? languageContent.en.registerUserMonthLabel : languageContent.jp.registerUserMonthLabel,
        registerDay: selectedLanguage === 'en' ? languageContent.en.registerUserDayLabel : languageContent.jp.registerUserDayLabel,
        registerYear: selectedLanguage === 'en' ? languageContent.en.registerUserYearLabel : languageContent.jp.registerUserYearLabel,
        registerEmail: selectedLanguage === 'en' ? languageContent.en.registerUserEmailLabel : languageContent.jp.registerUserEmailLabel,
        registerPhone: selectedLanguage === 'en' ? languageContent.en.registerUserPhoneLabel : languageContent.jp.registerUserPhoneLabel,
        registerPassword: selectedLanguage === 'en' ? languageContent.en.registerUserPasswordLabel : languageContent.jp.registerUserPasswordLabel,
        registerConfirmPassword: selectedLanguage === 'en' ? languageContent.en.registerUserConfirmPasswordLabel : languageContent.jp.registerUserConfirmPasswordLabel,
        registerTermsOfService: selectedLanguage === 'en' ? languageContent.en.registerUserTermsAndConditionsLabel : languageContent.jp.registerUserTermsAndConditionsLabel,
        registerButton: selectedLanguage === 'en' ? languageContent.en.registerSubmitButton : languageContent.jp.registerSubmitButton,
        registerNotTPChecked: selectedLanguage === 'en' ? languageContent.en.registerNotTPChecked : languageContent.jp.registerNotTPChecked,
    }

    return (
        <Center>
            <form
                className={classes.signup_form}
                onSubmit={form.onSubmit(formSubmitHandler)}
            >
                <Paper p="md">
                    <Text sx={sectionTitleStyleProp}>{langSetup.registerHeadline}</Text>
                </Paper>

                <Paper p="sm">
                    <Group
                        // direction="row"
                        grow
                    >
                        <TextInput
                            required
                            label={langSetup.registerLastName}
                            placeholder={langSetup.registerLastName}
                            sx={textInput}
                            {...form.getInputProps('lastName')}
                        />
                        <TextInput
                            required
                            label={langSetup.registerFirstName}
                            placeholder={langSetup.registerLastName}
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
                            label={langSetup.registerMonth}
                            placeholder={langSetup.registerMonth}
                            searchable
                            clearable
                            required
                            nothingFound="No options"
                            data={monthOptions}
                            {...form.getInputProps('month')}
                        />
                        <Select
                            label={langSetup.registerDay}
                            placeholder={langSetup.registerDay}
                            searchable
                            clearable
                            required
                            nothingFound="No options"
                            data={dayOptions}
                            {...form.getInputProps('day')}
                        />
                        <Select
                            label={langSetup.registerYear}
                            placeholder={langSetup.registerYear}
                            searchable
                            required
                            nothingFound="No options"
                            data={yearsOptions}
                            {...form.getInputProps('year')}
                        />
                    </Group>
                </Paper>

                <Paper p="md">
                <Group
                        //  direction="row"
                        grow
                    >
                    <TextInput
                        required
                        label={langSetup.registerEmail}
                        icon={<At size={18}/>}
                        placeholder=""
                        sx={textInput}
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        required
                        label={langSetup.registerPhone}
                        icon={<Phone size={18} />}
                        placeholder=""
                        sx={textInput}
                        {...form.getInputProps('phone')}
                    />
                    </Group>
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
                        icon={<Check size={18} />}
                        label={langSetup.registerConfirmPassword}
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
                        label={langSetup.registerTermsOfService}
                        {...form.getInputProps('termsOfService', {
                            type: 'checkbox'
                        })}
                    />

                    {!isTPChecked ? (
                        <Text variant="text" size="sm" color="red">
                            {langSetup.registerNotTPChecked}
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
                            {langSetup.registerButton}
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
