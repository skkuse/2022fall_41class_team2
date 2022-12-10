import styled from "styled-components";
import { Helmet } from "react-helmet";

import { LoginBox } from "../../modules/organisms";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const LoginBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const callback_uri = `${window.location.protocol}//${window.location.host}/auth/github`;
  console.log(callback_uri);

  return (
    <>
      <Helmet
        bodyAttributes={{
          style:
            "background : linear-gradient(108.07deg, #C5C4FF 1.15%, #4844DE 100.82%)",
        }}
      />
      <LoginBoxWrapper>
        <LoginBox/>
      </LoginBoxWrapper>
    </>
  );
};
