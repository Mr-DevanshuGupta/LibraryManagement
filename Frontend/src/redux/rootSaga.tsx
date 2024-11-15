import { all, fork } from "redux-saga/effects";
import {authorSaga} from './author/authorSaga';
import {genreSaga} from './genre/genreSaga';
import {bookSaga} from './book/bookSaga'
import {authSaga} from './auth/authSaga'
import {usersSaga} from './user/userSaga'

export default function* rootSaga(){
    yield all([
        fork(authorSaga),   
        fork(genreSaga),
        fork(bookSaga),
        fork(authSaga),
        fork(usersSaga),
    ]);
}