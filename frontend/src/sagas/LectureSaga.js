import { useNavigate } from "react-router-dom";
import { call, delay, put, SagaReturnType, takeLatest } from "redux-saga/effects";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_SUCCESS_FIRST, LOGIN_TRY } from "../pages/LoginPage/LoginAciton";
import axios from "axios";
import { apiClient } from "../api/axios";
import {setItemWithExpireTime} from "../service/localStorage";
import { GET_LECTURES, GET_LECTURES_FAIL, GET_LECTURES_SUCCESS, LECTURE_ACTION_TYPE } from "../pages/MainPage/MainAction";


async function getLectureAPI(payload) {
    let result = await apiClient.get("/api/lectures/");
    if(result.status == 200 && result.data.data.results.length == 0) {
        const postResult = await apiClient.post("/api/lectures/", {
            name: "예시) 소프트웨어공학개론4"
        });
        result.data.data.results.push(postResult.data.id);
    }

    // apiClient.delete("/api/lectures/1/");
    // apiClient.delete("/api/lectures/2/");
    // alert(JSON.stringify(result.data.data));

    for (const index in result.data.data.results) {
        let lecture = result.data.data.results[index];
        let assResult = await apiClient.get("/api/assignments/?lecture_id="+ lecture.id);
        // alert(JSON.stringify(assResult));
        console.log(assResult);
        if(!assResult.data.data.results.length){
            let postAssResult = await apiClient.post("/api/assignments/", {
                "name": "Assignment1",
                "deadline": "2022-11-18T12:45:25.465Z",
                "question": "피보나치 수열을 만드시오.",
                "constraints": "",
                "contents" : [{
                    "skeleton_code": "#include <stdio.h>",
                    "answer_code": "#include <stdio.h>",
                    "language": "python"
                }],
                "lecture_id": lecture.id,
            });
            assResult = await apiClient.get("/api/assignments/?lecture_id="+ lecture.id);
        }
        lecture.assignments = assResult.data.data;
    }
    console.log(result.data.data);
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