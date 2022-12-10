import styled from "styled-components";
import { usePopper } from "react-popper";
import { useRef } from "react";

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
  background: #f9f9f9;
  box-shadow: -2px 8px 99px rgba(0, 0, 0, 0.25);
  border-radius: 90px;
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
  height: 14px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  text-align: center;

  color: #2d2d2d;

  display: flex;
  align-items: center;
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

const VisiblePop = styled.div`
  font-family: "Gmarket Sans TTF";
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const InvisiblePop = styled.div`
  visibility: hidden;
  pointer-events: none;
`;
export const LoginBox = ({ className, ...restProps }) => {
  const boxRef = useRef();
  const tooltipRef = useRef();

  const [isHovering, setIsHovering] = useState(false);

  const { styles, attributes } = usePopper(boxRef.current, tooltipRef.current);
  const handleMouseOverAndOut = () => {
    // using popper, pop the description
    setIsHovering(!isHovering);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const callback_uri = `${window.location.protocol}//${window.location.host}/auth/github`;
  console.log(callback_uri);

  return (
    <Box>
      <GeneralContainer>
        <TitleContainer>
          <Text>Coding CAT</Text>
          <Exclamation>!</Exclamation>
        </TitleContainer>
        <div style={{ marginTop: "48px" }}>
          <ImageContainer>
            <Img src="/images/img_.png" />
          </ImageContainer>
        </div>
        <div style={{ marginTop: "28px", marginBottom: "31px" }}>
          <DescContainer
            ref={boxRef}
            onMouseOver={handleMouseOverAndOut}
            onMouseOut={handleMouseOverAndOut}
          >
            {isHovering ? (
              <VisiblePop
                ref={tooltipRef}
                style={styles.popper}
                {...attributes.popper}
              >
                로그인은 오직 깃허브로만 가능합니다.
              </VisiblePop>
            ) : (
              <InvisiblePop
                ref={tooltipRef}
                style={styles.popper}
                {...attributes.popper}
              ></InvisiblePop>
            )}
            <Img src="/images/question_circled.svg" alt="Question mark" />
          </DescContainer>
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
