import { combineReducers } from "@reduxjs/toolkit";
import authorReducer from './author/authorSlice'
import genreReducer from './genre/genreSlice'
import bookReducer from './book/bookSlice'
import authReducer from './auth/authSlice'
import userReducer from './user/userSlice'
import searchReducer from './search/searchSlice'

const rootReducer = combineReducers({
authors : authorReducer,
genres: genreReducer,
books : bookReducer,
auth : authReducer,
user : userReducer,
search : searchReducer,
});
export default rootReducer