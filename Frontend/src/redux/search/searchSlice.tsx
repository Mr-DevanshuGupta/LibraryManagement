import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SearchState = {
    searchTerm: '',
}


const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
            console.log("Setsearch term got called");
        },
    },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;