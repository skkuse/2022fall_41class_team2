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
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const LowerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
`;

export const LandingPageBanner = ({ className, ...restProps }) => {
  return (
    <BannerContainer>
      {/* //! 마진은 아래 코드처럼 조립하는 부분에 div로 감싸서 직접 주세요 */}
      <TopContainer style={{marginTop: "10px"}}>
        {/* Settings icon */}
        <div style={{marginLeft: "20px"}}>
          {/* //! figpa 코드 추출 너무 믿지 마세요
              //! position: absolute, right: 90% 이런식의 코드는 안좋은 코드 같아요
              //! (실제로 position이 absolute여야 하는 경우에는 써도 되는데, 이렇게 레이아웃 잡을 떈 웬만하면 필요 없습니다)
              //! 또한 SettingsButton의 width가 100%였는데, 조립 부품은 최대한 자기 넓이 만큼만 가져가는게 좋아요 (여기선 21px)
          */}
          <SettingsButton />
        </div>
        {/* login and register button */}
        <div style={{marginRight: "284px"}}>
          <LoginAndRegisterButton />
        </div>
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
