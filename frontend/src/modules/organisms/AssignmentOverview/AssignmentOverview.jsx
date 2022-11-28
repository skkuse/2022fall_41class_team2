import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

/* Custom modules */
import { Text } from "../../atoms";
import { SettingsIcon } from "../../atoms";
import { ColorIcon } from "../../atoms/Icons";
import { AssignmentList } from "../../molecules";
import { LectureName, AssignmentName, Deadline } from "../../atoms";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { apiClient } from './../../../api/axios';

/* Styled components */
const GeneralContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 1210px;
  height: 100%;
`;

const GridContainer = styled.div`
  position: sticky;

  display: grid;
  width: 1210px;
  grid-template-columns: 1fr 3.5fr 1fr;
  grid-template-areas: "a b c";
  align-items: center;
`;

const ButtonContainer = styled.div`
  grid-area: b;
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

const NameContainer = styled.div`
  width: auto;

  display: flex;

  align-items: stretch;

  grid-row: 1 / last-line;
  
`;

const AssignmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(${(props) => props.numAssignment}, 68px);
  row-gap: 4px;
  grid-column-gap: 1px;
  width: 100%;
  
`;
const AssignmentBlockContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: auto;
`;

const LectureGroup = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 7.6fr;
  grid-template-rows: repeat(${(props) => props.numAssignment}, 68px)[last-line];
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GridAligner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Separator = styled.div`
  height: 50px;
  width: 100%;
`;

export const AssignmentOverview = ({ className, darkMode, ...restProps }) => {
  const settingSelector = useSelector((state) => state.SettingReducer);
  const navigate = useNavigate();

  /* Dropdown options */
  // Background options
  const [currentBack, setCurrentBack] = useState(
    settingSelector.backgroundColor
  );

  const lectureSelector = useSelector((state) => state.LectureReducer.lectures);

  // Language options
  const [currentLang, setCurrentLang] = useState(settingSelector.language);
  const dispatch = useDispatch();

  const addNewLecture = async() => {
    apiClient.post("/api/lectures/", {
      name: "dummy data"
    }).then((val) => {
      console.log(val);
      if(val.status == 201) {
        alert("강의 생성 완료");
        window.location.reload();
        let lectureId = val.data.id;
      }
    })
  }

  const deleteLastLecture = async() =>{
    apiClient.delete(`/api/lectures/${lectureSelector.results[lectureSelector.results.length - 1].id}/`)
          .then((val) => {
            console.log(val);
            // if(val.status == 201) {
            //   let lectureId = val.data.id;
            // }
          })
  }

  const colorList = [
    ["#B1D3C5", "#C6D7D0", "#D1D9D6"],
    ["#6ECEDA", "#A5D5DB", "#C0D8DB"],
    ["#D18063", "#D6AE9F", "#D9C5BD"],
    ["#B57FB3", "#C8ADC7", "#D2C4D1"],
    ["#EADB80", "#E3DBAE", "#DFDBC5"],
    ["#E098AE", "#DEBAC5", "#DDCBD0"],
  ];

  if (!lectureSelector) {
    return <></>;
  }

  return (
    <>
      <Helmet
        bodyAttributes={{
          style: darkMode ? "background : #000000" : "background : #FFFFFF",
        }}
      />
      <GridAligner>
        <GridContainer>
          <TopContainer style={{ marginTop: "66px" }}>
            <MiddleContainer>
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
                <ListIndicatorBox onClick={addNewLecture}>
                  <Text>강의 추가</Text>
                </ListIndicatorBox>

               
              </ButtonContainer>
              <ListDivLine></ListDivLine>
            </MiddleContainer>
          </TopContainer>
        </GridContainer>

        <div style={{ marginTop: "25px" }}></div>
        <GeneralContainer>
          {/* TODO 강의 개수만큼 pooling */}
          {lectureSelector.results && lectureSelector.results.length ? (
            lectureSelector.results.map((lecture, index) => {
              return (
                <>
                  <LectureGroupComp
                    key={JSON.stringify(lecture)}
                    lecture={lecture}
                    color={colorList[(colorList.length - 1) % (index + 1)]}
                  />

                  <Separator></Separator>
                </>
              );
            })
          ) : (
            <div>아직 지정된 강의가 없습니다.</div>
          )}
        </GeneralContainer>
      </GridAligner>
    </>
  );
};

const LectureGroupComp = ({ lecture, color }) => {
  // console.log(JSON.stringify(lecture));
  return (
    <LectureGroup numAssignment={`${lecture.assignments.results.length}`}>
      {/* <>
      {
        JSON.stringify(lecture.assignments)
      }
    </> */}
      <NameContainer>
        <LectureName name={`${lecture.name}`} background={color[0]} />
      </NameContainer>
      {/* TODO: 과제 개수만큼 pooling */}

      <AssignmentGrid numAssignment={`${lecture.assignments.results.length}`}>
        {lecture.assignments.results.map((ass) => {
          return (
            <>
              <Link
                key={JSON.stringify(ass)}
                to={{
                  pathname: `/assignment/${ass.id}`,
                  // state:"asdfasdf"
                }}
                state={{
                  lecture: lecture,
                }}
                style={{
                  textDecoration: "none",
                  flexBasis: "auto",
                  content: "fill",
                }}
              >
                <AssignmentBlockContainer>
                  <AssignmentName
                    assignment={`${ass.name}`}
                    background={color[1]}
                    submission={false}
                  ></AssignmentName>

                  <Deadline
                    danger={false}
                    remainingTime={`${getTimeDiff(
                      new Date(ass.deadline),
                      new Date()
                    )}`}
                    background={color[2]}
                    submission={false}
                  ></Deadline>
                </AssignmentBlockContainer>
              </Link>
            </>
          );
        })}
      </AssignmentGrid>
    </LectureGroup>
  );
};

export const getTimeDiff = (time1, now) => {
  let diff = new Date(time1 - now);
  // console.log(time1);
  // console.log(diff.getFullYear() - 1970);
  // console.log(diff.getMonth());
  const diffDate = diff.getDate();
  const diffHour = diff.getHours();
  const diffMin = diff.getMinutes();
  const diffSec = diff.getSeconds();
  return `${diffDate}d ${diffHour}h ${diffMin}m ${diffSec}s`;
};
