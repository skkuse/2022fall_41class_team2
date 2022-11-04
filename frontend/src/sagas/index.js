import { takeEvery, call, put, all } from 'redux-saga/effects'
import {getLoginSignal} from "./LoginSaga";
import {getLectureSignal} from "./LectureSaga";

export default function* rootSaga() {
    yield all([
        getLoginSignal(),
        getLectureSignal()
    ]);
}