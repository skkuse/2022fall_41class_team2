// Landing page
import React from "react";
import styled from "styled-components";

import { Text } from "../../modules/atoms";
import { LandingPageBanner } from "../../modules/organisms/LandingPageOrganism/LandingPageBanner";

import { useDispatch, useSelector } from "react-redux";

const GeneralContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ListIndicatorBox = styled.div`
  margin-top: 16px;
  margin-left: 20px;
  margin-bottom: 0px;
  width: 122px;
  height: 42px;

  background: #7977eb;
  align-self: flex-start;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 19.4234px;
  line-height: 22px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #ffffff;
`;

const ListDivLine = styled.div`
  width: 1210px;
  height: 2px;

  border: 2px solid rgba(99, 97, 219, 0.6);
`;

export const OverviewPage = (...restProps) => {
  // test
  // return <h1>hello world</h1>;
  const settingSelector = useSelector((state) => state.SettingReducer);

  return (
    <>
      {/* Banner */}
      <LandingPageBanner restProps={restProps} />

      {/* List design */}
      <GeneralContainer>
        <ListIndicatorBox>
          <Text>강의 목록</Text>
        </ListIndicatorBox>
        <ListDivLine></ListDivLine>
        {/* Lectures and assignments  */}
        <ListContainer>ListContainer</ListContainer>
      </GeneralContainer>
    </>
  );
};
