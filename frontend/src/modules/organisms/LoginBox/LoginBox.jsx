import React from "react";
import styled from "styled-components";

import { SettingsButton } from "../../molecules";
import { LoginAndRegisterButton } from "../../molecules";
import { LandingPageBannerButton } from "../../molecules";

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

const Box = styled.div`
  display: flex;

  width: 469px;
  height: 488px;
  background: #ffffff;
`;

export const LoginBox = ({ className, ...restProps }) => {
  return <></>;
};
