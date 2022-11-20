import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
        top: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`
    },

    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
    },

    link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        paddingLeft: 31,
        marginLeft: 30,
        fontSize: theme.fontSizes.sm,
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        borderLeft: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
    },

    chevron: {
        transition: 'transform 200ms ease'
    }
}));

export default useStyles;
