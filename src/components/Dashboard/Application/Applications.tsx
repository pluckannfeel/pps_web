import React, { useEffect, useState } from 'react';

import {
    Tabs,
    Tooltip,
    Modal,
    useMantineTheme,
    Group,
    Button,
    Table,
    Grid,
    Text,
    Divider,
    Box,
    ActionIcon,
    Stack
} from '@mantine/core';

// mantine datatable
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import { useDisclosure } from '@mantine/hooks';
import NewApplication from './NewApplication';

import { useStyles } from './Application';

// redux
import { useAppDispatch, useAppSelector } from '../../../redux/app/rtk-hooks';
import {
    Application,
    fetchRequestApplications
} from '../../../redux/features/applicationSlice';
import {
    fetchRequestCompanies,
} from '../../../redux/features/companySlice';

// lodash
import sortBy from 'lodash/sortBy';
import { Edit, Sum, Trash, Download } from 'tabler-icons-react';
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals';
import UpdateApplication from './UpdateApplication';

type ApplicationsProps = {
    user?: string | null;
};

const Applications: React.FunctionComponent<ApplicationsProps> = ({ user }) => {
    const theme = useMantineTheme();
    const [opened, { close, open }] = useDisclosure(false);

    const passData = {
        user: user
    };

    const dispatch = useAppDispatch();

    const { loading, error } = useAppSelector((state) => state.application);

    useEffect(() => {

        dispatch(
            fetchRequestApplications({
                url: 'http://localhost:8000/applications/application_list',
                method: 'POST',
                body: passData
            })
        );
    }, []);

    const { classes } = useStyles();
    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                closeOnClickOutside={false}
                size="xl"
                overlayColor={
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2]
                }
                overlayOpacity={0.55}
                overlayBlur={3}
            >
                <NewApplication user={user} closeModal={close} />
            </Modal>

            <Grid justify="space-around" pt={20}>
                <Grid.Col span="auto">
                    <Text fw={500} className={classes.applicationText}>
                        Applications
                    </Text>
                </Grid.Col>
                <Grid.Col span={6}></Grid.Col>
                <Grid.Col span="auto">
                    <Group position="right">
                        <Button onClick={open}>New Application</Button>
                    </Group>
                </Grid.Col>
            </Grid>

            <Divider my={20} />

            {!loading && error ? <Text>Error Loading data table.</Text> : null}
            {!loading && !error && <ApplicationDataTable user={user} />}
        </>
    );
};

interface dataTableProp {
    //     closeModal: () => void;
    user?: string | null;
}

const PAGE_SIZE = 8;

