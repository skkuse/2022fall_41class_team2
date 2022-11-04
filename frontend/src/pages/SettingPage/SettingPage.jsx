import styled from "styled-components";
import { Helmet } from "react-helmet";

import { SettingsBox } from "../../modules/organisms";

const SettingsBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export const SettingPage = () => {
  return (
    // <h1>설정 페이지</h1>
    <>
      <Helmet
        bodyAttributes={{
          style:
            "background : linear-gradient(108.07deg, #C5C4FF 1.15%, #4844DE 100.82%)",
        }}
      />
      <SettingsBoxWrapper>
        <SettingsBox />
      </SettingsBoxWrapper>
    </>
  );
};
