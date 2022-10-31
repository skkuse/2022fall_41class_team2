/* 설정: {
    배경색 변경,
    코드 에디터 변경 , */

import { Img } from "../..";
import styled from "styled-components";

const Wrapper = styled.div`
  // ! position 삭제
  /* position: absolute;
  left: 1.04%;
  right: 97.86%;
  top: 0.83%;
  bottom: 97.22%;
  width: 100%; */
  height: auto;
  flex: 1;
`;

export const SettingsIcon = (props) => {
  return (
    <div>
      <Wrapper>
        <Img
          src="images/img_settings.svg"
          
          alt="settings"
        />
      </Wrapper>
    </div>
  );
};
