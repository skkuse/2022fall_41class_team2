// PROPOSED_COMPONENTS

import HomeButton from "../../../atoms/Buttons/HomeButton/HomeButton";
import UserInfo from "../../atoms/User/UserSection/UserInfo";   // TODO: 유저 기능 구현 논의 필요
import Lecture from "../../../atoms/Assignment/HeadSection/Lecture";
import Assignment from "../../../atoms/Assignment/HeadSection/Assignment";
import Deadline from "../../../atoms/Assignment/HeadSection/Deadline";
import Settings from "../../../atoms/Buttons/SettingButton/Settings";

function HeaderMaster(props) {
    return <div>
        <HomeButton />
        <UserInfo />
        <Lecture/>
        <Assignment/>
        <Deadline/>
        <Settings/>
    </div>
}

export default HeaderMaster;