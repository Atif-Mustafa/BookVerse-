import {createSlice} from '@reduxjs/toolkit'

const initState = {
    user: null,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            // console.log('PAYLOAD', action.payload);
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = null;
        }
    }

})

export const {login, logout} = loginSlice.actions;
export default loginSlice.reducer;