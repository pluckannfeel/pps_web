import React from 'react';

import {
    Tabs,
    Tooltip,
    Modal,
    useMantineTheme,
    Group,
    Button,
    Table
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ApplicationForm from './ApplicationForm';
import SampleTable from './SampleTable';

type GenerateProps = {
    user?: string | null;
};



const Generate: React.FunctionComponent<GenerateProps> = () => {
    const theme = useMantineTheme();
    const [opened, { close, open }] = useDisclosure(false);

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                size="xl"
                overlayColor={
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2]
                }
                overlayOpacity={0.55}
                overlayBlur={3}
            >
                <ApplicationForm/>
            </Modal>

            <Group position="right">
                <Button onClick={open}>New Application</Button>
            </Group>

            <Tabs defaultValue="professional" orientation="horizontal">
                <Tabs.List>
                    <Tooltip label="Professional and Skilled Workers" withArrow>
                        <Tabs.Tab value="professional">
                            A. Professional and Skilled
                        </Tabs.Tab>
                    </Tooltip>

                    <Tooltip label="Specified Skilled Workers" withArrow>
                        <Tabs.Tab value="ssw">B. Specified Skilled</Tabs.Tab>
                    </Tooltip>

                    <Tooltip
                        label="Houskeepers under National Strategic Special Zones"
                        withArrow
                    >
                        <Tabs.Tab value="houskeepers">C. Houskeepers</Tabs.Tab>
                    </Tooltip>

                    <Tooltip label="Overseas Performing Artists" withArrow>
                        <Tabs.Tab value="artists">D. Artists</Tabs.Tab>
                    </Tooltip>

                    <Tooltip label="Technical Intern Trainee" withArrow>
                        <Tabs.Tab value="trainee">E. Trainee</Tabs.Tab>
                    </Tooltip>
                </Tabs.List>

                <Tabs.Panel value="professional">
                Professional and Skilled Workers Tab
                </Tabs.Panel>
                <Tabs.Panel value="ssw">
                    Specified Skilled Workers tab content

                    <SampleTable/>
                </Tabs.Panel>
                <Tabs.Panel value="houskeepers">
                    Settings tab content
                </Tabs.Panel>
            </Tabs>
        </>
    );
};

export default Generate;
