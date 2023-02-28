import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import useHttpRequest from '../../components/hooks/use-httprequest';
export type Profile = {
    first_name: string;
    last_name: string;
    birth_date: Date | null;
    username: string;
    email: string;
    phone: string;
    img_url: string;
    is_verified: boolean;
};

type InitialState = {
    loading: boolean;
    error: string;
    profileInfo: Profile;
    // photoPreview: string | null;
    // file: File | null;
    buttonDisabled: boolean; // button
};

type method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface requestConfigProps {
    url: string;
    method?: method;
    headers?: {};
    body: {};
}

interface ActionPayloadProps {
    data: Profile;
    new_img_url: string;
    msg: string;
}

const initialState: InitialState = {
    loading: false,
    error: '',
    profileInfo: {
        first_name: '',
        last_name: '',
        birth_date: null,
        username: '',
        email: '',
        phone: '',
        img_url: '',
        is_verified: false
    },
    // photoPreview: null,
    // file: null,
    buttonDisabled: false
};

export const fetchRequestProfileInfo = createAsyncThunk(
    'profile/fetchRequestProfileInfo',
    async (requestConfig: requestConfigProps) => {
        // return await axios
        //     .post(requestConfig.url, requestConfig.body)
        //     .then((response) => response.data);

        return await axios({
            method: requestConfig.method ? requestConfig.method : 'GET',
            url: requestConfig.url,
            data: requestConfig.body
        }).then((response) => response.data);
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // setStateFile: (state, action: PayloadAction<File>) => {
        //     state.file = action.payload;
        //     console.log(state.file)
        // },
        // // when on profile, if file was not uploaded from pc disable the button
        // loadPhotoPreview: (state) => {
        //     if (!state.file) {
        //         state.photoPreview = null;
        //         state.buttonDisabled = true;
        //     } else {
        //         // set up preview
        //         const reader = new FileReader();
        //         reader.readAsDataURL(state.file);
        //         reader.onloadend = () => {
        //             state.photoPreview = reader.result as string;
        //             state.buttonDisabled = false;
        //         };
        //     }
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRequestProfileInfo.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchRequestProfileInfo.fulfilled,
            (state, action: PayloadAction<ActionPayloadProps>) => {
                state.loading = false;

                // on load profile user info
                if ('data' in action.payload) {
                    state.profileInfo = action.payload['data'];
                }

                console.log(action.payload['new_img_url']);
                if ('new_img_url' in action.payload) {
                    // update the profileninfo state

                    state.profileInfo.img_url = action.payload['new_img_url'];
                }
            }
        );

        builder.addCase(fetchRequestProfileInfo.rejected, (state, action) => {
            state.loading = false;
            // state.profileInfo = [];
            state.error = action.error.message || 'Something went wrong.';
        });
    }
});

// export const {setStateFile, loadPhotoPreview} = profileSlice.actions

export default profileSlice.reducer;
