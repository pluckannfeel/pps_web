import React from "react";
// // make a redux func that stores user credentials in the store
// export const userCredentialsSlice = createSlice({
//     name: 'userCredentials',
//     initialState: {
//         userCredentials: {
//             username: '',
//             password: '',
//             email: '',
//             firstName: '',
//             lastName: '',
//             phoneNumber: '',
//         },
//     },
//     reducers: {
//         setUserCredentials: (state, action) => {
//             state.userCredentials = action.payload;
//         }
//     }
// });

// // Path: src\components\store\userCredentialsSlice.ts
// // export the action and reducer
// export const { setUserCredentials } = userCredentialsSlice.actions;
// export default userCredentialsSlice.reducer;

// // Path: src\components\store\store.ts
// // import the reducer
// import userCredentialsReducer from './userCredentialsSlice';

// // Path: src\components\store\store.ts
// // add the reducer to the store
// export const store = configureStore({
//     reducer: {
//         userCredentials: userCredentialsReducer,
//     }
// });