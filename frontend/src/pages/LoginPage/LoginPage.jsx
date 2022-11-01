import styled from "styled-components";
import { Helmet } from "react-helmet";

import { LoginBox } from "../../modules/organisms";

const LoginBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LoginPage = (loggedOn, ...restProps) => {
  return (
    <>
      <Helmet
        bodyAttributes={{
          style:
            "background : linear-gradient(108.07deg, #C5C4FF 1.15%, #4844DE 100.82%)",
        }}
      />
      <LoginBoxWrapper>
        <LoginBox loggedOn={loggedOn} />
      </LoginBoxWrapper>
    </>
  );
};
