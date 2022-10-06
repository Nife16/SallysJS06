import { createSlice } from '@reduxjs/toolkit'


const initialUser = {
    id: null,
    name: "",
    email: "",
    password: "",
    phoneNumber: ""
}

export const userSlice = createSlice({
    name:"user",
    initialState: {
        user: initialUser
    },
    reducers: {
        gotUser: (state, action) => {
            state.user = action.payload
        },
        logOut: state => {
            state.user = initialUser
        },
        updateUser: (state, action) => {
            state.user = action.user
        }
    }
})

// Action creators are generated for each case reducer function
export const { gotUser, logOut, updateUser } = userSlice.actions

export default userSlice.reducer