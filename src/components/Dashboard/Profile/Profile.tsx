import React, { useEffect, useRef, useState } from 'react';
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
    Paper
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
import { useHover } from '@mantine/hooks';

type profileProps = {
    user?: string | null;
};

interface UserInfoIconsProps {
    avatar: string;
    name: string;
    phone: string;
    email: string;
}

// const userChangePhotoMenuData = [
//     { label: 'upload_new', desc: 'Upload New Photo', image: 'PhotoPlus' },
//     { label: 'gallery', desc: 'Recent Photos', image: 'Photo' }
// ]

const UserInfoIcons: React.FC<UserInfoIconsProps> = ({
    avatar,
    name,
    phone,
    email
}) => {
    const [changeUserPhotoItem, setChangeUserPhotoItem] = useState<
        string | null
    >(null);
    const { classes } = useStyles();

    return (
        <Box>
            <Group noWrap>
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Avatar src={avatar} size={128} radius="lg" />
                    </Menu.Target>
                    <Menu.Dropdown>
                        {/* <Menu.Label>Options</Menu.Label> */}

                        <Menu.Item
                            onClick={() => {
                                setChangeUserPhotoItem('upload');
                            }}
                            icon={<PhotoPlus size={14} />}
                        >
                            Upload New Photo
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                setChangeUserPhotoItem('gallery');
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
                        {name}
                    </Text>

                    <Group noWrap spacing={10} mt={3}>
                        <At
                            size={20}
                            strokeWidth={1.5}
                            className={classes.icon}
                        />
                        <Text size="xs">{email}</Text>
                    </Group>

                    <Group noWrap spacing={10} mt={5}>
                        <Phone
                            size={20}
                            strokeWidth={1.5}
                            className={classes.icon}
                        />
                        <Text size="xs">
                            {phone ? phone : 'No phone number'}
                        </Text>
                    </Group>
                </div>
            </Group>
        </Box>
    );
};

const Profile: React.FunctionComponent<profileProps> = ({ user }) => {
    // retrieve user img
    const {
        loading,
        error,
        sendRequest: sendUserImgRequest
    } = useHttpRequest();

    const [userInfo, setUserInfo] = useState({
        avatar: '',
        name: '',
        title: '',
        email: '',
        phone: '',
        isVerified: ''
    });

    const { classes } = useStyles();

    useEffect(() => {
        sendUserImgRequest(
            {
                url: `http://localhost:8000/users/get_user_credentials/?username=${user}`
            },
            (data: any) => {
                setUserInfo((prevState) => {
                    return {
                        ...prevState,
                        avatar: data.img_url
                            ? detectLocalPath(data.img_url)
                            : '',
                        name: `${data.first_name} ${data.last_name}`,
                        email: data.email,
                        phone: '+123 456 7890',
                        isVerified: data.is_verified
                    };
                });
            }
        );
    }, []);

    return (
        <React.Fragment>
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
                    <UserInfoIcons {...userInfo} />
                </Group>
                <Divider mt={25} />

                <Group mb={25} mt={25} position="center">
                    <Text className={classes.profileText} fw={500} size="xl">
                        Update Information
                    </Text>
                </Group>

                <ProfileForm />
            </Box>
        </React.Fragment>
    );
};

export default Profile;
