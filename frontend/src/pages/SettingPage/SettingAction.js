export const SETTING_CHANGE_BG = "SETTING_CHANGE_BG";
export const SETTING_CHANGE_LG = "SETTING_CHANGE_LG";
export const SETTING_CHANGE_TH = "SETTING_CHANGE_TH";

export const settingChangeBg = (bg) => {
    return{
        type: SETTING_CHANGE_BG,
        payload: bg
    }
}

export const settingChangeLg = (bg) => {
    return{
        type: SETTING_CHANGE_LG,
        payload: bg
    }
}


export const settingChangeTh = (bg) => {
    return{
        type: SETTING_CHANGE_TH,
        payload: bg
    }
}
