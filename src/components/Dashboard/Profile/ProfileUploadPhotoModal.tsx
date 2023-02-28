import {
    Modal,
    FileInput,
    Button,
    Image,
    useMantineTheme,
    Paper,
    Group,
    CheckIcon
} from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useState, useEffect, useRef } from 'react';
import { Upload } from 'tabler-icons-react';
import { fileToBase64, getBase64 } from '../../helpers/Conversions';
import useHttpRequest from '../../hooks/use-httprequest';
import useFileHttpRequest from '../../hooks/use-httpfilerequest';
import { ButtonProgress } from '../../ui/ButtonWithLoadingProgress';
import axios from 'axios';

// redux
import { useAppDispatch, useAppSelector } from '../../../redux/app/rtk-hooks';
import { useDispatch } from 'react-redux';
import { fetchRequestProfileInfo } from '../../../redux/features/profileSlice';
import { closeAllModals, closeModal } from '@mantine/modals';

interface UploadPhotoModalProps {
    user: string;
    closeModal: () => void;
}

type userUploadPhotoType = {
    file: File;
};

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({ user, closeModal }) => {
    // redux
    const dispatch = useAppDispatch();

    const { loading, error } = useAppSelector((state) => state.profile);

    const [file, setFile] = useState<File | null>(null);
    // const refFile = useRef<File>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // button progress
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const interval = useInterval(
        () =>
            setProgress((current) => {
                if (current < 100) {
                    console.log(current);
                    return current + 1;
                }

                interval.stop();
                setLoaded(true);
                return 0;
            }),
        20
    );

    useEffect(() => {
        if (!file) {
            setPreview(null);
            setDisabled(true);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result as string);
            setDisabled(false);
        };
    }, [file]);

    // loaded
    //   ? setLoaded(false)
    //   : !interval.active && interval.start();

    // const {
    //     loading,
    //     error,
    //     sendRequest: uploadUserPhoto
    // } = useFileHttpRequest();

    return (
        <>
            <Paper my="md">
                <FileInput
                    icon={<Upload size={16} />}
                    label="Upload Photo"
                    placeholder="your photo"
                    onChange={(file) => {
                        setFile(file);

                        setLoaded(false);
                    }}
                />
            </Paper>

            {preview && (
                <Image radius="lg" my={4} src={preview} alt="Preview" />
            )}

            <Group mt="lg" position="center">
                <ButtonProgress
                    onClick={() => {
                        loaded
                            ? setLoaded(false)
                            : !interval.active && interval.start();

                        let formData = new FormData();
                        if (file) {
                            formData.append('file', file);
                            // uploadUserPhoto(
                            //     {
                            //         url:
                            //             'http://localhost:8000/users/user_add_img?user=' +
                            //             user,
                            //         // 'http://localhost:8000/users/user_add_img',
                            //         // method: 'POST', removed method as file must be always post
                            //         body: formData
                            //     },
                            //     (data) => {
                            //         // console.log(data);
                            //         showNotification({
                            //             id: 'photo-uploaded',
                            //             title: 'Successfully Uploaded.',
                            //             message: 'User Photo saved.',
                            //             color: 'green',
                            //             autoClose: 5000,
                            //             icon: <CheckIcon />
                            //         });

                            //         // decide if u want to auto close it once done uploading
                            //     }
                            // );

                            dispatch(
                                fetchRequestProfileInfo({
                                    url: `http://localhost:8000/users/user_add_img?user=${user}`,
                                    method: 'POST',
                                    body: formData
                                })
                            );

                            if (!loading) {
                                showNotification({
                                    id: 'photo-uploaded',
                                    title: 'Successfully Uploaded.',
                                    message: 'User Photo saved.',
                                    color: 'green',
                                    autoClose: 5000,
                                    icon: <CheckIcon />
                                });
                            }
                        }

                        closeModal();

                        if (error) {
                            console.log(error);
                            showNotification({
                                id: 'photo-uploaded',
                                title: 'Failed to Upload.',
                                message: 'User Photo upload failed.',
                                color: 'red',
                                autoClose: 5000,
                                icon: <CheckIcon />
                            });
                        }
                    }}
                    loaded={loaded}
                    disabled={disabled}
                    progress={progress}
                />
            </Group>
        </>
    );
};
