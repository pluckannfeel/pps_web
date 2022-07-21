import {
    ActionIcon,
    useMantineColorScheme,
    SimpleGrid,
    Group,
    Text,
    Button
} from '@mantine/core';
import { Sun, MoonStars, World } from 'tabler-icons-react';
import useStyles from '../StylesConfig';
import UserLoginHeadline from './UserLoginHeadline';
import UserLoginForm from './UserLoginForm';

const UserLogin = () => {
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <div className={classes.wrapper}>
            <div className={classes.child}>
                <Group direction="row" spacing="sm" position="left">
                    <ActionIcon
                        variant="outline"
                        color={dark ? 'yellow' : 'blue'}
                        onClick={() => toggleColorScheme()}
                        title="Toggle Color Scheme"
                    >
                        {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                    </ActionIcon>

                    <Button
                        size='xs'
                        variant="outline"
                        color={dark ? 'yellow' : 'blue'}
                        // onClick={() => toggleColorScheme()}
                        title="Toggle Color Scheme"
                        leftIcon={<World/>}
                    >
                        {/* {dark ? <Sun size={18} /> : <MoonStars size={18} />} */}
                        {/* <World size={18}/> */}
                        ENG
                    </Button>
                </Group>

                <SimpleGrid
                    cols={2}
                    spacing="xs"
                    breakpoints={[
                        { maxWidth: 900, cols: 1 },
                        { maxWidth: 1200, cols: 2 }
                    ]}
                    sx={{ minHeight: '93vh' }}
                >
                    <UserLoginHeadline />
                    <UserLoginForm />
                </SimpleGrid>
            </div>
        </div>
    );
};

export default UserLogin;
