import React, { useEffect, useState } from 'react';

import {
    Box,
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
    ActionIcon,
    Stack
} from '@mantine/core';

// icons
import { Edit, Sum, Trash, Download } from 'tabler-icons-react';

// mantine datatable
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import { useDisclosure } from '@mantine/hooks';
import NewContracts from './NewContracts';
import { useStyles } from './Contract';
import { useAppDispatch, useAppSelector } from '../../../redux/app/rtk-hooks';
import { fetchRequestContracts } from '../../../redux/features/contractSlice';
import { sortBy } from 'lodash';
import { openConfirmModal, openModal } from '@mantine/modals';
// import NewApplication from './NewApplication';

// import { useStyles } from './Application';

type ContractsProps = {
    user?: string | null;
};

const Contracts: React.FunctionComponent<ContractsProps> = ({ user }) => {
    const theme = useMantineTheme();
    const [opened, { close, open }] = useDisclosure(false);

    const passData = {
        user: user
    }

    const dispatch = useAppDispatch();

    const {loading, error} = useAppSelector((state) => state.contract)

    useEffect(() => {

        dispatch(
            fetchRequestContracts({
                url: 'http://localhost:8000/contracts/contract_list',
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
                <NewContracts closeModal={close} user={user} />
            </Modal>

            <Grid justify="space-around" pt={20}>
                <Grid.Col span="auto">
                    <Text fw={500} className={classes.contractText}>
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

            <Divider my={20} />
            
            {!loading && error ? <Text>Error Loading data table.</Text> : null}
            {!loading && !error && <ContractDataTable user={user} />}
        </>
    );
};

interface dataTableProp {
    //     closeModal: () => void;
    user?: string | null;
}

const PAGE_SIZE = 8;

const ContractDataTable: React.FunctionComponent<dataTableProp> = ({
    user
}) => {
    const data = useAppSelector((state) => state.contract.contracts);
    const fetching = useAppSelector((state) => state.contract.loading);

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

        console.log(new_record)

        const sortData = sortBy(new_record, sortStatus.columnAccessor);

        setRecords(
            sortStatus.direction === 'desc' ? sortData.reverse() : sortData
        );
    }, [page, setRecords, sortStatus]);

    // delete contract formevent handler
    const deleteContract = (id: string) => {
        const passData = {
            user,
            id,
        }

        dispatch(
            fetchRequestContracts({
                url: 'http://localhost:8000/contracts/delete',
                method: 'DELETE',
                body: passData
            })
        )
    }

    return (
        <Box>
            <DataTable
                records={records}
                //pagination
                totalRecords={data.length}
                recordsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={(p) => setPage(p)}
                fetching={fetching}
                loaderVariant='dots'
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                minHeight={180}
                noRecordsText="No contracts to show"
                withBorder
                borderRadius="md"
                withColumnBorders
                striped
                highlightOnHover
                columns={[
                    {
                        accessor: 'actions',
                        title: <Text>Actions</Text>,
                        textAlignment: 'center',
                        render: (contract) => (
                            <Group spacing={4} position="center" noWrap>
                                <ActionIcon
                                    color="orange"
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();

                                        // downloadPDF(application.id);
                                        // window.open(
                                        //     'http://localhost:8000/applications/generate?application_id=' +
                                        //     contract.id
                                        // );
                                    }}
                                >
                                    <Download size={16} />
                                </ActionIcon>

                                <ActionIcon
                                    color="blue"
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();

                                        openModal({
                                            title: 'Update Contract',
                                            size: 'xl',
                                            // closeOnClickOutside: false,
                                            // children: (
                                            //     // <UpdateApplication
                                            //     // application_data={application}
                                            //     //     user={user}
                                            //     // />
                                            // )
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
                                            title: `Are you sure you want to delete this contract?`,
                                            children: <></>,
                                            onConfirm: () => {
                                                deleteContract(contract.id)
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
                    // {
                    //     render: ({ id }) => `Document - ${id.split('-')[0]}`,
                    //     accessor: 'id',
                    //     sortable: true
                    //     // this column has a custom title
                    //     // title: '',
                    //     // right-align column
                    //     // textAlignment: 'right'
                    // },
                    {
                        accessor: 'job_title',
                        title: 'Job Title',
                        sortable: true
                    },
                    {
                        accessor: 'worker_name',
                        title: "Worker's Name",
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
                onRowClick={(contract) => {
                    return openModal({
                        title: `Contract Details`,
                        size: 'lg',
                        overlayOpacity: 0.55,
                        overlayBlur: 2,
                        children: (
                            <>
                            <Stack>
                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Job Title:
                                        </Text>
                                        <Text size="sm">
                                            {contract.job_title}
                                        </Text>
                                    </Group>

                                    <Group position="left">
                                        <Text
                                            className={classes.modalLabel}
                                            size="sm"
                                            weight="bolder"
                                        >
                                            Worker Name:
                                        </Text>
                                        <Text size="sm">
                                            {contract.worker_name}
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
                                            {contract.company_name}
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
                                            {contract.company_address}
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
                                            {contract.company_contact_number}
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
                                            {contract.agency_name}
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
                                            {contract.agency_address}
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
                                            {contract.agency_rep_position +
                                                ' - ' +
                                                contract.agency_rep_name}
                                        </Text>
                                    </Group>
                                </Stack>
                            </>
                        )
                    })
                }}
                
            />
        </Box>
    )
};

export default Contracts;
