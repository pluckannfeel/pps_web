import React, { useEffect, useRef, useState } from 'react';
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
    Divider,
    Select
} from '@mantine/core';
import { sectionTitleStyleProp } from '../../helpers/CssHelpers';
import { useForm } from '@mantine/form';
import { At, Check, ChevronDown, Phone } from 'tabler-icons-react';

// redux
import { useAppDispatch, useAppSelector } from '../../../redux/app/rtk-hooks';
import {
    Application,
    fetchRequestApplications
} from '../../../redux/features/applicationSlice';
import { showNotification } from '@mantine/notifications';
import { CheckIcon } from '@radix-ui/react-icons';
import { closeAllModals } from '@mantine/modals';
import dayjs from 'dayjs';
import {
    Company,
    fetchRequestCompanies
} from '../../../redux/features/companySlice';
import CustomLoadOverlay from '../../ui/LoadOverlay';
import { DatePicker } from '@mantine/dates';
import { GenerateUUID } from '../../helpers/Generals';
import { useStyles } from './Application';

type ApplicationFormProps = {
    application_data?: Application;
    // closeModal: () => void;
    user?: string | null;
};

type SubmitApplication = {
    name: string;
    rep_name: string;
    rep_position: string;
    year_established: string;
    address: string;
    contact_number: number;
    website: string;
    registered_industry: string;
    services: string;
    contact_person_name: string;
    contact_person_position: string;
    contact_person_number: number;
    contact_person_email: string;

    company_id: string;
    application_type: string;
    employer_category: string;
    agency_name: string;
    agency_address: string;
    agency_rep_name: string;
    agency_rep_position: string;
    date_filled: string;
    place_filled: string;
    job_title1: string;
    job_title2: string;
    job_no_workers1: number;
    job_no_workers2: number;
    job_basic_salary1: number;
    job_basic_salary2: number;
    // job_positions: JobPositions[];
    visa_type: string;
};

const document_types = [
    { value: 'direct', label: 'Direct Employer （直接受入機関)' },
    { value: 'dispatch', label: 'Dispatch Company （派遣会社)', disabled: true }
    // 'Dispatch Company （派遣会社)'
    // additional job order
];

const application_categories = [
    { value: 'professional', label: 'Professional and Skilled Workers' },
    { value: 'ssw', label: 'Specified Skilled Workers' },
    {
        value: 'housekeeping',
        label: 'Houskeepers under National Strategic Special Zones'
    },
    { value: 'overseas', label: 'Overseas Performing Artists' },
    { value: 'trainee', label: 'Technical Intern Trainee' }
];

const professional_type_visas = [
    '',
    'Investor/Business Manager',
    'Highly Skilled Professionals',
    'Engineer/Specialist in Humanities/International Services',
    'Diplomat',
    'Official',
    'Professor',
    'Artist',
    'Religious Activity',
    'Journalist',
    'Legal Services/Accounting Services',
    'Medical Services',
    'Researcher',
    'Instructor',
    'Intra-company Transferee',
    'Entertainer',
    'Skilled Labor',
    'Nursing care'
];

