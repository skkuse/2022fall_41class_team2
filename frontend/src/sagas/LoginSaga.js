import { useNavigate } from "react-router-dom";
import { call, delay, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_SUCCESS_FIRST, LOGIN_TRY } from "../pages/LoginPage/LoginAciton";
import axios from "axios";
import { apiClient } from "../api/axios";


async function githubLoginAPI(payload) {
    console.log("code = " + payload);
    const result = await apiClient.post("/api/auth/github/callback/?code="+payload);

    return false;
}

function* githubLogin(action) {
    console.log("github login");
    
    const result = yield call(githubLoginAPI, action.payload);
    console.log("github login result2 : " + JSON.stringify(result));

    if(result){
        yield put({
            type: LOGIN_SUCCESS,
            callback: action.callback
        }); 
    }
    else{
        yield put({
            type: LOGIN_FAIL,
            callback: action.callback
        }); 
    }
}


export function* getLoginSignal() {
    yield takeLatest(LOGIN_TRY, githubLogin)
}