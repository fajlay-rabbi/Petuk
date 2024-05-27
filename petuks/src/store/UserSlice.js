import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        login: false
    },

    reducers: {
        addUser(state, action) {
            state.user = [];
            state.login = true;
            const newUser = action.payload;

            state.user.push({
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                img: newUser.img,
            });
        }
    },
})


export const userActions = userSlice.actions;
export default userSlice;