const ApplicationDataTable: React.FunctionComponent<dataTableProp> = ({
    user
}) => {
    const data = useAppSelector((state) => state.application.applications);
    const fetching = useAppSelector((state) => state.application.loading);

    const dispatch = useAppDispatch();

    const initial_record = data.slice(0, PAGE_SIZE);

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(sortBy(initial_record, 'name'));

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: '',
        direction: 'asc'
    });

    const { classes } = useStyles();

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        const new_record = data.slice(from, to);

        // console.log(new_record)

        const sortData = sortBy(new_record, sortStatus.columnAccessor);

        setRecords(
            sortStatus.direction === 'desc' ? sortData.reverse() : sortData
        );
    }, [page, setRecords, sortStatus]);

    // delete application
    const deleteApplication = (id: string) => {
        const passData = {  
            user: user,
            id: id
        };

        dispatch(
            fetchRequestApplications({
                url: 'http://localhost:8000/applications/delete',
                method: 'DELETE',
                body: passData
            })
        );

        // dispatch(
        //     fetchRequestCompanies({
        //         url: 'http://localhost:8000/companies/company_list',
        //         method: 'POST',
        //         body: {
        //             user: user
        //         }
        //     })
        // );
    };

    let minHeight;
    if (records.length > 0){
        minHeight = 130;
    }else{
        minHeight = 180;
    }

    return (
        <Box>
            <DataTable
                records={records}
                // pagination
                totalRecords={data.length}
                recordsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={(p) => setPage(p)}
                //
                fetching={fetching}
                loaderVariant="dots"
                //sorting
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                // default props
                minHeight={minHeight}
                noRecordsText="No applications to show"
                withBorder
                borderRadius="md"
                withColumnBorders
                striped
                highlightOnHover
                // idAccessor="id"
                // define columns
                columns={[
                    {
                        accessor: 'actions',
                        title: <Text>Actions</Text>,
                        textAlignment: 'center',
                        render: (application) => (
                            <Group spacing={4} position="center" noWrap>
                                <ActionIcon
                                    color="orange"
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();

                                        // downloadPDF(application.id);
                                        window.open(
                                            'http://localhost:8000/applications/generate?application_id=' +
                                                application.id
                                        );
                                    }}
                                >
                                    <Download size={16} />
                                </ActionIcon>

                                <ActionIcon
                                    color="blue"
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();

                                        openModal({
                                            title: 'Update Application',
                                            size: 'xl',
                                            // closeOnClickOutside: false,
                                            children: (
                                                <UpdateApplication
                                                application_data={application}
                                                    user={user}
                                                />
                                            )
                                        });
                                    }}
                                >
                                    <Edit size={16} />
                                </ActionIcon>
                                <ActionIcon
                                    color="red"
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();

                                        openConfirmModal({
                                            title: `Are you sure you want to delete this document?`,
                                            children: <></>,
                                            onConfirm: () => {
                                                deleteApplication(
                                                    application.id
                                                );
                                            },
                                            labels: {
                                                confirm: 'Yes',
                                                cancel: 'Cancel'
                                            }
                                        });
                                        // deleteCompany(company);
                                    }}
                                >
                                    <Trash size={16} />
                                </ActionIcon>
                            </Group>
                        )
                    },
                    {
                        render: ({ id }) => `Document - ${id.split('-')[0]}`,
                        accessor: 'id',
                        sortable: true
                        // this column has a custom title
                        // title: '',
                        // right-align column
                        // textAlignment: 'right'
                    },
                    {
                        accessor: 'application_type',
                        sortable: true
                    },
                    {
                        accessor: 'company_name',
                        title: 'Company Name',
                        sortable: true
                    },
                    {
                        accessor: 'agency_name',
                        title: '(PRA) Agency Name',
                        sortable: true
                    }

                    // {
                    //     render: ({ rep_name, rep_position }) =>
                    //         `${rep_position} - ${rep_name}`,
                    //     accessor: 'rep_name',
                    //     title: 'Representative',
                    //     sortable: true
                    // }

                    // actions
                ]}
                onRowClick={(application) => {
                    return openModal({
                        title: `Document Details`,
                        size: 'lg',
                        // closeOnClickOutside: false,
                        overlayOpacity: 0.55,
                        overlayBlur: 2,
                        // onClose: () => {
                        //     closeAllModals();
                        // },
                        children: (
                            <>
                                <Stack>
                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Type of Application:
                                        </Text>
                                        <Text size="sm">
                                            {application.application_type}
                                        </Text>
                                    </Group>

                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Employment Category:
                                        </Text>
                                        <Text size="sm">
                                            {application.employer_category}
                                        </Text>
                                    </Group>

                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Date and Place Filled:
                                        </Text>
                                        <Text size="sm">
                                            {application.date_filled +
                                                ' | ' +
                                                application.place_filled}
                                        </Text>
                                    </Group>

                                    <Divider mt={5} />

                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Company Name:
                                        </Text>
                                        <Text size="sm">
                                            {application.company_name}
                                        </Text>
                                    </Group>

                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Company Address:
                                        </Text>
                                        <Text size="sm">
                                            {application.company_address}
                                        </Text>
                                    </Group>

                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Contact Number:
                                        </Text>
                                        <Text size="sm">
                                            {application.company_contact_number}
                                        </Text>
                                    </Group>

                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Company Website:
                                        </Text>
                                        <Text color="blue" size="sm">
                                            {application.company_website}
                                        </Text>
                                    </Group>

                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Company Representative:
                                        </Text>
                                        <Text size="sm">
                                            {application.company_rep_position +
                                                ' - ' +
                                                application.company_rep_name}
                                        </Text>
                                    </Group>

                                    <Divider mt={5} />

                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Agency Name:
                                        </Text>
                                        <Text size="sm">
                                            {application.agency_name}
                                        </Text>
                                    </Group>

                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Agency Address:
                                        </Text>
                                        <Text size="sm">
                                            {application.agency_address}
                                        </Text>
                                    </Group>

                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Agency Representative:
                                        </Text>
                                        <Text size="sm">
                                            {application.agency_rep_position +
                                                ' - ' +
                                                application.agency_rep_name}
                                        </Text>
                                    </Group>
                                </Stack>

                                {/* <Button
                                    size="xs"
                                    onClick={() => closeAllModals()}
                                >
                                    Close
                                </Button> */}
                            </>
                        )
                    });
                }}
            />
        </Box>
    );
};

export default Applications;
