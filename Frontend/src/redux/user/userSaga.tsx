import { call, put, takeLatest } from "redux-saga/effects";
import { getUserFailure, getUserRequest, getUserSuccess } from "./userSlice";
import axios, { AxiosResponse } from "axios";

type getUserRequestAction = ReturnType<typeof getUserRequest>;

function* getUserSaga(action: getUserRequestAction) {
    try {
        const userId = localStorage.getItem('Id');
        const response: AxiosResponse<User> = yield call(axios.get, `http://localhost:8080/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        })
        yield put(getUserSuccess(response.data));
    } catch (error) {
        yield put(getUserFailure((error as Error).message));
    }
}

export function* usersSaga() {
    yield takeLatest(getUserRequest.type, getUserSaga);
}