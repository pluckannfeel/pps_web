import React, { useState, useContext } from 'react';
import {
    Navbar,
    Group,
    Code,
    ScrollArea,
    UnstyledButton,
    Box,
    ThemeIcon,
    Text,
    Collapse,
    Image,
    NavLink
} from '@mantine/core';

// radix icons
import {
    GearIcon,
    RocketIcon,
    AvatarIcon,
    Pencil2Icon,
    ExitIcon
} from '@radix-ui/react-icons';

import useStyles from '../StylesConfig/WorskpaceNavbar';
import Logo from '../ui/Logo';
import UserAuthContext from '../store/auth-context';
import { UserAuthContextProps } from '../store/auth-props';

interface mainNavbarProps {
    onLogout: () => void;
    opened: boolean;
}

const links = [
    {
        icon: RocketIcon,
        name: 'Dashboard',
        description: 'Application Overview, Graphs and Stats',
        rightSection: '',
        tabId: 'dashboard'
    },
    {
        icon: Pencil2Icon,
        name: 'Application',
        description: 'Generate, Edit Application',
        rightSection: '',
        tabId: 'application',
        childrenOffset: 28,
        subLinks: [
            { name: 'Generate', parent: 'application', tabId: 'generate' },
            { name: 'Edit', parent: 'application', tabId: 'edit' }
        ]
    },
    {
        icon: AvatarIcon,
        name: 'Profile',
        description: 'Account Profile',
        rightSection: '',
        tabId: 'profile'
    },
    {
        icon: GearIcon,
        name: 'Settings',
        description: 'Account Settings',
        rightSection: '',
        tabId: 'settings',
        childrenOffset: 28,
        subLinks: [
            {
                name: 'Change Password',
                parent: 'settings',
                tabId: 'change_password'
            }
            // { name: 'Edit', tabId: 'edit' }
        ]
    }
];

const WorkspaceNavbar: React.FunctionComponent<mainNavbarProps> = (props) => {
    const authCtx = useContext(UserAuthContext) as UserAuthContextProps;
    const { classes } = useStyles();

    const [linkActive, setLinkActive] = useState<null | number>(0);
    // const [tabId, setTabId] = useState('');

    const navLinkClickHandler = (index: number, tabId: string) => {
        console.log(index);
        setLinkActive(index);
        authCtx.setActiveTab(tabId);
    };

    const navSubLinkClickHandler = (index: number, tabId: string) => {
        setLinkActive(index)
        authCtx.setActiveTab(tabId);
    };

    const items = links.map((item, index) => (
        <NavLink
            key={item.name}
            active={index === linkActive}
            label={item.name}
            description={item.description}
            rightSection={item.rightSection}
            icon={<item.icon />}
            onClick={navLinkClickHandler.bind(null, index, item.tabId)}
            variant="filled"
            childrenOffset={item.childrenOffset}
            defaultOpened
        >
            {item.subLinks &&
                item.subLinks.map(
                    (subItem, subIndex) => (
                        (
                            <NavLink
                                label={subItem.name}
                                key={subItem.name}
                                active={authCtx.activeTab === subItem.tabId}
                                onClick={() => {
                                    // index param is from parent navlink
                                    navSubLinkClickHandler(index, subItem.tabId);
                                } }
                            />
                        )
                    )
                )}
        </NavLink>
    ));

    // Same can be applied to Aside component with Aside.Section component
    return (
        <Navbar
            p="md"
            hiddenBreakpoint="sm"
            // hidden={!opened}
            className={classes.navbar}
            // width={{ sm: 200, lg: 300 }}'
            width={{ sm: 280 }}
            // height={820}
        >
            {/* First section with normal height (depends on section content) */}
            {/* <Navbar.Section>Dashboard</Navbar.Section> */}

            <Navbar.Section className={classes.header}>
                <Group position="apart">
                    <Image src={Logo} width={60} height={60} />
                    <Code sx={{ fontWeight: 700 }}>v0.1.1</Code>
                </Group>
            </Navbar.Section>

            {/* Grow section will take all available space that is not taken by first and last sections */}
            {/* <Navbar.Section grow>Grow section</Navbar.Section> */}

            <Navbar.Section
                grow
                className={classes.links}
                component={ScrollArea}
            >
                {items}
            </Navbar.Section>

            {/* Last section with normal height (depends on section content) */}
            <Navbar.Section className={classes.links}>
                <NavLink
                    variant="subtle"
                    icon={<ExitIcon fontSize={20} stroke="1.5" />}
                    label="Logout"
                    onClick={props.onLogout}
                />
            </Navbar.Section>
        </Navbar>
    );
};

export default WorkspaceNavbar;
