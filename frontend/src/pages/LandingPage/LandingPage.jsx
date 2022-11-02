// Landing page
import React from "react";

import { LandingPageBanner } from "../../modules/organisms/LandingPageOrganism/LandingPageBanner";
import { LandingPageScenery } from "../../modules/organisms/LandingPageOrganism/LandingPageScenery";
import { useDispatch, useSelector } from "react-redux";

export const LandingPage = ( ...restProps) => {
  // test
  // return <h1>hello world</h1>;
  const settingSelector = useSelector((state) =>
    state.SettingReducer
  );    

  return (
    <>
      {/* Banner */}
      <LandingPageBanner  restProps={restProps} />
      {/* Scenery */}
      <LandingPageScenery />
    </>
  );
};
