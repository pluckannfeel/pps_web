import React, { useContext } from 'react';
import { sectionTitleStyleProp } from '../../helpers/CssHelpers';
import {
    Box,
    Center,
    CSSObject,
    Divider,
    Group,
    Paper,
    Text,
    TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useStyles } from '../../StylesConfig/Profile';

// language
import { LangContextProps } from '../../store/lang-props';
import LangContext from '../../store/lang-context';
import { languageContent } from '../../store/languageContent';
import { At, Phone } from 'tabler-icons-react';

type profileFormProps = {};

const ProfileForm = () => {
    const { classes } = useStyles();

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
    });

    // language
    const { language: selectedLanguage } = useContext(LangContext);

    const langSetup = {
        registerHeadline:
            selectedLanguage === 'en'
                ? languageContent.en.registerHeadline
                : languageContent.jp.registerHeadline,
        registerLastName:
            selectedLanguage === 'en'
                ? languageContent.en.registerUserLastNameLabel
                : languageContent.jp.registerUserLastNameLabel,
        registerFirstName:
            selectedLanguage === 'en'
                ? languageContent.en.registerUserFirstNameLabel
                : languageContent.jp.registerUserFirstNameLabel,
        registerMonth:
            selectedLanguage === 'en'
                ? languageContent.en.registerUserMonthLabel
                : languageContent.jp.registerUserMonthLabel,
        registerDay:
            selectedLanguage === 'en'
                ? languageContent.en.registerUserDayLabel
                : languageContent.jp.registerUserDayLabel,
        registerYear:
            selectedLanguage === 'en'
                ? languageContent.en.registerUserYearLabel
                : languageContent.jp.registerUserYearLabel,
        registerEmail:
            selectedLanguage === 'en'
                ? languageContent.en.registerUserEmailLabel
                : languageContent.jp.registerUserEmailLabel,
        registerPhone:
            selectedLanguage === 'en'
                ? languageContent.en.registerUserPhoneLabel
                : languageContent.jp.registerUserPhoneLabel,
        registerPassword:
            selectedLanguage === 'en'
                ? languageContent.en.registerUserPasswordLabel
                : languageContent.jp.registerUserPasswordLabel,
        registerConfirmPassword:
            selectedLanguage === 'en'
                ? languageContent.en.registerUserConfirmPasswordLabel
                : languageContent.jp.registerUserConfirmPasswordLabel,
        registerTermsOfService:
            selectedLanguage === 'en'
                ? languageContent.en.registerUserTermsAndConditionsLabel
                : languageContent.jp.registerUserTermsAndConditionsLabel,
        registerButton:
            selectedLanguage === 'en'
                ? languageContent.en.registerSubmitButton
                : languageContent.jp.registerSubmitButton,
        registerNotTPChecked:
            selectedLanguage === 'en'
                ? languageContent.en.registerNotTPChecked
                : languageContent.jp.registerNotTPChecked
    };

    const formSubmitHandler = (values: profileFormProps) => {
        // props.onRegisterUser(values);
    };

    const textInput: CSSObject = {
        lineHeight: '2rem'
    };

    return (
        <Center>
            <form
                
                onSubmit={form.onSubmit(formSubmitHandler)}
            >
                <Paper className={classes.form} p="xl">
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

                    <Group
                        //  direction="row"
                        grow
                        mt={15}
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
            </form>
        </Center>
    );
};

export default ProfileForm;
