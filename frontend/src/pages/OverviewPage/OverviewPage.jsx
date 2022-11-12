// Landing page
import React from "react";
import styled from "styled-components";

import { Text } from "../../modules/atoms";
import { BannerIcon } from "../../modules/atoms/Icons";

import { LandingPageBanner } from "../../modules/organisms/LandingPageOrganism/LandingPageBanner";
import { AssignmentOverview } from "../../modules/organisms";

import { useDispatch, useSelector } from "react-redux";

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-right: 0px;
  width: 61%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const OverviewPage = (...restProps) => {
  // test
  // return <h1>hello world</h1>;
  const settingSelector = useSelector((state) => state.SettingReducer);

  return (
    <>
      {/* Banner */}
      <div style={{ position: "sticky" }}>
        <LandingPageBanner restProps={restProps} />
      </div>
      {/* List design */}
      <AssignmentOverview />
    </>
  );
};
