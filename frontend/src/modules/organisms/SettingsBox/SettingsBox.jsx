import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  text-align: center;

  color: #000000;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // align-self: flex-start;
`;

const SettingsSelectorContainer = styled.div`
  height: 145px;

  margin-right: 0px;
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
  width: 350px;
  height: 256px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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

const CodeEditorSelectorContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #000000;
`;

const StyledHtmlSelect = styled.select`
  width: 147px;
  text-align: center;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  padding: 0;
  margin: 0 0 0 10px;
  height: 25px !important;

  background: #fff;
  border: 2px solid #bfbfbf;
  border-radius: 5px;
`;

export const SettingsBox = ({ className, ...restProps }) => {
  /* Dropdown options */
  // Language options
  const [currentLang, setCurrentLang] = useState("Python");
  const onChangeLang = (e) => {
    setCurrentLang(e.target.value);
  };
  const optionsLang = [
    { key: 1, value: "Python" },
    { key: 2, value: "JavaScript" },
    { key: 3, value: "C++" },
    { key: 4, value: "Java" },
    { key: 5, value: "C" },
    { key: 6, value: "C#" },
  ];

  // Theme options
  const [currentTheme, setCurrentTheme] = useState("Default"); // TODO: adapt to Monaco library
  const onChangeTheme = (e) => {
    setCurrentTheme(e.target.value);
  };
  const optionsTheme = [
    { key: 1, value: "VS Code" },
    { key: 2, value: "Dark" },
    { key: 3, value: "Light" },
  ];

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
          <div style={{ marginTop: "58px" }}>
            <SettingsContainer>
              <BackgroundColorSelectorContainer>
                <div style={{ justifyContent: "center" }}>
                  <Text>배경 색</Text>
                </div>
                <div style={{ marginLeft: "90px" }}>
                  <ColorIcon
                    color="#ffffff"
                    onClick={() => {
                      restProps.theme = "#ffffff"; // TODO: setting theme props
                    }}
                  />
                </div>
                <ColorIcon
                  color="#1a0505"
                  onClick={() => {
                    restProps.theme = "#1a0505"; // TODO: setting theme props
                  }}
                />
              </BackgroundColorSelectorContainer>
              <div style={{ marginTop: "60px" }}>
                <SettingsSelectorContainer>
                  <Text>코드 에디터</Text>
                  <CodeEditorSelectorContainer>
                    <Text>Language</Text>
                    <StyledHtmlSelect
                      onChange={onChangeLang}
                      value={currentLang}
                    >
                      {optionsLang.map((option) => (
                        <option key={option.key} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </StyledHtmlSelect>
                  </CodeEditorSelectorContainer>
                  <CodeEditorSelectorContainer>
                    <Text>Theme</Text>
                    <StyledHtmlSelect
                      onChange={onChangeTheme}
                      value={currentTheme}
                    >
                      {optionsTheme.map((option) => (
                        <option key={option.key} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </StyledHtmlSelect>
                  </CodeEditorSelectorContainer>
                </SettingsSelectorContainer>
              </div>
            </SettingsContainer>
          </div>
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
