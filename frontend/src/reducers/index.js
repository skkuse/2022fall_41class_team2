import {combineReducers} from "redux";
import { BottomNavigationBarReducer } from "./BottomNavigationBarReducer";
import {LoginReducer} from "./LoginReducer";
import {SettingReducer} from "./SettingReducer";

const rootReducer = combineReducers({
  LoginReducer,
  SettingReducer
});

export default rootReducer;

// export type RootState = ReturnType<typeof rootReducer>;
