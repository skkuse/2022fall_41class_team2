import React from "react";
import styled from "styled-components";

import { SettingsButton } from "./../../molecules";
import { LoginAndRegisterButton } from "./../../molecules";
import { LandingPageBannerButton } from "./../../molecules";

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 11px 7px rgba(0, 0, 0, 0.05);
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap
  height: 100%;
`;
const LowerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap
  height: 100%;
`;

export const LandingPageBanner = ({ className, ...restProps }) => {
  return (
    <BannerContainer>
      <TopContainer>
        {/* Settings icon */}
        <SettingsButton />
        {/* login and register button */}
        <LoginAndRegisterButton />
      </TopContainer>
      <LowerContainer>
        {/* TODO */}
        <LandingPageBannerButton>문제</LandingPageBannerButton>
        <LandingPageBannerButton>강의</LandingPageBannerButton>
        <LandingPageBannerButton>공지사항</LandingPageBannerButton>
        <LandingPageBannerButton>도움말</LandingPageBannerButton>
        <LandingPageBannerButton>게시판</LandingPageBannerButton>
        <LandingPageBannerButton>그룹</LandingPageBannerButton>
      </LowerContainer>
    </BannerContainer>
  );
};
