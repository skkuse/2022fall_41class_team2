import { takeEvery, call, put, all } from 'redux-saga/effects'
import {getLoginSignal} from "./LoginSaga";

export default function* rootSaga() {
    yield all([
        getLoginSignal()
    ]);
}