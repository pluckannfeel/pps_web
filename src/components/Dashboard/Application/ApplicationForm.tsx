import React from 'react';
import {
    Tabs,
    Tooltip,
    Center,
    Group,
    Button,
    Paper,
    Text,
    NativeSelect
} from '@mantine/core';
import { sectionTitleStyleProp } from '../../helpers/CssHelpers';
import { useForm } from '@mantine/form';
import { ChevronDown } from 'tabler-icons-react';

type ApplicationFormProps = {};

interface applicationFormProps {}

const document_types = [
    'Direct Employer （直接受入機関)',
    'Dispatch Company （派遣会社)'
    // additional job order
];

const application_categories = [
    'A. Professional and Skilled Workers',
    'B. Specified Skilled Workers',
    'C. Houskeepers under National Strategic Special Zones',
    'D. Overseas Performing Artists',
    'E. Technical Intern Trainee'
];

const ApplicationForm: React.FunctionComponent<ApplicationFormProps> = () => {
    const form = useForm({
        initialValues: {
            document_type: '',
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

    const formSubmitHandler = (values: applicationFormProps) => {};

    return (
        <>
            <form onSubmit={form.onSubmit(formSubmitHandler)}>
                <Paper p="md">
                    <Text sx={sectionTitleStyleProp}>Create Application</Text>
                </Paper>

                <Group position='center'>
                    <NativeSelect
                        label="Application Category"
                        placeholder="Labor and Employment faciliation services"
                        data={application_categories}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                    />

                    <NativeSelect
                        label="Documentary Type "
                        placeholder="document requirements"
                        data={document_types}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                    />
                </Group>

                <Group>
                    
                </Group>
            </form>
        </>
    );
};

export default ApplicationForm;
