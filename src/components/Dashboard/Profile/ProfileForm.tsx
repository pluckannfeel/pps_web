import React, { useContext, useState } from 'react';
import { sectionTitleStyleProp } from '../../helpers/CssHelpers';
import {
    Box,
    Button,
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

type profileFormProps = {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
};

type profileProps = {
    data: { avatar: string; name: string; phone: string; email: string };
};

const ProfileForm: React.FunctionComponent<profileProps> = ({ data }) => {
    const { classes } = useStyles();
    const { avatar, name, phone, email } = data;
    const form = useForm({
        initialValues: {
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[0],
            email: `${email}`,
            phone: phone,
        },

        validate: (values: {
            firstName: string | any[];
            lastName: string | any[];
            email: string;
            phone: string;
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
            phone: values.phone.length < 10 ? 'Invalid phone number' : null,
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

    const formSubmitHandler = (event: React.SyntheticEvent) => {
        // props.onRegisterUser(values);
    };

    const textInput: CSSObject = {
        lineHeight: '2rem'
    };

    return (
        <Center>
            <form className={classes.form} onSubmit={formSubmitHandler}>
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
                        icon={<At size={18} />}
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

                <Group
                    mt={15} position='center'>
                    <Button type="submit">
                        Update
                    </Button>
                </Group>
            </form>
        </Center>
    );
};

export default ProfileForm;
