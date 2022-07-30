import { Text } from '@mantine/core';
import React, { Fragment } from 'react';

type dashboardProps = {
    user?: string | null;
};

const Dashboard: React.FunctionComponent<dashboardProps> = ({user}) => {
    return (
        <React.Fragment>
            <Text>{user}</Text>
        </React.Fragment>
    );
};

export default Dashboard;
