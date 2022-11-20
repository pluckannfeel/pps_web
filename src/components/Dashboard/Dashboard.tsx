import { Box, Divider, Paper, Text } from '@mantine/core';
import React, { Fragment } from 'react';
import { StatsControls, StatsGroup } from './DashboadSummary';
import { useStyles } from '../StylesConfig/Dashboard';

type dashboardProps = {
    user?: string | null;
};

const data = [
    {
        title: 'Professionals',
        stats: '15',
        description: 'Professional and Skilled Workers'
    },
    {
        title: 'HouseKeepers',
        stats: '15',
        description: 'Housekeepers under national strategic special zones'
    },
    { title: 'SSWs', stats: '15', description: 'Specified Skilled Workers' },
    {
        title: 'Trainees',
        stats: '15',
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

                <Paper className={styles.classes.container}>
                    <StatsControls />
                </Paper>
            </Box>
        </React.Fragment>
    );
};

export default Dashboard;
