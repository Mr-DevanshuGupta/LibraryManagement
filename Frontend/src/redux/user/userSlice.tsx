import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: User | null;
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    check: boolean;
    totalItems: number
}

const initialState: UserState = {
    user: null,
    users: [],
    status: 'idle',
    error: null,
    check: true,
    totalItems: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserRequest: (state) => {
            state.status = 'loading';
        },
        getUserSuccess: (state, action: PayloadAction<User>) => {
            state.status = 'succeeded';
            state.user = action.payload;
        },
        getUserFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
})


export const {
    getUserRequest,
    getUserFailure,
    getUserSuccess
} = userSlice.actions;

export default userSlice.reducer;