import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : AuthorState = {
    authors : [],
    totalAuthors:0,
    status : 'idle',
    error : null,
};


const authorSlice = createSlice({
    name : 'authors',
    initialState,
    reducers : {
        fetchAuthorsRequest : (state, action : PayloadAction<{pageNumber:number, pageSize:number}>) => {
            state.status = 'loading';
        },
        fetchAuthorsSuccess : (state, action : PayloadAction<AuthorResponse>) =>{
            state.status = 'succeeded';
            state.authors = action.payload.authors;
            state.totalAuthors = action.payload.totalAuthors;
        },
        fetchAuthorsFailure : (state, action : PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        addAuthorRequest : (state, action : PayloadAction<addAuthorRequest>) => {
            state.status = 'loading';
        },
        addAuthorSuccess : (state, action: PayloadAction<Author>) => {
            state.status = 'succeeded';
            state.authors.push(action.payload);
        },
        addAuthorFailure : (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        updateAuthorRequest : (state, action : PayloadAction<{id: number, author : addAuthorRequest}>) => {
            state.status = 'loading';
        },
        updateAuthorSuccess : (state, action: PayloadAction<Author>) => {
            state.status = 'succeeded';
            state.authors = state.authors.map(author => author.id === action.payload.id ? action.payload : author);
        },
        updateAuthorFailure : (state, action : PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
})

export const {
    fetchAuthorsFailure,
    fetchAuthorsRequest,
    fetchAuthorsSuccess,
    addAuthorFailure,
    addAuthorRequest,
    addAuthorSuccess,
    updateAuthorFailure,
    updateAuthorRequest,
    updateAuthorSuccess
} = authorSlice.actions;

export default authorSlice.reducer;