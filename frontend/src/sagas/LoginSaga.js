import { useNavigate } from "react-router-dom";
import { call, delay, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_SUCCESS_FIRST, LOGIN_TRY } from "../pages/LoginPage/LoginAciton";
import axios from "axios";
import { apiClient } from "../api/axios";
import {setItemWithExpireTime} from "../service/localStorage";


async function githubLoginAPI(payload) {
    console.log("code = " + payload);
    const result = await apiClient.get("/api/auth/github/callback/?code="+payload);
    console.log(result);
    return result.data.data;
}

function* githubLogin(action) {
    
    const result = yield call(githubLoginAPI, action.payload);
    console.log(result);
    if(result){
        setItemWithExpireTime("user",result,1000*60*60);
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