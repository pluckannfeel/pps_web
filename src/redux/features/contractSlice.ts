import { useCallback } from 'react';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type Contract = {
    id: string;
    // company info
    company_id: string; //id
    company_contact_number: number;
    // company_contact_person_email: string;
    // company_contact_person_name: string;
    // company_contact_person_number: number;
    // company_contact_person_position: string;
    // company_foreign_workers: number;
    company_name: string;
    company_address: string;
    // company_parttime_workers: number;
    // company_registered_industry: string;
    // company_regular_worker: number;
    // company_rep_name: string;
    // company_rep_position: string;
    // company_services: string;
    // company_website: string;
    // company_year_established: string;
    job_criteria_degree: string;
    job_criteria_jlpt_level: string;
    job_criteria_year_exp: string;
    job_criteria_other: string;
    worker_name: string;
    agency_name: string;
    agency_address: string;
    agency_rep_name: string;
    agency_rep_position: string;
    site_employment: string;
    contract_duration: string; // <num> <year(s)>
    contract_terms: string; // choose option but will be 'x' on pdf
    bonus: string; // once,twice,byperformance
    salary_increase: string; // once,twice,byperformance
    work_start_time: string; // 9:00 AM
    work_end_time: string; // 5:00 PM
    work_rest: number;
    work_working_days: string; // Tuesday to Saturday
    work_days_off: string; // Sunday & Monday
    work_leave: number // 15
    work_other_leave: string;
    utilities: string;
    housing_accomodation: string;
    housing_cost: number;
    job_title: string;
    job_description: string;
    job_duties: string; // list/object string;
    job_basic_salary: string;
    job_total_deductions: string;
    job_income_tax: string;
    job_social_insurance: string;
    job_accomodation: string;
    job_utilities: string;
    job_net_salary: string;
    benefits_housing: string;
    benefits_utilities: string;
    benefits_transportation: string;
    benefits_other: string; // object e.g key : benefit name value: benefit value or contents
}

type InitialState = {
    loading: boolean;
    contracts: Contract[];
    success: string;
    error: string;
}

type method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface requestConfigProps {
    url: string;
    method?: method;
    headers?: {};
    body: {};
}

interface ActionPayloadProps {
    data: Contract[];
    msg: string;
}

const initialState: InitialState = {
    loading: false,
    contracts: [],
    success: '',
    error: ''
};

export const fetchRequestContracts = createAsyncThunk(
    'company/fetchRequestContracts',
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
)

const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRequestContracts.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(
            fetchRequestContracts.fulfilled,
            (state, action: PayloadAction<ActionPayloadProps>) => {
                state.loading = false;

                if('data' in action.payload) {
                    state.contracts = action.payload['data'];
                }
                // add or update contract
                else if ('new_data' in action.payload) {
                    // if the new data exists, then we updte the contract instead.
                    const new_contract = action.payload['new_data'];
                    const cont_id = new_contract['id']

                    if (state.contracts.find(
                        ({ id }) => id === cont_id
                    )) {
                        const selected_item = state.contracts.find(
                            ({ id }) => id === cont_id
                        );

                        // filters then push the new data to the contract state
                        const selected_item_index = state.contracts.indexOf(
                            selected_item!
                        );

                        const updated_contracts = state.contracts.filter(
                            ({ id }) => id !== cont_id
                        );

                        // refreshes and add filtered contract
                        state.contracts = [];
                        state.contracts = updated_contracts;

                        // insert the new contract
                        state.contracts.splice(
                            selected_item_index,
                            0,
                            new_contract
                        );
                    }else{
                        // otherwise dont filter and add the new data
                        state.contracts.unshift(new_contract)
                    }
                } 
                // delete contract
                else if ('del_data' in action.payload) {
                    const cont_id = action.payload['del_data'];

                    const updated_applications = state.contracts.filter(
                        ({ id }) => id !== cont_id
                    );

                    state.contracts = [];
                    state.contracts = updated_applications;
                }

                state.success = action.payload['msg']
                state.error = '';
            }
        );

        builder.addCase(fetchRequestContracts.rejected, (state, action) => {
            state.loading = false;
            state.contracts = [];
            state.error = action.error.message || 'Something went wrong.';
        });
    }
})

export default contractSlice.reducer;
