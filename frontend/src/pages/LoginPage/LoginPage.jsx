import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useDispatch } from "react-redux";
import { getItemWithExpireTime } from "../../service/localStorage";
import React, {
  useState,
  useEffect,
  ReactNode,
  FC,
  createContext,
  useContext,
} from "react";
import { AuthContext } from "../../App";
import { Link, Navigate, Outlet, Route, useNavigate } from "react-router-dom";

import { LoginBox } from "../../modules/organisms";

const LoginBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const client_id = "4c3bebb649e5fd4d455f";
  const callback_uri = `http://${window.location.host}/login/redirect`;
  console.log(callback_uri);

  return (
    <>
      <Helmet
        bodyAttributes={{
          style:
            "background : linear-gradient(108.07deg, #C5C4FF 1.15%, #4844DE 100.82%)",
        }}
      />
      <div style={{}}>
        <LoginBoxWrapper>
          <LoginBox />
          <button
            onClick={() => {
              window.location.assign(
                `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${callback_uri}`
              );
            }}
          >
            login
          </button>
        </LoginBoxWrapper>
      </div>
    </>
  );
};
