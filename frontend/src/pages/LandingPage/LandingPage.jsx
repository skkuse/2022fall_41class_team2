// Landing page
import React from "react";

import { LandingPageBanner } from "../../modules/organisms/LandingPageOrganism/LandingPageBanner";
import { LandingPageScenery } from "../../modules/organisms/LandingPageOrganism/LandingPageScenery";

export const LandingPage = () => {
  // test
  // return <h1>hello world</h1>;

  return (
    <>
      {/* Banner */}
      <LandingPageBanner />
      {/* Scenery */}
      <LandingPageScenery />
    </>
  );
};
