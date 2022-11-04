// Landing page
import React from "react";
import styled from "styled-components";

import { Text } from "../../modules/atoms";
import { BannerIcon } from "../../modules/atoms/Icons";

import { LandingPageBanner } from "../../modules/organisms/LandingPageOrganism/LandingPageBanner";

import { useDispatch, useSelector } from "react-redux";

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-right: 0px;
  width: 61%;
`;

const ListContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  width: 61%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ListIndicatorBox = styled.div`
  width: 122px;
  height: 42px;

  background: #7977eb;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 19.4234px;
  line-height: 22px;
  text-align: center;

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
      <div style={{ marginTop: "66px", display: "flex", flexDirection: "row" }}>
        <GeneralContainer>
          <div style={{ marginBottom: "15px" }}>
            <ButtonContainer>
              <ListIndicatorBox>
                <BannerIcon
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "19.423px",
                    lineHeight: "22px",
                    textAlign: "center",
                  }}
                >
                  강의 목록
                </BannerIcon>
              </ListIndicatorBox>
              <ListIndicatorBox>
                <BannerIcon
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "19.423px",
                    lineHeight: "22px",
                    textAlign: "center",
                  }}
                >
                  정렬 기준
                </BannerIcon>
              </ListIndicatorBox>
            </ButtonContainer>
          </div>
          <ListDivLine></ListDivLine>
          {/* Lectures and assignments  */}
          <ListContainer>ListContainer</ListContainer>
        </GeneralContainer>
      </div>
    </>
  );
};
