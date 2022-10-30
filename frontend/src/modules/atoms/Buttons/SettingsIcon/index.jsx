/* 설정: {
    배경색 변경,
    코드 에디터 변경 , */

import { ReactComponent as SettingIcon } from "../../../../assets/images/settingIcon.svg";
import { Img } from "../../Img";

function SettingsIcon(props) {
  return (
    <div>
      {/* <SettingIcon /> */}
      <Img src={SettingIcon} className="settings" alt="settings" />
    </div>
  );
}

export default SettingsIcon;
