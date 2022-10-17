import { useLocation, useNavigate } from "react-router-dom";
import { CHAT_PAGE, HOME_PAGE, LIKE_PAGE, MY_PAGE, SEARCH_PAGE } from "../common/BottomNavigationBar/BottomNavigationBarActions";
import { BottomNavBarInitState } from "../common/BottomNavigationBar/BottomNavigationBarConstants";

// ! 새로고침할 때 redux 상태 초기화 되는 문제 => 로컬 스토리지로 해결 필요
export function BottomNavigationBarReducer(state = BottomNavBarInitState, action) {
    switch (action.type) {
        case HOME_PAGE:
            return {
                ...state,
                index: 0
            };
        case SEARCH_PAGE:
            return {
                ...state,
                index: 1
            };
        case LIKE_PAGE:
            return {
                ...state,
                index: 2
            };
        case CHAT_PAGE:
            return {
                ...state,
                index: 3
            };
        case MY_PAGE:
            return {
                ...state,
                index: 4
            };
        default:
            console.log("이건가");

            return {
                ...state,
                index: 0
            };
    }
}

