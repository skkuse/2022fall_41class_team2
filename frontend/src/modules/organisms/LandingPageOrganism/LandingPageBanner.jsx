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
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { COLOR_SET } from './../../../service/GetColor';

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90px;

  /* background: ${(props) => (props.darkMode ? "#1F1F32" : "#FFFFFF")}; */

  box-shadow: 0px 11px 7px rgba(0, 0, 0, 0.05);

  position: relative;
  /* top: 0; */
  z-index: 10;
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
  justify-content: space-around;
`;

export const LandingPageBanner = ({  }) => {
  // * 유저 정보 가져오기
  const settingSelector = useSelector((state) => state.SettingReducer);
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
    <>
    {/* <Helmet
        // bodyAttributes={{
        //   style: darkMode ? "background : #000000" : "background : #ffffff",
        // }}
        bodyAttributes={{
          style: `background : ${COLOR_SET['MAIN_TOP'][settingSelector.backgroundColor]}` ,
        }}
      /> */}

    <BannerContainer style={{backgroundColor: COLOR_SET['MAIN_TOP'][settingSelector.backgroundColor]}}>
      <TopContainer style={{ marginTop: "10px" }}>
        {/* Settings icon */}
        <div style={{ marginLeft: "20px" }}>
          <SettingsButton />
        </div>
        {/* login and register button */}
        <div style={{ marginRight: "120px" }}>
          {userData ? (
            <UserDisplay userData={userData}  />
          ) : (
            !getItemWithExpireTime("user") && <LoginAndRegisterButton />
          )}
        </div>
      </TopContainer>
      <LowerContainer style={{ marginTop: "10px", marginBottom: "20px" }}>
        <div style={{ marginLeft: "120px" }}>
          <LandingPageBannerButton >
            문제
          </LandingPageBannerButton>
        </div>
        <LandingPageBannerButton >
          강의
        </LandingPageBannerButton>
        <LandingPageBannerButton >
          공지사항
        </LandingPageBannerButton>
        <LandingPageBannerButton >
          도움말
        </LandingPageBannerButton>
        <LandingPageBannerButton >
          게시판
        </LandingPageBannerButton>
        <div style={{ marginRight: "120px" }}>
          <LandingPageBannerButton >
            그룹
          </LandingPageBannerButton>
        </div>
      </LowerContainer>
    </BannerContainer>
    </>
    
  );
};
