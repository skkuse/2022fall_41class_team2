import { Link } from "react-router-dom";
import styled from "styled-components";

/* OAuth library */

/* Custom modules */
import { Text } from "./../../atoms";
import { SettingsIcon } from "./../../atoms";
import { ColorIcon } from "../../atoms/Icons";

/* Styled components */
const Box = styled.div`
  display: flex;
  width: 559px;
  height: 671px;
  background: #f9f9f9;
  box-shadow: -2px 8px 99px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const GeneralContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;

const SettingsIconWrapper = styled.div`
  margin-top: 16px;
  margin-left: 20px;
  margin-bottom: 0px;
  width: 38px;
  height: 38px;

  align-self: flex-start;
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

const BackgroundColorSelectorContainer = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  text-align: start;

  color: #000000;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: flex-start;
`;

const SettingsSelectorContainer = styled.div`
  width: 295px;
  height: 145px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  text-align: start;

  color: #000000;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  align-self: flex-start;
`;

const SettingsContainer = styled.div`
  width: 299px;
  height: 256px;

  display: flex;
  flex-direction: column;
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

export const SettingsBox = ({ className, ...restProps }) => {
  return (
    <>
      <Box>
        <GeneralContainer>
          <SettingsIconWrapper>
            <SettingsIcon />
          </SettingsIconWrapper>
          <TitleContainer>
            <div>Coding CAT</div>
            <div>
              <Exclamation>!</Exclamation>
            </div>
          </TitleContainer>
          <SettingsContainer>
            <BackgroundColorSelectorContainer>
              <div style={{ marginTop: "20px" }}>
                <Text>배경 색</Text>
              </div>
              <ColorIcon color="#ffffff" />
              <ColorIcon color="#1a0505" />
            </BackgroundColorSelectorContainer>
            <div style={{ marginTop: "70px" }}>
              <SettingsSelectorContainer>
                <Text>코드 에디터</Text>
              </SettingsSelectorContainer>
            </div>
          </SettingsContainer>
          <div style={{ marginTop: "85px", marginBottom: "86px" }}>
            <Link
              to="/"
              className={`${className} common-login-and-register-button`}
              style={{ textDecoration: "none" }}
            >
              <LoginButtonContainer>설정 완료</LoginButtonContainer>
            </Link>
          </div>
        </GeneralContainer>
      </Box>
    </>
  );
};
