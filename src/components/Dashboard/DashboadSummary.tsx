import {
    createStyles,
    UnstyledButton,
    Text,
    Paper,
    ThemeIcon,
    SimpleGrid,
    Group
} from '@mantine/core';

import { useState } from 'react';
import dayjs from 'dayjs';
import {
    Swimming,
    Bike,
    Run,
    ChevronDown,
    ChevronUp,
    Briefcase,
    Certificate,
    Tool,
    ArrowUpRight,
    ArrowDownRight,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    rootSummary: {
        display: 'flex',
        backgroundImage: `linear-gradient(-60deg, ${
            theme.colors[theme.primaryColor][4]
        } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
        padding: theme.spacing.xl * 1.5,
        borderRadius: theme.radius.md,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column'
        }
    },

    title: {
        color: theme.white,
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: theme.fontSizes.sm
    },

    count: {
        color: theme.white,
        fontSize: 32,
        lineHeight: 1,
        fontWeight: 700,
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        fontSize: theme.fontSizes.sm,
        marginTop: 5
    },

    statSummary: {
        flex: 1,

        '& + &': {
            paddingLeft: theme.spacing.xl,
            marginLeft: theme.spacing.xl,
            borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

            [theme.fn.smallerThan('sm')]: {
                paddingLeft: 0,
                marginLeft: 0,
                borderLeft: 0,
                paddingTop: theme.spacing.xl,
                marginTop: theme.spacing.xl,
                borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`
            }
        }
    },

    // controls
    root: {
        backgroundImage: `linear-gradient(-60deg, ${
            theme.colors[theme.primaryColor][4]
        } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        display: 'flex',

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column'
        }
    },

    icon: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.lg,
        color: theme.colors[theme.primaryColor][6]
    },

    statControl: {
        minWidth: 98,
        paddingTop: theme.spacing.xl,
        minHeight: 140,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: theme.white
    },

    label: {
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        color: theme.colors.gray[6],
        lineHeight: 1.2
    },

    value: {
        fontSize: theme.fontSizes.sm,
        fontWeight: 700,
        color: theme.colors[theme.primaryColor][6]
    },

    day: {
        fontSize: 44,
        fontWeight: 700,
        color: theme.white,
        lineHeight: 1,
        textAlign: 'center',
        marginBottom: 5,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`
    },

    month: {
        fontSize: theme.fontSizes.sm,
        color: theme.white,
        lineHeight: 1,
        textAlign: 'center'
    },

    controls: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: theme.spacing.xl * 2,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 0,
            marginBottom: theme.spacing.xl
        }
    },

    date: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    control: {
        height: 28,
        width: '100%',
        color: theme.colors[theme.primaryColor][2],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.radius.md,
        transition: 'background-color 50ms ease',

        [theme.fn.smallerThan('xs')]: {
            height: 34,
            width: 34
        },

        '&:hover': {
            backgroundColor: theme.colors[theme.primaryColor][5],
            color: theme.white
        }
    },

    controlIcon: {
        [theme.fn.smallerThan('xs')]: {
            transform: 'rotate(-90deg)'
        }
    },

    statsGridRoot: {
        padding: theme.spacing.xl * 1.5,
      },
    
    statsLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

interface StatsGroupProps {
    data: { title: string; stats: string; description: string }[];
}

export function StatsGroup({ data }: StatsGroupProps) {
    const { classes } = useStyles();
    const stats = data.map((stat) => (
        <div key={stat.title} className={classes.statSummary}>
            <Text className={classes.count}>{stat.stats}</Text>
            <Text className={classes.title}>{stat.title}</Text>
            <Text className={classes.description}>{stat.description}</Text>
        </div>
    ));
    return <div className={classes.rootSummary}>{stats}</div>;
}

const data = [
    { icon: Briefcase, label: 'Professional' },
    { icon: Certificate, label: 'Specified Skilled' },
    { icon: Tool, label: 'Technical Intern Trainee' }
];

export function StatsControls() {
    const { classes } = useStyles();
    const [date, setDate] = useState(new Date(2021, 9, 24));

    const stats = data.map((stat) => (
        <Paper
            className={classes.statControl}
            radius="md"
            shadow="md"
            p="xs"
            key={stat.label}
        >
            <stat.icon size={32} className={classes.icon} />
            <div>
                <Text className={classes.label}>{stat.label}</Text>
                <Text size="xs" className={classes.count}>
                    <span className={classes.value}>
                        {Math.floor(Math.random() * 6 + 4)} applicants
                    </span>{' '}
                    / 10km
                </Text>
            </div>
        </Paper>
    ));

    return (
        <div className={classes.root}>
            <div className={classes.controls}>
                <UnstyledButton
                    className={classes.control}
                    onClick={() =>
                        setDate((current) =>
                            dayjs(current).add(1, 'day').toDate()
                        )
                    }
                >
                    <ChevronUp className={classes.controlIcon} />
                </UnstyledButton>

                <div className={classes.date}>
                    <Text className={classes.day}>
                        {dayjs(date).format('DD')}
                    </Text>
                    <Text className={classes.month}>
                        {dayjs(date).format('MMMM')}
                    </Text>
                </div>

                <UnstyledButton
                    className={classes.control}
                    onClick={() =>
                        setDate((current) =>
                            dayjs(current).subtract(1, 'day').toDate()
                        )
                    }
                >
                    <ChevronDown className={classes.controlIcon} />
                </UnstyledButton>
            </div>
            <Group sx={{ flex: 1 }}>{stats}</Group>
        </div>
    );
}

interface StatsGridIconsProps {
    data: { title: string; value: string; diff: number; description: string; }[];
  }
  
export function StatsGridIcons({ data }: StatsGridIconsProps) {
const { classes } = useStyles();
const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
    <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
        <div>
            <Text
            color="dimmed"
            transform="uppercase"
            weight={700}
            size="xs"
            className={classes.statsLabel}
            >
            {stat.title}
            </Text>
            <Text weight={700} size="xl">
            {stat.value}
            </Text>
        </div>
        <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({ color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6] })}
            size={38}
            radius="md"
        >
            <DiffIcon size={28} />
        </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
        <Text component="span" color={stat.diff > 0 ? 'teal' : 'red'} weight={700}>
            {stat.diff}%
        </Text>{' '}
        {stat.diff > 0 ? 'increase' : 'decrease'} compared to last year
        </Text>
    </Paper>
    );
});

return (
    <div className={classes.statsGridRoot}>
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {stats}
    </SimpleGrid>
    </div>
);
}