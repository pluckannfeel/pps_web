import { sectionTitleStyleProp } from '../../helpers/CssHelpers';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    icon: {
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[8]
    },

    companyText: {
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[8],
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 1.2,
        '@media (max-width: 720px)': {
            fontSize: 28
        },
        '@media (max-width: 480px)': {
            fontSize: 24
        },
        '@media (max-width: 320px)': {
            fontSize: 22
        }
    },

    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`
    },

    form: {
        // maxWidth: '50vw',
        width: '40vw'
    },

    modal: { width: 300 },
    modalTitle: {
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[2]
                : theme.colors.gray[6],
        fontWeight: 700
    },
    modalLabel: { width: '160' }
}));
