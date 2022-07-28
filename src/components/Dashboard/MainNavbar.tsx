import React, { useState } from 'react';
import { createStyles, Navbar, Group, Code } from '@mantine/core';
import {
    BellRinging,
    Fingerprint,
    Key,
    Settings,
    TwoFA,
    DatabaseImport,
    Receipt2,
    SwitchHorizontal,
    Logout
} from 'tabler-icons-react'

interface mainNavbarProps {
    opened: boolean;
}

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
      navbar: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
      },
  
      version: {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
          0.1
        ),
        color: theme.white,
        fontWeight: 700,
      },
  
      header: {
        paddingBottom: theme.spacing.md,
        marginBottom: theme.spacing.md * 1.5,
        borderBottom: `1px solid ${theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
          0.1
        )}`,
      },
  
      footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
          0.1
        )}`,
      },
  
      link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.white,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
  
        '&:hover': {
          backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
            0.1
          ),
        },
      },
  
      linkIcon: {
        ref: icon,
        color: theme.white,
        opacity: 0.75,
        marginRight: theme.spacing.sm,
      },
  
      linkActive: {
        '&, &:hover': {
          backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
            0.15
          ),
          [`& .${icon}`]: {
            opacity: 0.9,
          },
        },
      },
    };
  });
  
  const data = [
    { link: '', label: 'Notifications', icon: BellRinging },
    { link: '', label: 'Billing', icon: Receipt2 },
    { link: '', label: 'Security', icon: Fingerprint },
    { link: '', label: 'SSH Keys', icon: Key },
    { link: '', label: 'Databases', icon: DatabaseImport },
    { link: '', label: 'Authentication', icon: TwoFA },
    { link: '', label: 'Other Settings', icon: Settings },
  ];
  
  const MainNavbar: React.FunctionComponent<mainNavbarProps> = (props) => {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Billing');
  
    const links = data.map((item) => (
      <a
        className={cx(classes.link, { [classes.linkActive]: item.label === active })}
        href={item.link}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke='1.5' />
        <span>{item.label}</span>
      </a>
    ));
  
    return (
      <Navbar height={700} width={{ sm: 300 }} p="md" className={classes.navbar}>
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            {/* <MantineLogo size={28} inverted /> */}
            <Code className={classes.version}>v3.1.2</Code>
          </Group>
          {links}
        </Navbar.Section>
  
        <Navbar.Section className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <SwitchHorizontal className={classes.linkIcon} stroke="1.5" />
            <span>Change account</span>
          </a>
  
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <Logout className={classes.linkIcon} stroke="1.5" />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>
    );
  }

// const MainNavbar: React.FunctionComponent<mainNavbarProps> = (opened) => {
//     // Same can be applied to Aside component with Aside.Section component
//     return (
//         // <Navbar
//         //     p="md"
//         //     hiddenBreakpoint="sm"
//         //     hidden={!opened}
//         //     width={{ sm: 200, lg: 300 }}
//         // >
//         //     {/* First section with normal height (depends on section content) */}
//         //     {/* <Navbar.Section>Dashboard</Navbar.Section> */}

//         //     {/* Grow section will take all available space that is not taken by first and last sections */}
//         //     {/* <Navbar.Section grow>Grow section</Navbar.Section> */}

//         //     {/* Last section with normal height (depends on section content) */}
//         //     {/* <Navbar.Section>Last section</Navbar.Section> */}
//         // </Navbar>


//     );
// };

export default MainNavbar;
