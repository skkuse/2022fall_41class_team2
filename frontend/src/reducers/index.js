import {combineReducers} from "redux";
import { BottomNavigationBarReducer } from "./BottomNavigationBarReducer";
import {LoginReducer} from "./LoginReducer";
import {SettingReducer} from "./SettingReducer";
import {LectureReducer} from "./LectureReducer";

const rootReducer = combineReducers({
  LoginReducer,
  SettingReducer,
  LectureReducer
});

export default rootReducer;

// export type RootState = ReturnType<typeof rootReducer>;
