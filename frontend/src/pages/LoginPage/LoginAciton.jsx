export const LOGIN_TRY = "LOGIN_TRY";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_SUCCESS_FIRST = "LOGIN_SUCCESS_FIRST";


export const loginTryAction = (payload, callback) => {
    return ({
        type: LOGIN_TRY,
        payload: payload, 
        callback: callback
    })
}