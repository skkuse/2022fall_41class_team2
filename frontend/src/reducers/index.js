import {combineReducers} from "redux";
import { BottomNavigationBarReducer } from "./BottomNavigationBarReducer";
import {LoginReducer} from "./LoginReducer";

const rootReducer = combineReducers({
  LoginReducer
});

export default rootReducer;

// export type RootState = ReturnType<typeof rootReducer>;
