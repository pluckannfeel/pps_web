import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Center,
    Text,
    Box,
    Title,
    Divider,
    Avatar,
    Group,
    Menu,
    CSSObject,
    Paper,
    Modal,
    useMantineTheme
} from '@mantine/core';
import {
    At,
    BrandMailgun,
    ChevronDown,
    Phone,
    PhoneCall,
    PhoneCalling,
    Photo,
    PhotoPlus,
    Plus
} from 'tabler-icons-react';

// useStyles
import { useStyles } from '../../StylesConfig/Profile';
import useHttpRequest from '../../hooks/use-httprequest';
import { json } from 'stream/consumers';

import { detectLocalPath } from '../../helpers/Conversions';
import { sectionTitleStyleProp } from '../../helpers/CssHelpers';
import ProfileForm from './ProfileForm';
import { ClassNames } from '@emotion/react';
import { ButtonMenu } from '../../ui/buttonMenu';
import { useDisclosure, useHover } from '@mantine/hooks';
import { UploadPhotoModal } from './ProfileUploadPhotoModal';
import { useAppDispatch, useAppSelector } from '../../../redux/app/rtk-hooks';
import { fetchRequestProfileInfo } from '../../../redux/features/profileSlice';
import CustomLoadOverlay from '../../ui/LoadOverlay';

type profileProps = {
    user?: string | null;
};

type UserProps = {
    first_name: string;
    last_name: string;
    birth_date: Date | null;
    username: string;
    email: string;
    phone: string;
    img_url: string;
    is_verified: boolean;
};

type userInfoProps = {
    profileInfo: UserProps;
};

// const userChangePhotoMenuData = [
//     { label: 'upload_new', desc: 'Upload New Photo', image: 'PhotoPlus' },
//     { label: 'gallery', desc: 'Recent Photos', image: 'Photo' }
// ]

const UserInfoIcons: React.FC<userInfoProps> = ({ profileInfo }) => {
    const theme = useMantineTheme();
    const [opened, { close, open }] = useDisclosure(false);

    const { classes } = useStyles();

    return (
        <Box>
            <Modal
                title="New Photo"
                opened={opened}
                onClose={close}
                size="md"
                overlayColor={
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2]
                }
                overlayOpacity={0.55}
                overlayBlur={3}
            >
                <UploadPhotoModal user={profileInfo.email} closeModal={close} />
            </Modal>

            <Group noWrap>
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Avatar
                            src={profileInfo.img_url}
                            size={128}
                            radius="lg"
                        />
                    </Menu.Target>
                    <Menu.Dropdown>
                        {/* <Menu.Label>Options</Menu.Label> */}

                        <Menu.Item
                            onClick={open}
                            icon={<PhotoPlus size={14} />}
                        >
                            Upload New Photo
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                            }}
                            disabled
                            icon={<Photo size={14} />}
                        >
                            Recent Photos
                        </Menu.Item>
                        {/* <Menu.Item
                            icon={<Search size={14} />}
                            rightSection={
                                <Text size="xs" color="dimmed">
                                    ⌘K
                                </Text>
                            }
                        >
                            Search
                        </Menu.Item> */}

                        {/* <Menu.Divider />

                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                            Transfer my data
                        </Menu.Item>
                        <Menu.Item color="red" icon={<IconTrash size={14} />}>
                            Delete my account
                        </Menu.Item> */}
                    </Menu.Dropdown>
                </Menu>

                <div>
                    {/* <Text
                        size="xs"
                        sx={{ textTransform: 'uppercase' }}
                        weight={700}
                        color="dimmed"
                    >
                        {name}
                    </Text> */}

                    <Text size="xl" weight={500} className={classes.name}>
                        {`${profileInfo.first_name} ${profileInfo.last_name}`}
                    </Text>

                    <Group noWrap spacing={10} mt={3}>
                        <At
                            size={20}
                            strokeWidth={1.5}
                            className={classes.icon}
                        />
                        <Text size="xs">{profileInfo.email}</Text>
                    </Group>

                    <Group noWrap spacing={10} mt={5}>
                        <Phone
                            size={20}
                            strokeWidth={1.5}
                            className={classes.icon}
                        />
                        <Text size="xs">
                            {profileInfo.phone
                                ? profileInfo.phone
                                : 'No phone number'}
                        </Text>
                    </Group>
                </div>
            </Group>
        </Box>
    );
};

const Profile: React.FunctionComponent<profileProps> = ({ user }) => {
    useEffect(() => {
        dispatch(
            fetchRequestProfileInfo({
                url: `http://localhost:8000/users/get_user_credentials/?username=${user}`,
                method: 'GET',
                body: { user }
            })
        );
    }, []);

    const profileInfo = useAppSelector((state) => state.profile.profileInfo);

    const { loading } = useAppSelector((state) => state.profile);

    const { classes } = useStyles();

    const dispatch = useAppDispatch();

    // console.log(profileInfo)

    return (
        <React.Fragment>
            {loading && <CustomLoadOverlay />}
            <Box
                sx={(theme) => ({
                    textalign: 'center',
                    cursor: 'pointer',
                    padding: theme.spacing.md
                })}
            >
                <Text fw={500} className={classes.profileText}>
                    Profile
                </Text>

                {/* <Text>{user}</Text> */}
                <Group mt={25} position="left">
                    <UserInfoIcons profileInfo={{ ...profileInfo }} />
                </Group>
                <Divider mt={25} />

                <Group mb={25} mt={25} position="center">
                    <Text className={classes.profileText} fw={500} size="xl">
                        Update Information
                    </Text>
                </Group>

                {/* <ProfileForm data={profileInfo} /> */}
            </Box>
        </React.Fragment>
    );
};

export default Profile;
