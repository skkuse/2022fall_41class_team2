import { GET_LECTURES_FAIL, GET_LECTURES_SUCCESS } from "../pages/MainPage/MainAction";

const initState = {
    lectures: []
}

export function LectureReducer(state=initState, action) {
    switch (action.type) {
        case GET_LECTURES_SUCCESS:
            return {
                ...state,
                lectures: action.payload
            };

        case GET_LECTURES_FAIL:
            return {
                ...state
            };


        default:
            return state;
    }
}

