import { Navbar } from '@mantine/core';
import React from 'react';

interface mainNavbarProps {
    opened: boolean
}

const MainNavbar: React.FunctionComponent<mainNavbarProps> = (opened) => {
    // Same can be applied to Aside component with Aside.Section component
    return (
        <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
        >
            {/* First section with normal height (depends on section content) */}
            <Navbar.Section>Dashboard</Navbar.Section>

            {/* Grow section will take all available space that is not taken by first and last sections */}
            <Navbar.Section grow>Grow section</Navbar.Section>

            {/* Last section with normal height (depends on section content) */}
            <Navbar.Section>Last section</Navbar.Section>
        </Navbar>
    );
};

export default MainNavbar;
