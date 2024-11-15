import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BookState = {
    books: [],
    totalBooks : 0,
    status: 'idle',
    error: null,
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        fetchBooksRequest(state, action: PayloadAction<{pageNumber:number, pageSize:number, searchTerm? : string}>) {
            state.status = "loading";
        },
        fetchBooksSuccess(state, action: PayloadAction<BooksResponse>) {
            state.status = "succeeded";
            state.books = action.payload.books;
            state.totalBooks = action.payload.totalBooks;
            
        },
        fetchBooksFailure(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },

        addBookRequest(state, action: PayloadAction<addBookRequest>) {
            state.status = "loading";
        },
        addBookSuccess(state, action: PayloadAction<Book>) {
            state.status = "succeeded";
            state.books.push(action.payload);
        },
        addBookFailure(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },

        updateBookRequest(state, action: PayloadAction<{ id: number; book: addBookRequest }>) {
            state.status = "loading";
        },
        updateBookSuccess(state, action: PayloadAction<Book>) {
            state.status = "succeeded";
            const index = state.books.findIndex(book => book.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        },
        updateBookFailure(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },

        deleteBookRequest(state, action: PayloadAction<number>) {
            state.status = "loading";
        },
        deleteBookSuccess(state, action: PayloadAction<number>) {
            state.status = "succeeded";
            state.books = state.books.filter(book => book.id !== action.payload);
        },
        deleteBookFailure(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },
    },
});

export const {
    fetchBooksRequest,
    fetchBooksSuccess,
    fetchBooksFailure,
    addBookRequest,
    addBookSuccess,
    addBookFailure,
    updateBookRequest,
    updateBookSuccess,
    updateBookFailure,
    deleteBookRequest,
    deleteBookSuccess,
    deleteBookFailure,
} = bookSlice.actions;


export default bookSlice.reducer;