import React, { useEffect, useState } from 'react';
import {
    Tabs,
    Tooltip,
    Center,
    Group,
    Button,
    Paper,
    Text,
    NativeSelect,
    TextInput,
    Divider
} from '@mantine/core';
import { sectionTitleStyleProp } from '../../helpers/CssHelpers';
import { useForm } from '@mantine/form';
import { At, Check, Phone } from 'tabler-icons-react';

// redux
import { useAppDispatch, useAppSelector } from '../../../redux/app/rtk-hooks';
import {
    Company,
    fetchRequestCompanies
} from '../../../redux/features/companySlice';
import { showNotification } from '@mantine/notifications';
import { CheckIcon } from '@radix-ui/react-icons';
import { closeAllModals } from '@mantine/modals';

type CompanyFormProps = {
    company_data?: Company;
    // closeModal: () => void;
    username?: string | null;
};


const document_types = [
    'Direct Employer （直接受入機関)',
    'Dispatch Company （派遣会社)'
    // additional job order
];

const company_categories = [
    'A. Professional and Skilled Workers',
    'B. Specified Skilled Workers',
    'C. Houskeepers under National Strategic Special Zones',
    'D. Overseas Performing Artists',
    'E. Technical Intern Trainee'
];

const UpdateCompany: React.FunctionComponent<CompanyFormProps> = ({
    company_data,
    username
}) => {
    const dispatch = useAppDispatch();
    const successMessage = useAppSelector((state) => state.company.success);
    // console.log(company_data)

    const form = useForm({
        initialValues: {
            name: company_data!.name,
            rep_name: company_data!.rep_name,
            rep_position: company_data!.rep_position,
            year_established: company_data!.year_established,
            address: company_data!.address,
            contact_number: company_data!.contact_number,
            website: company_data!.website,
            registered_industry: company_data!.registered_industry,
            services: company_data!.services,
            regular_workers: company_data!.regular_workers,
            parttime_workers: company_data!.parttime_workers,
            foreign_workers: company_data!.foreign_workers,
            contact_person_name: company_data!.contact_person_name,
            contact_person_position: company_data!.contact_person_position,
            contact_person_number: company_data!.contact_person_number,
            contact_person_email: company_data!.contact_person_email
        },
        initialDirty: {},
        validate: (values: { contact_person_email: string }) => ({
            //     firstName:
            //         values.firstName.length < 3
            //             ? 'First name must be at least 3 characters long'
            //             : null,
            contact_person_email: /^\S+@\S+$/.test(values.contact_person_email)
                ? null
                : 'Invalid email'
        })
    });

    const formSubmitHandler = (values: {}) => {
        console.log(values);

        const passData = {
            id: company_data!.id,
            username: username,
            ...values
        };

        dispatch(
            fetchRequestCompanies({
                url: 'http://localhost:8000/companies/update',
                method: 'PUT',
                body: passData
            })
        );

        closeAllModals();

        if (successMessage) {
            showNotification({
                id: 'update-company',
                title: 'Successfully Updated Company.',
                message: successMessage,
                color: 'yellow',
                autoClose: 5000,
                icon: <CheckIcon />
            });
        }
    };

    return (
        <>
            <form onSubmit={form.onSubmit(formSubmitHandler)}>
                {/* <Group position="center" mb={25}>
                    <Text sx={sectionTitleStyleProp}>Update Company</Text>
                </Group> */}
                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Company Name"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Year Established"
                        type="number"
                        {...form.getInputProps('year_established')}
                    />
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Address"
                        type="text"
                        {...form.getInputProps('address')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Contact Number"
                        type="number"
                        icon={<Phone size={18} />}
                        {...form.getInputProps('contact_number')}
                    />
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Website"
                        type="text"
                        {...form.getInputProps('website')}
                    />
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Industry"
                        type="text"
                        {...form.getInputProps('registered_industry')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Clients/Services"
                        type="text"
                        {...form.getInputProps('services')}
                    />
                </Group>

                <Group my={10} grow>
                    <Text size="lg" weight="bolder">
                        Representative Details
                    </Text>
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Name"
                        type="text"
                        {...form.getInputProps('rep_name')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Position"
                        type="text"
                        {...form.getInputProps('rep_position')}
                    />
                </Group>

                <Group my={10} grow>
                    <Text size="lg" weight="bolder">
                        Contact Person
                    </Text>
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Contact Name"
                        type="text"
                        {...form.getInputProps('contact_person_name')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Position"
                        type="text"
                        {...form.getInputProps('contact_person_position')}
                    />
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Contact Number"
                        type="text"
                        icon={<Phone size={18} />}
                        {...form.getInputProps('contact_person_number')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Email Address"
                        type="text"
                        icon={<At size={18} />}
                        {...form.getInputProps('contact_person_email')}
                    />
                </Group>

                <Divider my={30} />

                <Group position="center" grow>
                    <Text size="md" weight="bolder">
                        Number of Workers
                    </Text>

                    <TextInput
                        withAsterisk
                        required
                        label="Regular"
                        type="number"
                        {...form.getInputProps('regular_workers')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Part-time"
                        type="number"
                        {...form.getInputProps('parttime_workers')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Foreign"
                        type="number"
                        {...form.getInputProps('foreign_workers')}
                    />
                </Group>

                <Group mt={30} position="center">
                    <Button
                        fullWidth
                        disabled={!form.isDirty()}
                        size="md"
                        variant="gradient"
                        gradient={{ from: 'orange', to: 'red' }}
                        type="submit"
                    >
                        {/* {langSetup.registerButton} */}
                        Update Company
                    </Button>
                </Group>

                {/* <Group position='center'>
                    <NativeSelect
                        label="Application Category"
                        placeholder="Labor and Employment faciliation services"
                        data={company_categories}
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
                </Group> */}

                <Group></Group>
            </form>
        </>
    );
};

export default UpdateCompany;
