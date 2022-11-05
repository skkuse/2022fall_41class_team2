import styled from "styled-components";

/* OAuth library */
import { useDispatch } from "react-redux";
import { getItemWithExpireTime } from "./../../../service/localStorage";
import React, {
  useState,
  useEffect,
  ReactNode,
  FC,
  createContext,
  useContext,
} from "react";
import { AuthContext } from "./../../../App";
import { Link, Navigate, Outlet, Route, useNavigate } from "react-router-dom";

/* Custom modules */
import { Text, Img } from "./../../atoms";

/* Styled components */
const Box = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-between;
  width: 469px;
  height: 488px;
  background: #ffffff;
  padding: 0 0;
`;

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 52.392px;
  line-height: 60px;
  text-align: center;

  color: #3d3c78;
`;

const Exclamation = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 52.392px;
  line-height: 60px;
  text-align: center;

  color: #3d3c78;

  transform: rotate(15.07deg);
`;

const ImageContainer = styled.div`
  width: 84.97px;
`;

const DescContainer = styled.div`
  /* width: 131px; */
  heigth: 14px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  text-align: center;

  color: #2d2d2d;
`;

const Line = styled.div`
  width: 134px;
  height: 0px;
  border: 2px solid #2d2d2d;
`;

const LoginButtonContainer = styled.div`
  width: 295px;
  height: 72px;
  background: #555488;
  border-radius: 63.9px;

  display: flex;
  flex-direction: column;
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 28.775px;
  line-height: 33px;
  text-align: center;
  justify-content: center;
  color: #ffffff;

  cursor: pointer;
`;

export const LoginBox = ({ className, ...restProps }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const callback_uri = `http://${window.location.host}/auth/github`;
  console.log(callback_uri);

  return (
    <Box>
      <GeneralContainer>
        <TitleContainer>
          <Text>Coding CAT</Text>
          <Exclamation>!</Exclamation>
        </TitleContainer>
        <div style={{ marginTop: "71px" }}>
          <ImageContainer>
            <Img src="/images/img_.png" />
          </ImageContainer>
        </div>
        <div style={{ marginTop: "38px" }}>
          <DescContainer>오직 깃허브만 연동됩니다.</DescContainer>
          <Line></Line>
        </div>
        <div style={{ marginTop: "14px" }}>
          {/* {console.log(loggedOn)} */}
          <LoginButtonContainer
            onClick={() => {
              window.location.assign(
                `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${callback_uri}`
              );
            }}
          >
            로그인
          </LoginButtonContainer>
        </div>
      </GeneralContainer>
    </Box>
  );
};
