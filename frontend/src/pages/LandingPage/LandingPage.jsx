// Landing page
import React from "react";
import styled from "styled-components";

import { LandingPageBanner } from "../../modules/organisms/LandingPageOrganism/LandingPageBanner";
import { LandingPageScenery } from "../../modules/organisms/LandingPageOrganism/LandingPageScenery";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const GeneralContainer = styled.div`
  height: 100vh;
  /* TODO: 스크롤바 다크모드 css */
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9.76px;
    background-color: #d3d3da;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 975.505px;
    background-color: #bfbfbf;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  }
  overflow-y: hidden;
  
`;

export const LandingPage = (...restProps) => {
  const settingSelector = useSelector((state) => state.SettingReducer);
  const dispatch = useDispatch();
  // TODO: settingSelector에 따라서 LandingPageScenery의 배경을 바꿔야 함
  const darkMode = false;
  return (
    <GeneralContainer>
      {/* Banner */}
      {/* TODO 다크 모드 state */}
      <Helmet
        bodyAttributes={{
          style: darkMode ? "background : #000000" : "background : #ffffff",
        }}
      />
      <LandingPageBanner restProps={restProps} darkMode={darkMode} />
      {/* Scenery */}
      <LandingPageScenery darkMode={darkMode} />
    </GeneralContainer>
  );
};
