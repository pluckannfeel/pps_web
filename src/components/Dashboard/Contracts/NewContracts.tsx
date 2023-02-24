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
import { useStyles } from './Contract';
import { useAppDispatch, useAppSelector } from '../../../redux/app/rtk-hooks';
import {
    Company,
    fetchRequestCompanies
} from '../../../redux/features/companySlice';
import { fetchRequestContracts } from '../../../redux/features/contractSlice';
import CustomLoadOverlay from '../../ui/LoadOverlay';
import { showNotification } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';

const contract_terms = [
    { value: 'renew', label: 'The contract shall be automatically renewed.' },
    { value: 'non_renew', label: 'The contract is not renewable/fixed.' },
    {
        value: 'renew_by_performance',
        label: `Renewal of contract shall be determined by volume of work to be done at the time the term of
    the contract expires, worker’s work record and work attitude, worker’s capability, business
    performance of the company.`
    }
];

export const work_bonus_salary_increase = [
    { value: 'once', label: 'Once a Year' },
    { value: 'twice', label: 'Twice a Year' },
    { value: 'performance', label: 'Based on Company/worker performance' }
];

const jlpt_level = ['N5', 'N4', 'N3', 'N2', 'N1'];

const min_year_exp = ['1', '2', '3', '4', '5'];

const work_days = [
    'Monday to Friday',
    'Monday to Saturday',
    'Tuesday to Saturday',
    'Wednesday to Sunday',
    'Friday to Wednesday'
];

const days_off = [
    'Saturday and Sunday',
    'Sunday and Monday',
    'Monday and Tuesday',
    'Tuesday and Wednesday',
    'Wednesday and Thursday',
    'Thursday and Friday',
    'Friday and Saturday'
];

export type Contract = {
    id: string;
    company_id: string;
    company_name: string;
    company_address: string;
    company_contact_number: string;
    worker_name: string;
    agency_name: string;
    agency_address: string;
    agency_rep_name: string;
    agency_rep_position: string;
    site_employment: string;
    contract_duration: string; // <num> <year(s)>
    contract_terms: string; // choose option but will be 'x' on pdf
    bonus: string; // once,twice,byperformance
    salary_increase: string; // once,twice,byperformance
    work_start_time: Date; // 9:00 AM
    work_end_time: Date; // 5:00 PM
    work_rest: number;
    work_working_days: string; // Tuesday to Saturday
    work_days_off: string; // Sunday & Monday
    work_leave: number; // 15
    work_other_leave: string;
    job_title: string;
    job_description: string;
    job_duties: string; // list/object string;
    job_criteria_degree: string;
    job_criteria_jlpt_level: string;
    job_criteria_year_exp: string;
    job_criteria_other: string;
    job_basic_salary: string;
    job_total_deductions: string;
    job_income_tax: string;
    job_social_insurance: string;
    job_utilities: string;
    job_accomodation: string;
    job_net_salary: string;
    housing_accomodation: string;
    accomodation_utilities: string;
    transportation: string;
    other_benefits: string; // object e.g key : benefit name value: benefit value or contents
};

type NewContractProps = {
    user?: string | null;
    closeModal: () => void;
};

