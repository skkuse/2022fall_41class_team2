import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* Custom modules */
import { Text } from "./../../atoms";
import { SettingsIcon } from "./../../atoms";
import { ColorIcon } from "../../atoms/Icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import {
  SETTING_BACKGROUND_WHITE,
  SETTING_LANGUAGE_PYTHON,
  SETTING_LANGUAGE_JAVASCRIPT,
  SETTING_LANGUAGE_CPP,
  SETTING_LANGUAGE_JAVA,
  SETTING_LANGUAGE_C,
  SETTING_LANGUAGE_CSHARP,
  SETTING_THEME_VSCODE,
  SETTING_BACKGROUND_BLACK,
} from "../../../reducers/SettingReducer";

import {
  settingChangeBg,
  settingChangeLg,
  settingChangeTh,
} from "../../../pages/SettingPage/SettingAction";

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
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 37px;
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
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 37px;
  text-align: start;

  color: #000000;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

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
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #000000;
`;

const StyledHtmlSelect = styled.select`
  width: 147px;
  text-align: center;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 18px;

  padding: 0;
  margin: 0 0 0 10px;
  height: 25px !important;

  background: #fff;
  border: 2px solid #bfbfbf;
  border-radius: 5px;
`;

export const SettingsBox = ({ className, ...restProps }) => {
  const settingSelector = useSelector((state) => state.SettingReducer);
  const navigate = useNavigate();

  /* Dropdown options */
  // Background options
  const [currentBack, setCurrentBack] = useState(
    settingSelector.backgroundColor
  );

  // Language options
  const [currentLang, setCurrentLang] = useState(settingSelector.language);
  const dispatch = useDispatch();

  const onChangeLang = (e) => {
    setCurrentLang(e.target.value);
  };
  const optionsLang = [
    { key: 1, value: SETTING_LANGUAGE_PYTHON },
    { key: 2, value: SETTING_LANGUAGE_JAVASCRIPT },
    { key: 3, value: SETTING_LANGUAGE_CPP },
    // { key: 4, value: SETTING_LANGUAGE_JAVA },
    { key: 5, value: SETTING_LANGUAGE_C },
    // { key: 6, value: SETTING_LANGUAGE_CSHARP },
  ];

  // Theme options
  const [currentTheme, setCurrentTheme] = useState(settingSelector.theme); // TODO: adapt to Monaco library
  const onChangeTheme = (e) => {
    setCurrentTheme(e.target.value);
  };
  const optionsTheme = [
    { key: 1, value: SETTING_THEME_VSCODE },
    // { key: 2, value: "Dark" },
    // { key: 3, value: "Light" },
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
                <div
                  style={{ marginLeft: "90px" }}
                  onClick={() => {
                    restProps.theme = "#ffffff"; // TODO: setting theme props
                    setCurrentBack(SETTING_BACKGROUND_WHITE);
                  }}
                >
                  <ColorIcon color="#ffffff" />
                </div>
                <div
                  onClick={() => {
                    restProps.theme = "#1a0505"; // TODO: setting theme props
                    setCurrentBack(SETTING_BACKGROUND_BLACK);
                  }}
                >
                  <ColorIcon color="#1a0505" />
                </div>
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
                  {/* <CodeEditorSelectorContainer>
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
                  </CodeEditorSelectorContainer> */}
                </SettingsSelectorContainer>
              </div>
            </SettingsContainer>
          </div>
          <div style={{ marginTop: "85px", marginBottom: "86px" }}>
            <Link
              onClick={() => {
                dispatch(settingChangeBg(currentBack));
                dispatch(settingChangeLg(currentLang));
                console.log(currentBack);
                // dispatch(settingChangeTh(currentTheme));
                navigate(-1);
              }}
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
