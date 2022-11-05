export const LECTURE_ACTION_TYPE  = "LECTURE_ACTION_TYPE";

export const GET_LECTURES = "GET_LECTURES";
export const GET_LECTURES_SUCCESS = "GET_LECTURES_SUCCESS";
export const GET_LECTURES_FAIL = "GET_LECTURES_FAIL";

export const getLectureAction = () => {
    return {
        type: LECTURE_ACTION_TYPE,
        payload: {
            type: GET_LECTURES
        }
    }
}