const NewContracts: React.FunctionComponent<NewContractProps> = ({
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

    const { classes } = useStyles();

    const { loading: companyLoading, error: companyError } = useAppSelector(
        (state) => state.company
    );
    const companyList = useAppSelector((state) => state.company.companies);

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
            id: '',
            worker_name: '',
            company_id: '',
            company_name: '',
            company_address: '',
            company_contact_number: '',
            agency_name: '',
            agency_rep_name: '',
            agency_rep_position: '',
            agency_address: '',
            site_employment: '',
            contract_duration: '', // <num> <year(s)>
            contract_terms: contract_terms[0].value, // choose option but will be 'x' on pdf
            bonus: work_bonus_salary_increase[0].value, // once,twice,byperformance
            salary_increase: work_bonus_salary_increase[0].value, // once,twice,byperformance
            work_start_time: new Date(dayJS8am.format('YYYY-MM-DD HH:mm:ss')), // 9:00 AM
            work_end_time: new Date(dayJS5pm.format('YYYY-MM-DD HH:mm:ss')), // 5:00 PM
            work_rest: 60,
            work_working_days: work_days[0], // Tuesday to Saturday
            work_days_off: days_off[0], // Sunday & Monday
            work_leave: 0, // 15
            work_other_leave: '',
            job_title: '',
            job_description: '',
            job_duties: '', // list/object '',
            job_criteria_degree: '',
            job_criteria_jlpt_level: jlpt_level[0],
            job_criteria_year_exp: min_year_exp[0].toString(),
            job_criteria_other: '',
            job_basic_salary: '',
            job_total_deductions: '',
            job_income_tax: '',
            job_social_insurance: '',
            job_utilities: '',
            job_accomodation: '',
            job_net_salary: '',
            housing_accomodation: '',
            accomodation_utilities: '',
            transportation: '',
            other_benefits: '' // object e.g key : benefit name value: benefit value or contents
        },
        validate: (values: Contract) => ({
            other_benefits: !values.other_benefits.includes(';')
                ? 'Error processing other benefits field.'
                : null
            // application_type: values.application_type !== '' ? null : 'Please choose an application type.',
            // employer_category: values.employer_category !== '' ? null : 'Please choose an employer category.',
        })
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
        // find company object using id
        const selectedCompanyObject = companyList.find(
            (company: Company) => company.id === value
        );

        setSelectedCompany(selectedCompanyObject!);

        // set the form values to the selected company object
        form.setValues({
            company_id: selectedCompanyObject!.id,
            company_name: selectedCompanyObject!.name,
            company_address: selectedCompanyObject!.address,
            company_contact_number:
                selectedCompanyObject!.contact_number.toString()
        });
    };

    const formSubmitHandler = (values: Contract) => {
        const passData = {
            user: user,
            company_id: values.company_id,
            worker_name: values.worker_name,
            agency_name: values.agency_name,
            agency_address: values.agency_address,
            agency_rep_name: values.agency_rep_name,
            agency_rep_position: values.agency_rep_position,
            site_employment: values.site_employment,
            contract_duration: values.contract_duration,
            contract_terms: values.contract_terms,
            bonus: values.bonus,
            salary_increase: values.salary_increase,
            work_start_time: values.work_start_time.toString(), // changed as string in backend
            work_end_time: values.work_end_time.toString(), // changed as string in backend
            work_rest: values.work_rest,
            work_working_days: values.work_working_days,
            work_days_off: values.work_days_off,
            work_leave: values.work_leave,
            work_other_leave:
                values.work_other_leave === ''
                    ? 'null'
                    : values.work_other_leave,
            job_title: values.job_title,
            job_description: values.job_description,
            job_duties: values.job_duties,
            job_criteria_degree: values.job_criteria_degree,
            job_criteria_jlpt_level: values.job_criteria_jlpt_level,
            job_criteria_year_exp: values.job_criteria_year_exp,
            job_criteria_other: values.job_criteria_other,
            job_basic_salary: values.job_basic_salary,
            job_total_deductions: values.job_total_deductions,
            job_income_tax: values.job_income_tax,
            job_social_insurance: values.job_social_insurance,
            job_utilities: values.job_utilities,
            job_accomodation: values.job_accomodation,
            job_net_salary: values.job_net_salary,
            housing_accomodation: values.housing_accomodation,
            accomodation_utilities: values.accomodation_utilities,
            transportation: values.transportation,
            other_benefits:
                values.other_benefits === '' ? 'null' : values.other_benefits
        };

        dispatch(
            fetchRequestContracts({
                url: 'http://localhost:8000/contracts/create',
                method: 'POST',
                body: passData
            })
        );

        // console.log(passData);

        // closeModal();

        if (contractLoading) {
            showNotification({
                id: 'add-contract-error',
                title: 'Error Adding Contract.',
                message: contractError,
                color: 'red',
                autoClose: 5000,
                icon: <Cross1Icon />
            });
        }

        if (companySuccessMessage && !contractError) {
            showNotification({
                id: 'add-contract-success',
                title: 'Added Contract.',
                message: companySuccessMessage,
                color: 'teal',
                autoClose: 5000,
                icon: <CheckIcon />
            });
        }
    };

    const contractLoading = useAppSelector((state) => state.contract.loading);
    const contractError = useAppSelector((state) => state.contract.error);

    return (
        <>
            {companyLoading && contractLoading && <CustomLoadOverlay />}
            <form onSubmit={form.onSubmit(formSubmitHandler)}>
                {/* <form> */}
                <Group position="center" mb={15}>
                    <Text sx={sectionTitleStyleProp}>
                        New Employment Contract
                    </Text>
                </Group>

                <Group position="center" mb={10} grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Worker's Name"
                        {...form.getInputProps('worker_name')}
                        type='text'
                    />
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

                <Divider my={15} />

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Company Name"
                        {...form.getInputProps('company_name')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput
                        }}
                    />
                    <TextInput
                        withAsterisk
                        required
                        label="Contact Number"
                        type="number"
                        {...form.getInputProps('company_contact_number')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput
                        }}
                    />
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Company Address"
                        {...form.getInputProps('company_address')}
                        readOnly
                        styles={{
                            input: classes.readOnlyInput
                        }}
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

                <Group my={10} grow>
                    <Text size="lg" weight="bolder">
                        Employment Details
                    </Text>
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Site/Place of Employment"
                        type="text"
                        // onInput={praNameHandler}
                        {...form.getInputProps('site_employment')}
                    />
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Contract Duration/Term of Employment"
                        type="text"
                        placeholder="in years (1, 2)"
                        // onInput={praNameHandler}
                        {...form.getInputProps('contract_duration')}
                    />

                    <Select
                        required
                        withAsterisk
                        label="Employment Terms"
                        // placeholder="Labor and Employment faciliation services"
                        data={contract_terms}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...form.getInputProps('contract_terms')}
                    />
                </Group>

                <Group position="center" grow>
                    <Select
                        required
                        withAsterisk
                        label="Bonus"
                        // placeholder="Labor and Employment faciliation services"
                        data={work_bonus_salary_increase}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...form.getInputProps('bonus')}
                    />

                    <Select
                        required
                        withAsterisk
                        label="Salary Increase"
                        // placeholder="Labor and Employment faciliation services"
                        data={work_bonus_salary_increase}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...form.getInputProps('salary_increase')}
                    />
                </Group>

                <Group position="center" mt={10} grow>
                    <Text size="lg" weight="bolder">
                        Working Hours
                    </Text>
                </Group>

                <Group position="center" mt={10} grow>
                    <TimeInput
                        required
                        label="Start Time"
                        placeholder="Pick time"
                        icon={<Clock size={16} />}
                        // set defaultValue with new Date 8 am
                        // defaultValue={
                        //     new Date(dayJS8am.format('YYYY-MM-DD HH:mm:ss'))
                        // }
                        {...form.getInputProps('work_start_time')}
                    />

                    <TimeInput
                        required
                        label="End Time"
                        placeholder="Pick time"
                        icon={<Clock size={16} />}
                        // defaultValue={
                        //     new Date(dayJS5pm.format('YYYY-MM-DD HH:mm:ss'))
                        // }
                        {...form.getInputProps('work_end_time')}
                    />
                </Group>

                <Group position="center" mt={10} grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Rest Period (in minutes)"
                        // placeholder="e.g 1 year, 2 years"
                        type="number"
                        // defaultValue={60}
                        {...form.getInputProps('work_rest')}
                    />
                    <NativeSelect
                        label="Regular Working Days"
                        // placeholder="Pick one"
                        withAsterisk
                        required
                        searchable="true"
                        data={work_days}
                        // defaultValue={work_days[0]}
                        {...form.getInputProps('work_working_days')}
                    />

                    <NativeSelect
                        label="Regular Days Off"
                        // placeholder="Pick one"
                        withAsterisk
                        required
                        searchable="true"
                        data={days_off}
                        // defaultValue={days_off[0]}
                        {...form.getInputProps('work_days_off')}
                    />
                </Group>

                <Group position="center" mt={10} grow>
                    <Text size="lg" weight="bolder">
                        Personal Time Off / Leave
                    </Text>
                </Group>

                <Group position="center" mt={10} grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Vacation/Sick Leave"
                        placeholder="e.g 10 days, 15 days"
                        type="text"
                        {...form.getInputProps('work_leave')}
                    />

                    <TextInput
                        // withAsterisk
                        // required
                        label="Other Leave"
                        placeholder="Optional"
                        type="text"
                        {...form.getInputProps('work_other_leave')}
                    />
                </Group>

                <Group position="center" mt={10} grow>
                    <Text size="lg" weight="bolder">
                        Job Description
                    </Text>
                </Group>

                <Group position="center" mt={10} grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Job Position/Title"
                        type="text"
                        {...form.getInputProps('job_title')}
                    />
                </Group>
                <Group position="center" mt={10} grow>
                    <Textarea
                        withAsterisk
                        required
                        label="Job Description"
                        type="text"
                        {...form.getInputProps('job_description')}
                        minRows={3}
                    />
                </Group>
                <Group position="center" mt={10} grow>
                    <Textarea
                        withAsterisk
                        required
                        label="Job Duties"
                        placeholder="use ';' to split each duties."
                        type="text"
                        minRows={4}
                        error="use ';' to split each duties."
                        {...form.getInputProps('job_duties')}
                    />
                </Group>

                <Group position="center" mt={10} grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Degree/Study"
                        placeholder="Computer Engineering"
                        type="text"
                        {...form.getInputProps('job_criteria_degree')}
                    />

                    <NativeSelect
                        label="JLPT Level"
                        // placeholder="Pick one"
                        withAsterisk
                        required
                        searchable="true"
                        data={jlpt_level}
                        {...form.getInputProps('job_criteria_jlpt_level')}
                    />

                    <NativeSelect
                        label="Minimum Work Experience"
                        // placeholder="Pick one"
                        withAsterisk
                        required
                        searchable="true"
                        data={min_year_exp}
                        {...form.getInputProps('job_criteria_year_exp')}
                    />
                </Group>

                <Group position="center" mt={10} grow>
                    <Textarea
                        label="Other Qualifications"
                        placeholder="use ; to split qualifications"
                        type="text"
                        {...form.getInputProps('job_criteria_other')}
                    />
                </Group>

                <Group position="center" mt={10} grow>
                    <Text size="lg" weight="bolder">
                        Salary Scheme/Breakdown
                    </Text>
                </Group>

                <Text>Basic Salary</Text>

                <Group position="center" my={5} grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Basic Monthly Salary"
                        placeholder="(in Yen) 250,000.00 "
                        type="text"
                        {...form.getInputProps('job_basic_salary')}
                    />

                    <TextInput
                        withAsterisk
                        required
                        placeholder="(in Yen) 215,000.00 "
                        label="Net Salary"
                        type="text"
                        {...form.getInputProps('job_net_salary')}
                    />

                    <TextInput
                        withAsterisk
                        required
                        placeholder="(in Yen) 35,000.00 "
                        label="Total Deduction"
                        type="text"
                        {...form.getInputProps('job_total_deductions')}
                    />
                </Group>

                <Text>Approximate Deductions</Text>

                <Group position="center" my={5} grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Income Tax"
                        placeholder="(in Yen) 4,000.00 "
                        type="text"
                        {...form.getInputProps('job_income_tax')}
                    />

                    <TextInput
                        withAsterisk
                        required
                        label="Social Insurance"
                        type="text"
                        placeholder="(in yen) 35,000.00 "
                        {...form.getInputProps('job_social_insurance')}
                    />
                </Group>

                <Group position="center" my={5} grow>
                    <TextInput
                        label="Housing/Accomodation"
                        type="text"
                        placeholder="Optional"
                        {...form.getInputProps('job_accomodation')}
                    />

                    <TextInput
                        label="Utility"
                        type="text"
                        placeholder="Optional"
                        {...form.getInputProps('job_utilities')}
                    />
                </Group>

                <Text>Other Allowances/Benefits</Text>

                <Group position="center" my={5} grow>
                    <TextInput
                        withAsterisk
                        label="Housing/Accomodation"
                        type="text"
                        placeholder="(in yen) e.g 40,000.00"
                        {...form.getInputProps('housing_accomodation')}
                    />

                    <TextInput
                        withAsterisk
                        label="Accomodation Utilities"
                        placeholder="(in yen) e.g 30,000.00"
                        type="text"
                        {...form.getInputProps('accomodation_utilities')}
                    />

                    <TextInput
                        withAsterisk
                        label="Commutation/Transportation"
                        placeholder="(in yen) e.g 10,000.00"
                        type="text"
                        {...form.getInputProps('transportation')}
                    />
                </Group>

                <Group position="center" my={5} grow>
                    <TextInput
                        label="Other Benefits"
                        placeholder="(optional) use ; to split other benefits"
                        type="text"
                        {...form.getInputProps('other_benefits')}
                        // defaultValue=""
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
                        Create Employment Contract
                    </Button>
                </Group>
            </form>
        </>
    );
};

export default NewContracts;
