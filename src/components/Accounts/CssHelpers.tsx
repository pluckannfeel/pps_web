import { CSSObject } from "@mantine/core";

export const headerTitleStyleProp: CSSObject = {
    // color: '#112D4E',
    fontSize: 72,
    fontWeight: 'bold',
    lineHeight: 1.2,
    '@media (max-width: 1200px)': {
        fontSize: 72
    },
    '@media (max-width: 1080px)': {
        fontSize: 64
    },
    '@media (max-width: 968px)': {
        fontSize: 56
    },
    '@media (max-width: 720px)': {
        fontSize: 42
    },
    '@media (max-width: 480px)': {
        fontSize: 36
    },
    '@media (max-width: 320px)': {
        fontSize: 24
    }
};

export const sectionTitleStyleProp: CSSObject = {
    // color: '#112D4E',
    fontSize: 36,
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
};

