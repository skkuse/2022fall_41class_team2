import styled from "styled-components";

import { SettingsButton } from "../../molecules";
import { LoginAndRegisterButton } from "../../molecules";
import { LandingPageBannerButton } from "../../molecules";
import { UserBox } from "../UserBox/UserBox";
import React, {
  useState,
  useEffect,
  ReactNode,
  FC,
  createContext,
  useContext,
} from "react";
import { AuthContext } from "../../../App";
import { getItemWithExpireTime } from "../../../service/localStorage";
import { apiClient } from "./../../../api/axios";
import { UserDisplay } from "./../../molecules/UserDisplay/UserDisplay";

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90px;
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
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const LandingPageBanner = ({ className }) => {
  // * 유저 정보 가져오기
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let user = getItemWithExpireTime("user");
    if (user) {
      apiClient.get(`/api/auth/${user.id}/`).then((val) => {
        console.log(val.data.data);
        setUserData(val.data.data);
      });
    }
  }, []);

  return (
    <BannerContainer>
      <TopContainer style={{ marginTop: "10px" }}>
        {/* Settings icon */}
        <div style={{ marginLeft: "20px" }}>
          <SettingsButton />
        </div>
        {/* login and register button */}
        <div style={{ marginRight: "20px" }}>
          {userData ? (
            <UserDisplay userData={userData} />
          ) : (
            !getItemWithExpireTime("user") && <LoginAndRegisterButton />
          )}
        </div>
      </TopContainer>
      <LowerContainer style={{ marginTop: "10px", marginBottom: "20px" }}>
        <div style={{ marginLeft: "120px" }}>
          <LandingPageBannerButton>문제</LandingPageBannerButton>
        </div>
        <LandingPageBannerButton>강의</LandingPageBannerButton>
        <LandingPageBannerButton>공지사항</LandingPageBannerButton>
        <LandingPageBannerButton>도움말</LandingPageBannerButton>
        <LandingPageBannerButton>게시판</LandingPageBannerButton>
        <div style={{ marginRight: "120px" }}>
          <LandingPageBannerButton>그룹</LandingPageBannerButton>
        </div>
      </LowerContainer>
    </BannerContainer>
  );
};
