import React, { useState } from 'react';
import { Center, Text } from '@mantine/core';

type profileProps = {
    user?: string | null;
};

const Profile: React.FunctionComponent<profileProps> = ({ user }) => {
    return (
        <React.Fragment>
            <Center>
                <Text>Profile</Text>
            </Center>
        </React.Fragment>
    );
};

export default Profile;
