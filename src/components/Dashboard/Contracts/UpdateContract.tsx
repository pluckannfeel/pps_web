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
    Select,
    Textarea
} from '@mantine/core';
import CustomLoadOverlay from '../../ui/LoadOverlay';
import { showNotification } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';

import {
    Contract,
    fetchRequestContracts
} from '../../../redux/features/contractSlice';
import {
    contract_terms,
    days_off,
    housing_accomodation,
    jlpt_level,
    min_year_exp,
    utilities,
    work_bonus_salary_increase,
    work_days
} from './ContractOptions';
import dayjs from 'dayjs';
import {
    Company,
    fetchRequestCompanies
} from '../../../redux/features/companySlice';
import { useAppDispatch, useAppSelector } from '../../../redux/app/rtk-hooks';
import { useStyles } from './Contract';
import { useForm } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import { ChevronDown, Clock } from 'tabler-icons-react';
import { sectionTitleStyleProp } from '../../helpers/CssHelpers';
import { closeAllModals, closeModal } from '@mantine/modals';

type ContractFormProps = {
    contract_data?: Contract;
    // closeModal: () => void;
    user?: string | null;
};

const UpdateContract: React.FunctionComponent<ContractFormProps> = ({
    contract_data,
    user
}) => {
    // console.log(contract_data)

    const dayJS = dayjs();

    const dayJS8am = dayjs().set('hour', 8).set('minute', 0);
    // 5:00 pm
    const dayJS5pm = dayjs().set('hour', 17).set('minute', 0);

    // selected company
    const [selectedCompany, setSelectedCompany] = useState<Company>({
        id: contract_data!.company_id,
        name: contract_data!.company_name,
        // rep_name: application_data!.company_rep_name,
        // rep_position: application_data!.company_rep_position,
        // year_established: application_data!.company_year_established,
        address: contract_data!.company_address,
        contact_number: contract_data!.company_contact_number
        // website: application_data!.company_website,
        // registered_industry: application_data!.company_registered_industry,
        // services: application_data!.company_services,
        // contact_person_name: application_data!.company_contact_person_name,
        // contact_person_position:
        //     application_data!.company_contact_person_position,
        // contact_person_email: application_data!.company_contact_person_email
    } as unknown as Company);

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
    const contractSuccessMessage = useAppSelector(
        (state) => state.contract.success
    );

    const passData = {
        user: user
    };

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

        // console.log(value)

        setSelectedCompany(selectedCompanyObject!);

        // set the form values to the selected company object
        form.setValues({
            company_id: selectedCompanyObject!.id,
            company_name: selectedCompanyObject!.name,
            company_address: selectedCompanyObject!.address,
            company_contact_number: selectedCompanyObject!.contact_number
        });
    };

    const { classes } = useStyles();

    const form = useForm({
        initialValues: {
            id: contract_data!.id,
            worker_name: contract_data!.worker_name,
            company_id: contract_data!.company_id,
            company_name: contract_data!.company_name,
            company_address: contract_data!.company_address,
            company_contact_number: contract_data!.company_contact_number,
            agency_name: contract_data!.agency_name,
            agency_rep_name: contract_data!.agency_rep_name,
            agency_rep_position: contract_data!.agency_rep_position,
            agency_address: contract_data!.agency_address,
            site_employment: contract_data!.site_employment,
            contract_duration: contract_data!.contract_duration, // <num> <year(s)>
            contract_terms: contract_data!.contract_terms, // choose option but will be 'x' on pdf
            bonus: contract_data!.bonus, // once,twice,byperformance
            salary_increase: contract_data!.salary_increase, // once,twice,byperformance
            // work_start_time: new Date(dayJS8am.format('YYYY-MM-DD HH:mm:ss')), // 9:00 AM
            // work_start_time: new Date(contract_data!.work_start_time),
            work_start_time: contract_data!.work_start_time,
            // work_end_time: new Date(dayJS5pm.format('YYYY-MM-DD HH:mm:ss')), // 5:00 PM
            // work_end_time: new Date(contract_data!.work_end_time),
            work_end_time: contract_data!.work_end_time,
            work_rest: contract_data!.work_rest,
            work_working_days: contract_data!.work_working_days, // Tuesday to Saturday
            work_days_off: contract_data!.work_days_off, // Sunday & Monday
            work_leave: contract_data!.work_leave, // 15
            work_other_leave:
                contract_data!.work_other_leave === 'null'
                    ? ''
                    : contract_data!.work_other_leave,
            utilities: contract_data!.utilities,
            housing_accomodation: contract_data!.housing_accomodation,
            housing_cost: contract_data!.housing_cost,
            job_title: contract_data!.job_title,
            job_description: contract_data!.job_description,
            job_duties: contract_data!.job_duties, // list/object '',
            job_criteria_degree: contract_data!.job_criteria_degree,
            job_criteria_jlpt_level: contract_data!.job_criteria_jlpt_level,
            job_criteria_year_exp: contract_data!.job_criteria_year_exp,
            job_criteria_other:
                contract_data!.job_criteria_other === 'null'
                    ? ''
                    : contract_data!.job_criteria_other,
            job_basic_salary: contract_data!.job_basic_salary,
            job_total_deductions: contract_data!.job_total_deductions,
            job_income_tax: contract_data!.job_income_tax,
            job_social_insurance: contract_data!.job_social_insurance,
            job_utilities: contract_data!.job_utilities,
            job_accomodation: contract_data!.job_accomodation,
            job_net_salary: contract_data!.job_net_salary,
            benefits_housing: contract_data!.benefits_housing,
            benefits_utilities: contract_data!.benefits_utilities,
            benefits_transportation: contract_data!.benefits_transportation,
            benefits_other:
                contract_data!.benefits_other === 'null'
                    ? ''
                    : contract_data!.benefits_other // object e.g key : benefit name value: benefit value or contents
        },
        validate: (values: Contract) => ({
            benefits_other: !values.benefits_other.includes(';')
                ? 'Error processing other benefits field.'
                : null
            // application_type: values.application_type !== '' ? null : 'Please choose an application type.',
            // employer_category: values.employer_category !== '' ? null : 'Please choose an employer category.',
        })
    });

    const formSubmitHandler = (values: Contract) => {
        const passData = {
            id: contract_data!.id,
            user: user,
            company_id: selectedCompany.id
                ? selectedCompany.id
                : contract_data!.id,
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
            work_start_time: values.work_start_time, // changed as string in backend
            work_end_time: values.work_end_time, // changed as string in backend
            work_rest: values.work_rest,
            work_working_days: values.work_working_days,
            work_days_off: values.work_days_off,
            work_leave: values.work_leave,
            work_other_leave:
                values.work_other_leave === ''
                    ? 'null'
                    : values.work_other_leave,
            utilities: values.utilities,
            housing_accomodation: values.housing_accomodation,
            housing_cost: values.housing_cost,
            job_title: values.job_title,
            job_description: values.job_description,
            job_duties: values.job_duties,
            job_criteria_degree: values.job_criteria_degree,
            job_criteria_jlpt_level: values.job_criteria_jlpt_level,
            job_criteria_year_exp: values.job_criteria_year_exp,
            job_criteria_other:
                values.job_criteria_other === 'null'
                    ? ''
                    : values.job_criteria_other,
            job_basic_salary: values.job_basic_salary,
            job_total_deductions: values.job_total_deductions,
            job_income_tax: values.job_income_tax,
            job_social_insurance: values.job_social_insurance,
            job_utilities: values.job_utilities,
            job_accomodation: values.job_accomodation,
            job_net_salary: values.job_net_salary,
            benefits_housing: values.benefits_housing,
            benefits_utilities: values.benefits_utilities,
            benefits_transportation: values.benefits_transportation,
            benefits_other:
                values.benefits_other === '' ? 'null' : values.benefits_other
        };

        dispatch(
            fetchRequestContracts({
                url: 'http://localhost:8000/contracts/update',
                method: 'PUT',
                body: passData
            })
        );

        // console.log(passData);

        closeAllModals();

        if (!contractLoading && contractError) {
            showNotification({
                id: 'add-contract-error',
                title: 'Error Updated Contract.',
                message: contractError,
                color: 'red',
                autoClose: 5000,
                icon: <Cross1Icon />
            });
        }

        if (contractSuccessMessage && !contractError) {
            showNotification({
                id: 'add-contract-success',
                title: 'Updated Contract.',
                message: contractSuccessMessage,
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
                <Group position="center" mb={15}>
                    <Text sx={sectionTitleStyleProp}>
                        Update Employment Contract
                    </Text>
                </Group>

                <Group position="center" mb={10} grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Worker's Name"
                        {...form.getInputProps('worker_name')}
                        type="text"
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
                        styles={{ rightSection: { pointerEvents: 'none' } }}
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
                        type="number"
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
                        styles={{ rightSection: { pointerEvents: 'none' } }}
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
                        styles={{ rightSection: { pointerEvents: 'none' } }}
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
                        styles={{ rightSection: { pointerEvents: 'none' } }}
                        {...form.getInputProps('salary_increase')}
                    />
                </Group>

                <Group position="center" mt={10} grow>
                    <Text size="lg" weight="bolder">
                        Working Hours
                    </Text>
                </Group>

                <Group position="center" mt={10} grow>
                    {/* <TimeInput
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
                    /> */}

                    <TextInput
                        withAsterisk
                        required
                        type="text"
                        label="Start Time"
                        placeholder="0:00 AM/PM"
                        icon={<Clock size={16} />}
                        {...form.getInputProps('work_start_time')}
                    />

                    <TextInput
                        withAsterisk
                        required
                        type="text"
                        label="End Time"
                        placeholder="0:00 AM/PM"
                        icon={<Clock size={16} />}
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
                        type="number"
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
                        Utility (Electricity/Water/Gas), Subsidized
                        Housing/Accomodation
                    </Text>
                </Group>

                <Group position="center" mt={10} grow>
                    <Select
                        required
                        withAsterisk
                        label="Utility Option "
                        // placeholder="Labor and Employment faciliation services"
                        data={utilities}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        styles={{ rightSection: { pointerEvents: 'none' } }}
                        {...form.getInputProps('utilities')}
                    />

                    <Select
                        required
                        withAsterisk
                        label="Housing Option"
                        // placeholder="Labor and Employment faciliation services"
                        data={housing_accomodation}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...form.getInputProps('housing_accomodation')}
                    />

                    <TextInput
                        withAsterisk
                        required
                        label="Housing Cost"
                        // placeholder="0"
                        type="number"
                        {...form.getInputProps('housing_cost')}
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
                        maxLength={260}
                        {...form.getInputProps('job_description')}
                        minRows={3}
                    />
                </Group>
                <Group position="center" mt={10} grow>
                    <Textarea
                        withAsterisk
                        required
                        label="Job Duties"
                        maxLength={900}
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
                        type="number"
                        {...form.getInputProps('job_basic_salary')}
                    />

                    <TextInput
                        withAsterisk
                        required
                        placeholder="(in Yen) 215,000.00 "
                        label="Net Salary"
                        type="number"
                        {...form.getInputProps('job_net_salary')}
                    />

                    <TextInput
                        withAsterisk
                        required
                        placeholder="(in Yen) 35,000.00 "
                        label="Total Deduction"
                        type="number"
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
                        type="number"
                        {...form.getInputProps('job_income_tax')}
                    />

                    <TextInput
                        withAsterisk
                        required
                        label="Social Insurance"
                        type="number"
                        placeholder="(in yen) 35,000.00 "
                        {...form.getInputProps('job_social_insurance')}
                    />
                </Group>

                <Group position="center" my={5} grow>
                    <TextInput
                        label="Housing/Accomodation"
                        type="number"
                        placeholder="Optional"
                        {...form.getInputProps('job_accomodation')}
                    />

                    <TextInput
                        label="Utility"
                        type="number"
                        placeholder="Optional"
                        {...form.getInputProps('job_utilities')}
                    />
                </Group>

                <Text>Other Allowances/Benefits</Text>

                <Group position="center" my={5} grow>
                    <TextInput
                        withAsterisk
                        label="Housing/Accomodation"
                        type="number"
                        placeholder="(in yen) e.g 40,000.00"
                        {...form.getInputProps('benefits_housing')}
                    />

                    <TextInput
                        withAsterisk
                        label="Accomodation Utilities"
                        placeholder="(in yen) e.g 30,000.00"
                        type="number"
                        {...form.getInputProps('benefits_utilities')}
                    />

                    <TextInput
                        withAsterisk
                        label="Commutation/Transportation"
                        placeholder="(in yen) e.g 10,000.00"
                        type="number"
                        {...form.getInputProps('benefits_transportation')}
                    />
                </Group>

                <Group position="center" my={5} grow>
                    <TextInput
                        label="Other Benefits"
                        placeholder="(optional) use ; to split other benefits"
                        type="text"
                        {...form.getInputProps('benefits_other')}
                        // defaultValue=""
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
                        Update Contract
                    </Button>
                </Group>
            </form>
        </>
    );
};

export default UpdateContract;
