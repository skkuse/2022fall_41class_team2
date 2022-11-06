import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* Custom modules */
import { Text } from "../../atoms";
import { SettingsIcon } from "../../atoms";
import { ColorIcon } from "../../atoms/Icons";
import { AssignmentList } from "../../molecules";
import { LectureName, AssignmentName, Deadline } from "../../atoms";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

/* Styled components */
const Box = styled.div`
  display: flex;
  width: 559px;
  height: 671px;
  background: #f9f9f9;
  box-shadow: -2px 8px 99px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  align-items: center;
  justify-content: center;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;

const ListIndicatorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 122px;
  height: 42px;

  background: #7977eb;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 19.4234px;
  line-height: 22px;
  text-align: center;

  color: #ffffff;
`;

const ListDivLine = styled.div`
  width: 1210px;
  height: 2px;

  border: 2px solid rgba(99, 97, 219, 0.6);
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: stretch;
  align-self: flex-start;
`;

const AssignmentBlockContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const LectureGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AssignmentOverview = ({ className, ...restProps }) => {
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

  return (
    <>
      <GeneralContainer>
        <TopContainer style={{ marginTop: "66px" }}>
          <ButtonContainer
            style={{
              marginBottom: "15px",
              marginLeft: "15px",
              marginRight: "15px",
            }}
          >
            <ListIndicatorBox>
              <Text>강의 목록</Text>
            </ListIndicatorBox>
            <ListIndicatorBox>
              <Text>정렬 기준</Text>
            </ListIndicatorBox>
          </ButtonContainer>
          <ListDivLine></ListDivLine>
        </TopContainer>
        {/* TODO 강의 개수 및 과제 수만큼 만들기 */}
        <BottomContainer>
          <LectureGroup>
            <NameContainer>
              <LectureName name="소프트웨어공학개론" background="#99CB8C" />
            </NameContainer>
            <AssignmentBlockContainer>
              <AssignmentName
                assignment="Assignmnet 1"
                background="#99CB8C"
              ></AssignmentName>
              <Deadline
                danger={true}
                remainingTime={"2d 20h 30m 29s"}
                background="#99CB8C"
              ></Deadline>
            </AssignmentBlockContainer>
            <AssignmentBlockContainer>
              <AssignmentName
                assignment="Assignmnet 2"
                background="#99CB8C"
              ></AssignmentName>
              <Deadline
                danger={false}
                remainingTime={"20h 30m 29s"}
                background="#99CB8C"
              ></Deadline>
            </AssignmentBlockContainer>
          </LectureGroup>
        </BottomContainer>
      </GeneralContainer>
    </>
  );
};
