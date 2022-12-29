import { useCallback } from 'react';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type Company = {
    id: string;
    name: string;
    year_established: Date;
    address: string;
    contact_number: number;
    website: string;
    registered_industry: string;
    services: string;
    rep_name: string;
    rep_position: string;
    regular_workers: number;
    parttime_workers: number;
    foreign_workers: number;
    contact_person_name: string;
    contact_person_position: string;
    contact_person_number: number;
    contact_person_email: string;
};

type InitialState = {
    loading: boolean;
    companies: Company[];
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
    data: Company[];
    msg: string;
}

const initialState: InitialState = {
    loading: false,
    companies: [],
    success: '',
    error: ''
};

export const fetchRequestCompanies = createAsyncThunk(
    'company/fetchRequestCompanies',
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

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRequestCompanies.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchRequestCompanies.fulfilled,
            (state, action: PayloadAction<ActionPayloadProps>) => {
                state.loading = false;
                // state.companies = []
                if ('data' in action.payload) {
                    state.companies = action.payload['data'];
                }
                // add or update company
                else if ('new_data' in action.payload) {
                    // if the new data exists, then we update the company instead
                    const new_company = action.payload['new_data'];
                    const company_id = new_company['id'];

                    if (state.companies.find(({ id }) => id === company_id)) {
                        const selected_item = state.companies.find(
                            ({ id }) => id === company_id
                        );

                        // filters then push the new data to the company state
                        const selected_item_index = state.companies.indexOf(
                            selected_item!
                        );

                        const updated_companies = state.companies.filter(
                            ({ id }) => id !== company_id
                        );

                        // refreshes and add filtered company
                        state.companies = [];
                        state.companies = updated_companies;

                        // insert the new company
                        state.companies.splice(
                            selected_item_index,
                            0,
                            new_company
                        );
                    } else {
                        // otherwise dont filter and add the new data
                        state.companies.unshift(new_company);
                    }
                } else if ('del_data' in action.payload) {
                    const company_id = action.payload['del_data'];

                    const updated_companies = state.companies.filter(
                        ({ id }) => id !== company_id
                    );

                    state.companies = [];
                    state.companies = updated_companies;
                }
                state.success = action.payload['msg'];
                state.error = '';
            }
        );

        builder.addCase(fetchRequestCompanies.rejected, (state, action) => {
            state.loading = false;
            state.companies = [];
            state.error = action.error.message || 'Something went wrong.';
        });
    }
});

export default companySlice.reducer;
