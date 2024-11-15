import axios, { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    addGenreFailure,
    addGenreRequest,
    addGenreSuccess,
    fetchGenresFailure,
    fetchGenresRequest,
    fetchGenresSuccess,
    updateGenreFailure,
    updateGenreRequest,
    updateGenreSuccess,
} from "./genreSlice";

type FetchGenresRequestAction = ReturnType<typeof fetchGenresRequest>;
type AddGenreRequestAction = ReturnType<typeof addGenreRequest>;
type UpdateGenreRequestAction = ReturnType<typeof updateGenreRequest>;

function* fetchGenresSaga(action: FetchGenresRequestAction) {
    try {
        const { pageSize, pageNumber } = action.payload;
        console.log("fetch genres saga called");
        const response: AxiosResponse<GenresResponse> = yield call(
            axios.get,
            `http://localhost:8080/genres/`, {
            params: { pageSize, pageNumber },
        }
        );
        yield put(fetchGenresSuccess(response.data));
    } catch (error) {
        yield put(fetchGenresFailure((error as Error).message));
    }
}

function* addGenreSaga(action: AddGenreRequestAction) {
    try {
        console.log("Adding genre:", action.payload);
        const response: AxiosResponse<Genre> = yield call(
            axios.post,
            `http://localhost:8080/genres/`,
            action.payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        }
        );
        yield put(addGenreSuccess(response.data));
    } catch (error) {
        yield put(addGenreFailure((error as Error).message));
    }
}

function* updateGenreSaga(action: UpdateGenreRequestAction) {
    try {
        const response: AxiosResponse<Genre> = yield call(
            axios.put,
            `http://localhost:8080/genres/${action.payload.id}`,
            action.payload.genre, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        }
        );
        yield put(updateGenreSuccess(response.data));
    } catch (error) {
        yield put(updateGenreFailure((error as Error).message));
    }
}

export function* genreSaga() {
    yield takeLatest(fetchGenresRequest.type, fetchGenresSaga);
    yield takeLatest(addGenreRequest.type, addGenreSaga);
    yield takeLatest(updateGenreRequest.type, updateGenreSaga);
}
