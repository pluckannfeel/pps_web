import {configureStore} from '@reduxjs/toolkit'
import companyReducer from '../features/companySlice'
import applicationReducer from '../features/applicationSlice'
import contractReducer from '../features/contractSlice'
import profileReducer from '../features/profileSlice'

const rtk_store = configureStore({
    reducer: {
        // reducers here
        company: companyReducer,
        application: applicationReducer,
        contract: contractReducer,
        profile: profileReducer,
    }
})

export default rtk_store;
export type RootState = ReturnType<typeof rtk_store.getState>
export type AppDispatch = typeof rtk_store.dispatch
