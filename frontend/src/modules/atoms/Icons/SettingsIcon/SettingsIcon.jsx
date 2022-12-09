/* 설정: {
    배경색 변경,
    코드 에디터 변경 , */

import { Img } from "../..";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { ICON_SET } from "../../../../service/GetColor";

const Wrapper = styled.div`
  // ! position 삭제
  height: auto;
  flex: 1;
`;

export const SettingsIcon = ({ inverted, darkMode, ...restProps }) => {
  const settingSelector = useSelector((state) => state.SettingReducer);
  
  return (
    <div>
      <Wrapper>
        <Img
          src={
            ICON_SET['MAIN_SETTING'][settingSelector.backgroundColor]
          }
          alt="settings"
        />
      </Wrapper>
    </div>
  );
};


export const SettingsIconBlack = () => {
  return (
    <div>
      <Wrapper>
        <Img
          src={
            "/images/settings_inverted.svg"
          }
          alt="settings"
        />
      </Wrapper>
    </div>
  );
};
