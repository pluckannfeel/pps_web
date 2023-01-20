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
    ActionIcon
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

// lodash
import sortBy from 'lodash/sortBy';
import { Edit, Sum, Trash } from 'tabler-icons-react';
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals';
import { sum } from 'lodash';

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

        const sortData = sortBy(new_record, sortStatus.columnAccessor);

        setRecords(
            sortStatus.direction === 'desc' ? sortData.reverse() : sortData
        );
    }, [page, setRecords, sortStatus]);

    // delete application

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
                minHeight={150}
                noRecordsText="No applications to show"
                withBorder
                borderRadius="md"
                withColumnBorders
                striped
                highlightOnHover
                // idAccessor="id"
                // define columns
                columns={[
                    //     {
                    //     accessor: 'actions',
                    //     title: <Text>Actions</Text>,
                    //     textAlignment: 'center',
                    //     render: (company) => (
                    //         <Group spacing={4} position="center" noWrap>
                    //             <ActionIcon
                    //                 color="blue"
                    //                 onClick={(e: React.MouseEvent) => {
                    //                     e.stopPropagation();
                    //                     // alert(JSON.stringify(company))
                    //                     // editInfo(company);
                    //                     openModal({
                    //                         title: 'Update Company',
                    //                         size: 'xl',
                    //                         children: (
                    //                             <UpdateCompany
                    //                                 company_data={company}
                    //                                 username={user}
                    //                             />
                    //                         )
                    //                     });
                    //                 }}
                    //             >
                    //                 <Edit size={16} />
                    //             </ActionIcon>
                    //             <ActionIcon
                    //                 color="red"
                    //                 onClick={(e: React.MouseEvent) => {
                    //                     e.stopPropagation();

                    //                     openConfirmModal({
                    //                         title: `Are you sure you want to delete ${company.name}?`,
                    //                         children: <></>,
                    //                         onConfirm: () => {
                    //                             deleteCompany(company.id);
                    //                         },
                    //                         labels: {
                    //                             confirm: 'Yes',
                    //                             cancel: 'Cancel'
                    //                         }
                    //                     });
                    //                     // deleteCompany(company);
                    //                 }}
                    //             >
                    //                 <Trash size={16} />
                    //             </ActionIcon>
                    //         </Group>
                    //     )
                    // },
                    {
                        render: ({ id }) =>
                            `Document - ${id.split('-')[0]}`,
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
                        accessor: 'agency_name',
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
                // onRowClick={(company) => {
                //     return openModal({
                //         title: `Company - ${company.name}`,
                //         size: 'lg',
                //         overlayOpacity: 0.55,
                //         overlayBlur: 2,
                //         // onClose: () => {
                //         //     closeAllModals();
                //         // },
                //         children: (
                //             <>
                //                 {/* <Stack>
                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Company Name:
                //                         </Text>
                //                         <Text size="sm">{company.name}</Text>
                //                     </Group>

                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Year Established:
                //                         </Text>
                //                         <Text size="sm">
                //                             {company.year_established.toString()}
                //                         </Text>
                //                     </Group>

                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Address:
                //                         </Text>
                //                         <Text size="sm">{company.address}</Text>
                //                     </Group>

                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Contact:
                //                         </Text>
                //                         <Text size="sm">
                //                             {company.contact_number}
                //                         </Text>
                //                     </Group>

                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Website:
                //                         </Text>
                //                         <Text color="blue" size="sm">
                //                             {company.website}
                //                         </Text>
                //                     </Group>

                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Registered Industry:
                //                         </Text>
                //                         <Text size="sm">
                //                             {company.registered_industry}
                //                         </Text>
                //                     </Group>

                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Services:
                //                         </Text>
                //                         <Text size="sm">
                //                             {company.services}
                //                         </Text>
                //                     </Group>

                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Representative:
                //                         </Text>
                //                         <Text size="sm">
                //                             {company.rep_position +
                //                                 ' - ' +
                //                                 company.rep_name}
                //                         </Text>
                //                     </Group>

                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Total Number of Workers:
                //                         </Text>
                //                         <Text size="sm">
                //                             {sum([
                //                                 company.regular_workers,
                //                                 company.parttime_workers,
                //                                 company.foreign_workers
                //                             ])}
                //                         </Text>
                //                     </Group>

                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Regular Workers:
                //                         </Text>
                //                         <Text size="sm">
                //                             {company.regular_workers}
                //                         </Text>
                //                     </Group>

                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Part Time Workers:
                //                         </Text>
                //                         <Text size="sm">
                //                             {company.parttime_workers}
                //                         </Text>
                //                     </Group>

                //                     <Group position="left">
                //                         <Text
                //                             className={classes.modalLabel}
                //                             size="sm"
                //                             weight="bolder"
                //                         >
                //                             Foreign Workers:
                //                         </Text>
                //                         <Text size="sm">
                //                             {company.foreign_workers}
                //                         </Text>
                //                     </Group>
                //                 </Stack> */}

                //                 {/* <Button
                //                     size="xs"
                //                     onClick={() => closeAllModals()}
                //                 >
                //                     Close
                //                 </Button> */}
                //             </>
                //         )
                //     });
                // }}
            />
        </Box>
    );
};

export default Applications;
