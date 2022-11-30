// Landing page
import React from "react";

import { LandingPageBanner } from "../../modules/organisms/LandingPageOrganism/LandingPageBanner";
import { LandingPageScenery } from "../../modules/organisms/LandingPageOrganism/LandingPageScenery";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

export const LandingPage = (...restProps) => {
  const settingSelector = useSelector((state) => state.SettingReducer);
  const dispatch = useDispatch();
  // TODO: settingSelector에 따라서 LandingPageScenery의 배경을 바꿔야 함
  const darkMode = false;
  return (
    <>
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
    </>
  );
};
