import {configureStore} from '@reduxjs/toolkit'
import companyReducer from '../features/companySlice'

const rtk_store = configureStore({
    reducer: {
        // reducers here
        company: companyReducer
    }
})

export default rtk_store;
export type RootState = ReturnType<typeof rtk_store.getState>
export type AppDispatch = typeof rtk_store.dispatch
