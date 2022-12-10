import {LOGIN_SUCCESS_FIRST, LOGIN_FAIL, LOGIN_SUCCESS} from "../pages/LoginPage/LoginAciton";
import {SETTING_CHANGE_BG, SETTING_CHANGE_LG, SETTING_CHANGE_TH} from "../pages/SettingPage/SettingAction";
import {setItemWithExpireTime, getItemWithExpireTime, removeItem} from "../service/localStorage";

export const SETTING_BACKGROUND_WHITE = "SETTING_BACKGROUND_WHITE";
export const SETTING_BACKGROUND_BLACK = "SETTING_BACKGROUND_BLACK";

export const SETTING_LANGUAGE_PYTHON = "Python";
export const SETTING_LANGUAGE_JAVASCRIPT = "JavaScript";
export const SETTING_LANGUAGE_CPP = "CPP";
export const SETTING_LANGUAGE_JAVA = "Java";
export const SETTING_LANGUAGE_C = "C";
export const SETTING_LANGUAGE_CSHARP = "C#";

export const SETTING_THEME_VSCODE = "VS Code";

const settingInitState = {
    backgroundColor: getItemWithExpireTime("backgroundColor") ?getItemWithExpireTime("backgroundColor"):  SETTING_BACKGROUND_WHITE,
    language: getItemWithExpireTime("language") ? getItemWithExpireTime("language") :SETTING_LANGUAGE_PYTHON,
    theme: getItemWithExpireTime("theme") ? getItemWithExpireTime("theme") :SETTING_THEME_VSCODE
}

export function SettingReducer(state=settingInitState, action) {
    switch (action.type) {
        case SETTING_CHANGE_BG:
            setItemWithExpireTime("backgroundColor", action.payload, 1000*60*60);
            return {
                ...state,
                backgroundColor: action.payload
            };

        case SETTING_CHANGE_LG:
            setItemWithExpireTime("language", action.payload, 1000*60*60);
            return {
                ...state,
                language: action.payload
            };

        // case SETTING_CHANGE_TH:
        //     setItemWithExpireTime("theme", action.payload, 1000*60*60);
        //     return {
        //         ...state,
        //         theme: action.payload
        //     };

        default:
            return state;
    }
}