const UpdateApplication: React.FunctionComponent<ApplicationFormProps> = ({
    application_data,
    user
}) => {
    // console.log(application_data)

    const dayJS = dayjs();

    const dateFilledRef = useRef<HTMLInputElement>(null);

    // selected company
    const [selectedCompany, setSelectedCompany] = useState<Company>({
        id: application_data!.company_id,
        name: application_data!.company_name,
        rep_name: application_data!.company_rep_name,
        rep_position: application_data!.company_rep_position,
        year_established: application_data!.company_year_established,
        address: application_data!.company_address,
        contact_number: application_data!.company_contact_number,
        website: application_data!.company_website,
        registered_industry: application_data!.company_registered_industry,
        services: application_data!.company_services,
        contact_person_name: application_data!.company_contact_person_name,
        contact_person_position:
            application_data!.company_contact_person_position,
        contact_person_email: application_data!.company_contact_person_email
    } as unknown as Company);

    const { loading: companyLoading, error: companyError } = useAppSelector(
        (state) => state.company
    );
    const companyList = useAppSelector((state) => state.company.companies);
    // const companyNames: string[] = [''];

    // get company name and id and put in an object
    const companyIDName: { value: string; label: string }[] = [];

    if (!companyLoading && !companyError && companyList) {
        companyList.map((company: Company) => {
            companyIDName.push({
                value: company.id,
                label: company.name
            });
        });
    }

    const dispatch = useAppDispatch();
    const appSuccessMessage = useAppSelector(
        (state) => state.application.success
    );

    const passData = {
        user: user
    };

    // convert job_positions json string to array
    const job_positions = JSON.parse(
        application_data!.job_positions.toString()
    );

    // const job_position1 = JSON.parse(application_data!.job_positions[0]);

    // const job_position2 = JSON.parse(application_data!.job_positions[1]);

    const { classes } = useStyles();

    const form = useForm({
        initialValues: {
            // read only
            read_only_company_selected: application_data!.company_id,

            name: application_data!.company_name,
            rep_name: application_data!.company_rep_name,
            rep_position: application_data!.company_rep_position,
            year_established: application_data!.company_year_established,
            address: application_data!.company_address,
            contact_number: application_data!.company_contact_number,
            website: application_data!.company_website,
            registered_industry: application_data!.company_registered_industry,
            services: application_data!.company_services,
            contact_person_name: application_data!.company_contact_person_name,
            contact_person_position:
                application_data!.company_contact_person_position,
            contact_person_number:
                application_data!.company_contact_person_number,
            contact_person_email:
                application_data!.company_contact_person_email,

            // to api
            company_id: application_data!.company_id,
            application_type: application_data!.application_type,
            employer_category: application_data!.employer_category,
            agency_name: application_data!.agency_name,
            agency_address: application_data!.agency_address,
            agency_rep_name: application_data!.agency_rep_name,
            agency_rep_position: application_data!.agency_rep_position,
            // date_filled is directly filled to the element
            date_filled: application_data!.date_filled,
            place_filled: application_data!.place_filled,
            job_title1: job_positions[0]['job_title'],
            job_title2: job_positions[1]['job_title'],
            job_no_workers1: job_positions[0]['job_no_workers'],
            job_no_workers2: job_positions[1]['job_no_workers'],
            job_basic_salary1: job_positions[0]['job_basic_salary'],
            job_basic_salary2: job_positions[1]['job_basic_salary'],
            visa_type: application_data!.visa_type
        },
        initialDirty: {}
        // validate: (values: { contact_person_email: string }) => ({
        //     //     firstName:
        //     //         values.firstName.length < 3
        //     //             ? 'First name must be at least 3 characters long'
        //     //             : null,
        //     contact_person_email: /^\S+@\S+$/.test(values.contact_person_email)
        //         ? null
        //         : 'Invalid email'
        // })
    });

    useEffect(() => {
        dispatch(
            fetchRequestCompanies({
                url: 'http://localhost:8000/companies/company_list',
                method: 'POST',
                body: passData
            })
        );
    }, []);

    const applicationLoading = useAppSelector(
        (state) => state.application.loading
    );
    const applicationError = useAppSelector((state) => state.application.error);

    const selectedCompanyHandler = (value: string) => {
        // find company object using id
        const selectedCompanyObject = companyList.find(
            (company: Company) => company.id === value
        );

        // console.log(value)

        setSelectedCompany(selectedCompanyObject!);

        // set the form values to the selected company object
        form.setValues({
            company_id: selectedCompanyObject!.id,
            name: selectedCompanyObject!.name,
            rep_name: selectedCompanyObject!.rep_name,
            rep_position: selectedCompanyObject!.rep_position,
            year_established:
                selectedCompanyObject!.year_established.toString(),
            address: selectedCompanyObject!.address,
            contact_number: selectedCompanyObject!.contact_number,
            website: selectedCompanyObject!.website,
            registered_industry: selectedCompanyObject!.registered_industry,
            services: selectedCompanyObject!.services,

            contact_person_name: selectedCompanyObject!.contact_person_name,
            contact_person_position:
                selectedCompanyObject!.contact_person_position,
            contact_person_number: selectedCompanyObject!.contact_person_number,
            contact_person_email: selectedCompanyObject!.contact_person_email
        });
    };

    const formSubmitHandler = (values: SubmitApplication) => {

        const job_positions = [
            {
                id: GenerateUUID(),
                job_title: values['job_title1'],
                job_no_workers: values['job_no_workers1'],
                job_basic_salary: values['job_basic_salary1']
            },
            {
                id: GenerateUUID(),
                job_title: values['job_title2'],
                job_no_workers: values['job_no_workers2'],
                job_basic_salary: values['job_basic_salary2']
            }
        ];

        const passData = {
            id: application_data!.id,
            user: user,
            company: selectedCompany.id
                ? selectedCompany.id
                : application_data!.company_id,
            job_positions: JSON.stringify(job_positions),
            ...values,
            date_filled: dateFilledRef.current!.value
        };

        console.log(passData);

        dispatch(
            fetchRequestApplications({
                url: 'http://localhost:8000/applications/update',
                method: 'PUT',
                body: passData
            })
        );

        closeAllModals();

        if (appSuccessMessage) {
            showNotification({
                id: 'update-application',
                title: 'Successfully Updated Application.',
                message: appSuccessMessage,
                color: 'yellow',
                autoClose: 5000,
                icon: <CheckIcon />
            });
        }
    };

    return (
        <>
            {companyLoading && applicationLoading && <CustomLoadOverlay />}
            <form onSubmit={form.onSubmit(formSubmitHandler)}>
                {/* <Group position="center" mb={25}>
                    <Text sx={sectionTitleStyleProp}>Update Application</Text>
                </Group> */}

                <Group position="center" grow>
                    <Select
                        required
                        withAsterisk
                        label="Application Category"
                        placeholder="Labor and Employment faciliation services"
                        data={application_categories}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...form.getInputProps('application_type')}
                    />

                    <Select
                        label="Documentary Type "
                        required
                        withAsterisk
                        placeholder="document requirements"
                        data={document_types}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...form.getInputProps('employer_category')}
                    />
                </Group>

                <Group my={20} grow>
                    <Text size="lg" italic weight="bolder">
                        POLO APPLICATION FORM
                    </Text>
                </Group>

                <Group position="center" grow>
                    <Text size="lg" weight="bolder">
                        Select Company
                    </Text>
                    <Select
                        // label="Company Name"
                        required
                        placeholder="Company Name"
                        onChange={selectedCompanyHandler}
                        data={companyIDName}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        // {...form.getInputProps('read_only_company_selected')}
                    />
                </Group>

                <Divider my={25} />

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Company Name"
                        {...form.getInputProps('name')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Year Established"
                        type="number"
                        {...form.getInputProps('year_established')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Address"
                        type="text"
                        {...form.getInputProps('address')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Contact Number"
                        type="number"
                        icon={<Phone size={18} />}
                        {...form.getInputProps('contact_number')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Website"
                        type="text"
                        {...form.getInputProps('website')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Industry"
                        type="text"
                        {...form.getInputProps('registered_industry')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Clients/Services"
                        type="text"
                        {...form.getInputProps('services')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                </Group>

                <Group my={8} grow>
                    <Text size="md" weight="bolder">
                        Company Contact Details
                    </Text>
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Contact Name"
                        type="text"
                        {...form.getInputProps('contact_person_name')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Position"
                        type="text"
                        {...form.getInputProps('contact_person_position')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
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
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Email Address"
                        type="text"
                        icon={<At size={18} />}
                        {...form.getInputProps('contact_person_email')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                </Group>

                <Group my={8} grow>
                    <Text size="md" weight="bolder">
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
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Position"
                        type="text"
                        {...form.getInputProps('rep_position')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput,
                        }}
                    />
                </Group>

                {/* <Group my={10} grow>
                    <Text size="lg" weight="bolder">
                        Contact Person
                    </Text>
                </Group> */}

                <Group my={10} grow>
                    <Text size="lg" weight="bolder">
                        Partner Philippine Recruitment Agency (PRA)
                    </Text>
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Agency Name"
                        type="text"
                        // onInput={praNameHandler}
                        {...form.getInputProps('agency_name')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Agency Address"
                        type="text"
                        // onInput={praAddressHandler}
                        {...form.getInputProps('agency_address')}
                    />
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Agency Representative Name"
                        type="text"
                        // onInput={praNameHandler}
                        {...form.getInputProps('agency_rep_name')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Agency Representative Position"
                        type="text"
                        // onInput={praAddressHandler}
                        {...form.getInputProps('agency_rep_position')}
                    />
                </Group>

                <Group my={20} grow>
                    <Text italic size="lg" weight="bolder">
                        MANPOWER REQUEST/JOB ORDER FORM
                    </Text>
                </Group>

                <Group position="center" grow>
                    <DatePicker
                        locale="en"
                        placeholder="Select Date"
                        label="Date filled"
                        inputFormat="YYYY-MM-DD"
                        defaultValue={new Date(application_data!.date_filled)}
                        ref={dateFilledRef}
                        // {...form.getInputProps('date_filled')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Place filled"
                        type="text"
                        // onInput={praAddressHandler}
                        {...form.getInputProps('place_filled')}
                    />
                </Group>

                <Group position="center" mt={10} grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Job Position/Title"
                        type="text"
                        {...form.getInputProps('job_title1')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="No. of Workers"
                        type="number"
                        {...form.getInputProps('job_no_workers1')}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Job Basic Salary (YEN)"
                        type="number"
                        {...form.getInputProps('job_basic_salary1')}
                    />
                </Group>

                {/* <Group position="center" mt={10} grow>
                    <Textarea
                        label="Job Description"
                        placeholder="Describe the job position in detail."
                        type="text"
                        {...form.getInputProps('job_description1')}
                        minRows={5}
                    />
                </Group> */}

                <Group position="center" mt={10} grow>
                    <TextInput
                        label="Job Position/Title"
                        type="text"
                        {...form.getInputProps('job_title2')}
                    />
                    <TextInput
                        label="No. of Workers"
                        type="number"
                        {...form.getInputProps('job_no_workers2')}
                    />
                    <TextInput
                        label="Job Basic Salary (YEN)"
                        type="number"
                        {...form.getInputProps('job_basic_salary2')}
                    />
                </Group>

                {/* <Group position="center" mt={10} grow>
                    <Textarea
                        label="Job Description"
                        placeholder="Describe the job position in detail."
                        type="text"
                        {...form.getInputProps('job_description1')}
                        minRows={5}
                    />
                </Group> */}

                <Group position="center" mt={20} grow>
                    <Text size="lg" weight="normal">
                        Visa Category/Type
                    </Text>
                    <NativeSelect
                        // label="Company Name"
                        placeholder="Company Name"
                        // onChange={selectedCompanyHandler}
                        data={professional_type_visas}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...form.getInputProps('visa_type')}
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
                        Update Application
                    </Button>
                </Group>
            </form>
        </>
    );
};

export default UpdateApplication;
