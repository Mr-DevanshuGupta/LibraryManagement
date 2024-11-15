import axios, { all, AxiosResponse, HttpStatusCode } from "axios";
import {
    addBookFailure,
    addBookRequest,
    addBookSuccess,
    deleteBookFailure,
    deleteBookRequest,
    deleteBookSuccess,
    fetchBooksFailure,
    fetchBooksRequest,
    fetchBooksSuccess,
    updateBookFailure,
    updateBookRequest,
    updateBookSuccess,
} from "./bookSlice";
import { call, put, takeLatest } from "redux-saga/effects";

type FetchBooksRequestAction = ReturnType<typeof fetchBooksRequest>;
type AddBookRequestAction = ReturnType<typeof addBookRequest>;
type UpdateBookRequestAction = ReturnType<typeof updateBookRequest>;
type DeleteBookRequestAction = ReturnType<typeof deleteBookRequest>;

function* fetchBooksSaga(action: FetchBooksRequestAction) {
    try {
        console.log("fetchBook Saga got called an this is the search term ", action.payload.searchTerm);
        const {pageSize, pageNumber, searchTerm} = action.payload;
        const response: AxiosResponse<BooksResponse> = yield call(
            axios.get,
            "http://localhost:8080/books/", {
            params: {pageSize, pageNumber, keyword:searchTerm },
        }
        );
        const books = response.data;
        console.log("Fetched books:", books);
        yield put(fetchBooksSuccess(response.data));
    } catch (error) {
        yield put(fetchBooksFailure((error as Error).message));
    }
}

function* addBookSaga(action: AddBookRequestAction) {
    try {
        const response: AxiosResponse<Book> = yield call(
            axios.post,
            "http://localhost:8080/books/",
            action.payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        }
        );
        console.log("This is the response i get from add book saga ", response.data)
        const createdBookId = response.data.id;

        if (action.payload.file) {
            const formData = new FormData();
            formData.append("file", action.payload.file);

            const imageResponse: AxiosResponse<HttpStatusCode> = yield call(
                axios.post,
                `http://localhost:8080/books/image/${createdBookId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );
        }

        yield put(addBookSuccess(response.data));
    } catch (error) {
        yield put(addBookFailure((error as Error).message));
    }
}

function* updateBookSaga(action: UpdateBookRequestAction) {
    try {
        const response: AxiosResponse<Book> = yield call(
            axios.put,
            `http://localhost:8080/books/${action.payload.id}`,
            action.payload.book, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        }
        );
        console.log("This is the response i get from update book saga ", response.data)

        if (action.payload.book.file) {
            const formData = new FormData();
            formData.append("file", action.payload.book.file);

            const imageResponse: AxiosResponse<HttpStatusCode> = yield call(
                axios.put,
                `http://localhost:8080/books/image/${action.payload.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );
        }

        yield put(updateBookSuccess(response.data));
    } catch (error) {
        yield put(updateBookFailure((error as Error).message));
    }
}

function* deleteBookSaga(action: DeleteBookRequestAction) {
    try {
        const response: AxiosResponse<HttpStatusCode> = yield call(axios.delete, `http://localhost:8080/books/${action.payload}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        })
        if (response.status = HttpStatusCode.Ok) {
            yield put(deleteBookSuccess(action.payload))
        }
    }
    catch (error) {
        yield put(deleteBookFailure((error as Error).message));
    }
}

export function* bookSaga() {
    yield takeLatest(fetchBooksRequest.type, fetchBooksSaga);
    yield takeLatest(addBookRequest.type, addBookSaga);
    yield takeLatest(updateBookRequest.type, updateBookSaga);
    yield takeLatest(deleteBookRequest.type, deleteBookSaga);
}
