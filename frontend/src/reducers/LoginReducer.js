import {LOGIN_SUCCESS_FIRST, LOGIN_FAIL, LOGIN_SUCCESS} from "../pages/LoginPage/LoginAciton";

const initState = {
    
}

export function LoginReducer(state=initState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log("login success");
            action.callback();
            return {
                ...state
            };

        case LOGIN_SUCCESS_FIRST:
            return {
                ...state
            };

        case LOGIN_FAIL:
            console.log("로그인 실패");
            return {
                ...state
            };

        default:
            return state;
    }
}

