import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GenreState = {
    genres: [],
    totalGenres :0,
    status: 'idle',
    error: null,
};

const genreSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        fetchGenresRequest: (state, action : PayloadAction<{pageSize : number, pageNumber : number}>) => {
            state.status = 'loading';
        },
        fetchGenresSuccess: (state, action: PayloadAction<GenresResponse>) => {
            state.status = 'succeeded';
            state.genres = action.payload.genres;
            state.totalGenres = action.payload.totalGenres;
        },
        fetchGenresFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        addGenreRequest: (state, action: PayloadAction<AddGenreRequest>) => {
            state.status = 'loading';
        },
        addGenreSuccess: (state, action: PayloadAction<Genre>) => {
            state.status = 'succeeded';
            state.genres.push(action.payload);
        },
        addGenreFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        updateGenreRequest: (state, action: PayloadAction<{ id: number; genre: AddGenreRequest }>) => {
            state.status = 'loading';
        },
        updateGenreSuccess: (state, action: PayloadAction<Genre>) => {
            state.status = 'succeeded';
            state.genres = state.genres.map(genre =>
                genre.id === action.payload.id ? action.payload : genre
            );
        },
        updateGenreFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const {
    fetchGenresRequest,
    fetchGenresSuccess,
    fetchGenresFailure,
    addGenreRequest,
    addGenreSuccess,
    addGenreFailure,
    updateGenreRequest,
    updateGenreSuccess,
    updateGenreFailure,
} = genreSlice.actions;

export default genreSlice.reducer;
