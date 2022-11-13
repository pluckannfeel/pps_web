import React, { useState } from 'react';
import { Center, Text, Box, Title, Divider } from '@mantine/core';

type profileProps = {
    user?: string | null;
};

const Profile: React.FunctionComponent<profileProps> = ({ user }) => {
    return (
        <React.Fragment>
            <Box
                sx={(theme) => ({
                    textalign: 'center',
                    cursor: 'pointer',
                    padding: theme.spacing.md
                })}
            >
                <Title order={1}>User Profile</Title>
                <Divider my="sm" />
            </Box>
            <Center>
                <Text>Profile</Text>
            </Center>
        </React.Fragment>
    );
};

export default Profile;
