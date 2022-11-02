import { useNavigate } from "react-router-dom";
import { call, delay, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_SUCCESS_FIRST, LOGIN_TRY } from "../pages/LoginPage/LoginAciton";
import axios from "axios";
import { apiClient } from "../api/axios";
import {setItemWithExpireTime} from "../service/localStorage";
import { GET_LECTURES, GET_LECTURES_FAIL, GET_LECTURES_SUCCESS, LECTURE_ACTION_TYPE } from "../pages/MainPage/MainAction";


async function getLectureAPI(payload) {
    const result = await apiClient.get("/api/lectures/");
    console.log(result);
    return result.data.data;
}

function* getLectureFunc(action) {
    const result = yield call(getLectureAPI, action.payload);
    if(result){
        yield put({
            type: GET_LECTURES_SUCCESS,
            payload: result
        }); 
    }
    else{
        yield put({
            type: GET_LECTURES_FAIL,
        }); 
    }
}

function* lectureIndex(action) {
    switch (action.payload.type) {
        case GET_LECTURES:
            yield call(getLectureFunc, action);
            break;
    
        default: 
            break;
    }
}


export function* getLectureSignal() {
    yield takeLatest(LECTURE_ACTION_TYPE, lectureIndex)
}