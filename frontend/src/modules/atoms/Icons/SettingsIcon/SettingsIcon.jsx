/* 설정: {
    배경색 변경,
    코드 에디터 변경 , */

import { Img } from "../..";
import styled from "styled-components";

const Wrapper = styled.div`
  // ! position 삭제
  height: auto;
  flex: 1;
`;

export const SettingsIcon = ({ inverted, darkMode, ...restProps }) => {
  return (
    <div>
      <Wrapper>
        <Img
          src={
            inverted || darkMode
              ? "/images/settings_inverted.svg"
              : "/images/img_settings.svg"
          }
          alt="settings"
        />
      </Wrapper>
    </div>
  );
};
