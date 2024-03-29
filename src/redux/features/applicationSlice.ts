import { useCallback } from 'react';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// domain name
import {domain_name} from './domainCredentials';

export type Application = {
    id: string;
    application_type: string;
    employer_category: string;
    agency_name: string;
    agency_address: string;
    agency_rep_name: string;
    agency_rep_position: string;
    date_filled: string;
    place_filled: string;
    job_title1: string;
    job_title2: string;
    job_no_workers1: number;
    job_no_workers2: number;
    job_basic_salary1: number;
    job_basic_salary2: number;
    job_positions: string[];
    visa_type: string;

    company_id: string;
    company_contact_number: number;
    company_contact_person_email: string;
    company_contact_person_name: string;
    company_contact_person_number: number;
    company_contact_person_position: string;
    company_foreign_workers: number;
    company_name: string;
    company_address: string;
    company_parttime_workers: number;
    company_registered_industry: string;
    company_regular_worker: number;
    company_rep_name: string;
    company_rep_position: string;
    company_services: string;
    company_website: string;
    company_year_established: string;
};

type InitialState = {
    loading: boolean;
    applications: Application[];
    success: string;
    error: string;
};

type method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface requestConfigProps {
    url: string;
    method?: method;
    headers?: {};
    body: {};
}

interface ActionPayloadProps {
    data: Application[];
    msg: string;
}

const initialState: InitialState = {
    loading: false,
    applications: [],
    success: '',
    error: ''
};

export const fetchRequestApplications = createAsyncThunk(
    'application/fetchRequestApplications',
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

// create a reducer that calls an api 
// export const generateApplication = createAsyncThunk(
//     'company/generateApplication',
//     async (application_id: string) => {
//         return await axios({
//             method: 'GET',
//             url: `${domain_name}/applications/generate?application_id=${application_id}`
//         }).then((response) => response.data);
//     }
// );


const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRequestApplications.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchRequestApplications.fulfilled,
            (state, action: PayloadAction<ActionPayloadProps>) => {
                state.loading = false;
                // state.companies = []
                if ('data' in action.payload) {
                    state.applications = action.payload['data'];
                }
                // add or update company
                else if ('new_data' in action.payload) {
                    // if the new data exists, then we update the application array instead
                    const new_application = action.payload['new_data'];
                    const app_id = new_application['id'];

                    if (state.applications.find(({ id }) => id === app_id)) {
                        const selected_item = state.applications.find(
                            ({ id }) => id === app_id
                        );

                        // filters then push the new data to the company state
                        const selected_item_index = state.applications.indexOf(
                            selected_item!
                        );

                        const updated_applications = state.applications.filter(
                            ({ id }) => id !== app_id
                        );

                        // refreshes and add filtered company
                        state.applications = [];
                        state.applications = updated_applications;

                        // insert the new company
                        state.applications.splice(
                            selected_item_index,
                            0,
                            new_application
                        );
                    } else {
                        // otherwise dont filter and add the new data
                        state.applications.unshift(new_application);
                    }
                } else if ('del_data' in action.payload) {
                    const app_id = action.payload['del_data'];

                    const updated_applications = state.applications.filter(
                        ({ id }) => id !== app_id
                    );

                    state.applications = [];
                    state.applications = updated_applications;
                }
                state.success = action.payload['msg'];
                state.error = '';
            }
        );

        builder.addCase(fetchRequestApplications.rejected, (state, action) => {
            state.loading = false;
            state.applications = [];
            state.error = action.error.message || 'Something went wrong.';
        });

        // generate application
        // builder.addCase(generateApplication.pending, (state) => {
        //     state.loading = true;
        // }

        // );

        // builder.addCase(
        //     generateApplication.fulfilled,
        //     (state, action: PayloadAction<ActionPayloadProps>) => {
        //         state.loading = false;
        //         state.success = action.payload['msg'];
        //         state.error = '';
        //     }
        // );

        // builder.addCase(generateApplication.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.error.message || 'Something went wrong.';
        // }
        // );

    }
});

export default applicationSlice.reducer;
