import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
    Tabs,
    Tooltip,
    Center,
    Group,
    Button,
    Paper,
    Text,
    TextInput,
    NativeSelect,
    Select,
    Divider,
    Stack,
    Textarea
} from '@mantine/core';
import { sectionTitleStyleProp } from '../../helpers/CssHelpers';
import { useForm } from '@mantine/form';
import { ChevronDown, Phone, At, Clock } from 'tabler-icons-react';
import { DatePicker, TimeInput } from '@mantine/dates';

// uuid
import { GenerateUUID } from '../../helpers/Generals';

// redux
import { useAppDispatch, useAppSelector } from '../../../redux/app/rtk-hooks';
import { fetchRequestApplications } from '../../../redux/features/applicationSlice';
import {
    Company,
    fetchRequestCompanies
} from '../../../redux/features/companySlice';

import CustomLoadOverlay from '../../ui/LoadOverlay';
import { showNotification } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';

type Application = {
    name: string;
    rep_name: string;
    rep_position: string;
    year_established: string;
    address: string;
    contact_number: string;
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

type NewApplicaitonProps = {
    user?: string | null;
    closeModal: () => void;
};

function praReducer(state: any, action: any) {
    switch (action.type) {
        case 'pra_name':
            return { ...state, pra_name: action.value };
        case 'pra_address':
            return { ...state, pra_address: action.value };
        default:
            return state;
    }
}

const NewApplication: React.FunctionComponent<NewApplicaitonProps> = ({
    user,
    closeModal
}) => {
    // time
    const dayJS = dayjs();
    // day js set time to 8:00 am
    const dayJS8am = dayjs().set('hour', 8).set('minute', 0);
    // 5:00 pm
    const dayJS5pm = dayjs().set('hour', 17).set('minute', 0);

    // selected company
    const [selectedCompany, setSelectedCompany] = useState<Company>(
        {} as Company
    );

    // useReducer for pra\
    const [pra, dispatchPra] = React.useReducer(praReducer, {
        pra_name: '',
        pra_address: ''
    });

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
    const companySuccessMessage = useAppSelector(
        (state) => state.company.success
    );

    const passData = {
        user: user
    };

    const form = useForm({
        initialValues: {
            // read only
            name: '',
            rep_name: '',
            rep_position: '',
            year_established: '',
            address: '',
            contact_number: '',
            website: '',
            registered_industry: '',
            services: '',
            contact_person_name: '',
            contact_person_position: '',
            contact_person_number: 0,
            contact_person_email: '',

            // to api
            company_id: '',
            application_type: '',
            employer_category: '',
            agency_name: '',
            agency_address: '',
            agency_rep_name: '',
            agency_rep_position: '',
            date_filled: dayJS.format('YYYY-MM-DD'),
            place_filled: '',
            job_title1: '',
            job_title2: '',
            job_no_workers1: 0,
            job_no_workers2: 0,
            job_basic_salary1: 0,
            job_basic_salary2: 0,
            visa_type: ''
        }
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

    const selectedCompanyHandler = (value: string) => {
        // const value = (event.target as HTMLInputElement).value;
        // find the company object from the company list
        // const selectedCompanyObject = companyList.find(
        //     (company: Company) => company.name === value
        // );

        // find company object using id
        const selectedCompanyObject = companyList.find(
            (company: Company) => company.id === value
        );

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
            contact_number: selectedCompanyObject!.contact_number.toString(),
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

    // const praNameHandler = (event: React.FormEvent) => {
    //     const value = (event.target as HTMLInputElement).value;
    //     dispatchPra({ type: 'pra_name', value: value });
    // };

    // const praAddressHandler = (event: React.FormEvent) => {
    //     const value = (event.target as HTMLInputElement).value;
    //     dispatchPra({ type: 'pra_address', value: value });
    // };

    // application slice
    // const application = useAppSelector((state) => state.application.applications);
    const applicationLoading = useAppSelector(
        (state) => state.application.loading
    );
    const applicationError = useAppSelector((state) => state.application.error);

    const formSubmitHandler = (values: Application) => {
        // console.log(values)

        const job_positions = [
            {
                id: GenerateUUID(),
                job_title: values.job_title1,
                job_no_workers: values.job_no_workers1,
                job_basic_salary: values.job_basic_salary1
            },
            {
                id: GenerateUUID(),
                job_title: values.job_title2,
                job_no_workers: values.job_no_workers2,
                job_basic_salary: values.job_basic_salary2
            }
        ];

        const passData = {
            user: user,
            company_id: values.company_id,
            application_type: values.application_type,
            employer_category: values.employer_category,
            agency_name: values.agency_name,
            agency_address: values.agency_address,
            agency_rep_name: values.agency_rep_name,
            agency_rep_position: values.agency_rep_position,
            date_filled: dayjs(values.date_filled).format('YYYY-MM-DD'),
            place_filled: values.place_filled,
            job_positions: JSON.stringify(job_positions),
            visa_type: values.visa_type
        };

        dispatch(
            fetchRequestApplications({
                url: 'http://localhost:8000/applications/create',
                method: 'POST',
                body: passData
            })
        );

        closeModal();

        // show error notification
        if (applicationLoading) {
            showNotification({
                id: 'add-application-error',
                title: 'Error Adding Application.',
                message: applicationError,
                color: 'red',
                autoClose: 5000,
                icon: <Cross1Icon />
            });
        }

        if (companySuccessMessage && !applicationError) {
            showNotification({
                id: 'add-application-success',
                title: 'Added Application.',
                message: companySuccessMessage,
                color: 'teal',
                autoClose: 5000,
                icon: <CheckIcon />
            });
        }
    };

    return (
        <>
            {companyLoading && applicationLoading && <CustomLoadOverlay />}
            <form onSubmit={form.onSubmit(formSubmitHandler)}>
                <Group position="center" mb={25}>
                    <Text sx={sectionTitleStyleProp}>New Application</Text>
                </Group>

                <TextInput hidden {...form.getInputProps('company_id')} />

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
                    />
                </Group>

                <Divider my={30} />

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
                        defaultValue={new Date()}
                        {...form.getInputProps('date_filled')}
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
                        size="md"
                        variant="gradient"
                        gradient={{ from: 'orange', to: 'red' }}
                        type="submit"
                    >
                        {/* {langSetup.registerButton} */}
                        Enter Application
                    </Button>
                </Group>
            </form>
        </>
    );
};

export default NewApplication;
