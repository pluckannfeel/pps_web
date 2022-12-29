import { Box, Divider, Paper, Text, Group } from '@mantine/core';
import React, { Fragment } from 'react';
import { StatsControls, StatsGridIcons, StatsGroup } from './DashboadSummary';
import { useStyles } from '../StylesConfig/Dashboard';

type dashboardProps = {
    user?: string | null;
};

const statsGridData = [
    {
        title: 'Applicants',
        value: '82',
        diff: 128,
        description: 'Professional and Skilled Workers'
    },
    {
        title: 'Prospects',
        value: '4',
        diff: -23,
        description: 'Housekeepers under national strategic special zones'
    },
    {
        title: 'Completed',
        value: '18',
        diff: 13,
        description: 'Specified Skilled Workers'
    },
    {
        title: 'In Progress',
        value: '15',
        diff: 39,
        description:
            'Technical Intern Trainees Under unde Technical Intern Program'
    }
];


const Dashboard: React.FunctionComponent<dashboardProps> = ({ user }) => {
    const styles = useStyles();
    return (
        <React.Fragment>
            <Box p="lg">
                <Text fw={500} className={styles.classes.headerText}>
                    Dashboard Summary
                </Text>

                <Divider my={25} />

                <Group position='center'>
                    <Paper className={styles.classes.container}>
                        <StatsControls />
                    </Paper>

                    <Paper className={styles.classes.container}>
                        <StatsGridIcons data={statsGridData}/>
                    </Paper>
                </Group>
            </Box>
        </React.Fragment>
    );
};

export default Dashboard;
