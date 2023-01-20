import React from 'react';

import {
    Tabs,
    Tooltip,
    Modal,
    useMantineTheme,
    Group,
    Button,
    Table,
    Grid,
    Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import NewApplication from './NewApplication';

// import { useStyles } from './Application';

type ContractsProps = {
    user?: string | null;
};

const Contracts: React.FunctionComponent<ContractsProps> = ({user}) => {
    const theme = useMantineTheme();
    const [opened, { close, open }] = useDisclosure(false);

    // const {classes} = useStyles();
    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                size="xl"
                overlayColor={
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2]
                }
                overlayOpacity={0.55}
                overlayBlur={3}
            >
                {/* <NewApplication user={user}/> */}
            </Modal>

            <Grid justify="space-around" pt={20}>
                <Grid.Col span="auto">
                    <Text fw={500} 
                    // className={classes.applicationText}
                    >
                        Employment Contracts
                    </Text>
                </Grid.Col>
                <Grid.Col span={6}></Grid.Col>
                <Grid.Col span="auto">
                    <Group position="right">
                        <Button onClick={open}>New Contracts</Button>
                    </Group>
                </Grid.Col>
            </Grid>

        </>
    );
};

export default Contracts;

// NEW CONTRACTS
{/* <Group my={20} grow>
                    <Text italic size="lg" weight="bolder">
                        EMPLOYMENT CONTRACT
                    </Text>
                </Group>

                <Stack>
                    <Text size="lg" weight="bolder">
                        Represented in the Philippines By
                    </Text>

                    <Group position="left">
                        <Text
                            // className={classes.modalLabel}
                            size="md"
                            // weight="bolder"
                        >
                            Agency Name:
                        </Text>
                        <Text size="md">{pra.pra_name}</Text>
                    </Group>

                    <Group position="left">
                        {' '}
                        <Text
                            // className={classes.modalLabel}
                            size="md"
                            // weight="bolder"
                        >
                            Complete Address:
                        </Text>
                        <Text size="md">{pra.pra_address}</Text>
                    </Group>

                    <Text size="lg" weight="bolder">
                        Employer/Principal Details
                    </Text>

                    <Group position="left">
                        <Text
                            // className={classes.modalLabel}
                            size="md"
                            // weight="bolder"
                        >
                            Company Name:
                        </Text>
                        <Text size="md">{selectedCompany.name}</Text>

                        <Text
                            // className={classes.modalLabel}
                            size="md"
                            // weight="bolder"
                        >
                            Contact Number:
                        </Text>
                        <Text size="md">{selectedCompany.contact_number}</Text>
                    </Group>

                    <Group position="left">
                        <Text
                            // className={classes.modalLabel}
                            size="md"
                            // weight="bolder"
                        >
                            Company Address:
                        </Text>
                        <Text size="md">{selectedCompany.address}</Text>
                    </Group>
                </Stack>

                <Group position="center" mt={10} grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Site/Place of Employment"
                        type="text"
                        {...form.getInputProps('worksite')}
                    />
                </Group>

                <Group position="center" grow>
                    <TextInput
                        withAsterisk
                        required
                        label="Contract Duration (in years)"
                        placeholder="e.g 1 year, 2 years"
                        type="text"
                        {...form.getInputProps('work_duration')}
                    />
                    <Select
                        label="Term of Employment"
                        // placeholder="Pick one"
                        searchable="true"
                        data={employment_term}
                        {...form.getInputProps('work_term')}
                        withAsterisk
                        required
                    />
                </Group>

                <Group position="center" mt={10} grow>
                    <Select
                        label="Bonus"
                        // placeholder="Pick one"
                        searchable="true"
                        data={work_bonus}
                        withAsterisk
                        required
                        {...form.getInputProps('work_bonus')}
                    />
                    <Select
                        label="Salary Increase"
                        // placeholder="Pick one"
                        withAsterisk
                        required
                        searchable="true"
                        data={salary_increase}
                        {...form.getInputProps('work_salary_increase')}
                    />
                </Group>

                <Group position="center" mt={10} grow>
                    <Text size="lg" weight="bolder">
                        Working Hours
                    </Text>
                </Group>

                <Group position="center" mt={10} grow>
                    <TimeInput
                        label="Start Time"
                        placeholder="Pick time"
                        icon={<Clock size={16} />}
                        // set defaultValue with new Date 8 am
                        defaultValue={
                            new Date(dayJS8am.format('YYYY-MM-DD HH:mm:ss'))
                        }
                        {...form.getInputProps('work_start_time')}
                    />

                    <TimeInput
                        label="End Time"
                        placeholder="Pick time"
                        icon={<Clock size={16} />}
                        defaultValue={
                            new Date(dayJS5pm.format('YYYY-MM-DD HH:mm:ss'))
                        }
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
                        {...form.getInputProps('work_rest_period')}
                    />
                    <NativeSelect
                        label="Regular Working Days"
                        // placeholder="Pick one"
                        withAsterisk
                        required
                        searchable="true"
                        data={work_days}
                        {...form.getInputProps('work_workdays')}
                    />

                    <NativeSelect
                        label="Regular Days Off"
                        // placeholder="Pick one"
                        withAsterisk
                        required
                        searchable="true"
                        data={days_off}
                        {...form.getInputProps('work_daysoff')}
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
                        {...form.getInputProps('work_vacation_leave')}
                    />

                    <TextInput
                        // withAsterisk
                        // required
                        label="Other Leave"
                        placeholder="e.g Personal Leave, Maternity Leave, etc. (30 days)"
                        type="text"
                        {...form.getInputProps('work_other_leave')}
                    />
                </Group> */}
