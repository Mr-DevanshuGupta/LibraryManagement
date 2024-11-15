import axios, { AxiosResponse } from "axios";
import { addAuthorFailure, addAuthorRequest, addAuthorSuccess, fetchAuthorsFailure, fetchAuthorsRequest, fetchAuthorsSuccess, updateAuthorFailure, updateAuthorRequest, updateAuthorSuccess } from "./authorSlice";
import { call, put, takeLatest } from "redux-saga/effects";

type FetchAuthorsRequestAction = ReturnType<typeof fetchAuthorsRequest>;
type AddAuthorRequestAction = ReturnType<typeof addAuthorRequest>;
type UpdateAuthorRequestAction = ReturnType<typeof updateAuthorRequest>;

function* fetchAuthorsSaga(action : FetchAuthorsRequestAction){
    try{
        const { pageSize, pageNumber } = action.payload;
        console.log("fetch authors saga got called");
        const response: AxiosResponse<AuthorResponse> = yield call(axios.get, `http://localhost:8080/author/`, {
            params: { pageSize, pageNumber },
        });
        yield put(fetchAuthorsSuccess(response.data));
    } catch(error) {
        yield put(fetchAuthorsFailure((error as Error).message));
    }
}

function* addAuthorSaga(action: AddAuthorRequestAction){
    try{
        console.log("Thisi is the action payload for adding the author ", action.payload);
        const response: AxiosResponse<Author> = yield call(axios.post, `http://localhost:8080/author/`, action.payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        });
        yield put(addAuthorSuccess(response.data));
    } catch(error){
        yield put(addAuthorFailure((error as Error).message));
    }
}

function* updateAuthorSaga(action: UpdateAuthorRequestAction){
    try{
        const response: AxiosResponse<Author> = yield call(axios.put, `http://localhost:8080/author/${action.payload.id}`, action.payload.author, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        });
        yield put(updateAuthorSuccess(response.data));
    } catch(error){
        yield put(updateAuthorFailure((error as Error).message));
    }
}


export function* authorSaga() {
    yield takeLatest(fetchAuthorsRequest.type, fetchAuthorsSaga);
    yield takeLatest(addAuthorRequest.type, addAuthorSaga);
    yield takeLatest(updateAuthorRequest.type, updateAuthorSaga);
}