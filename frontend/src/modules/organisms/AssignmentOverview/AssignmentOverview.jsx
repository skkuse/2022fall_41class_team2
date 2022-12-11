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
import { apiClient } from "./../../../api/axios";
import { COLOR_SET } from "./../../../service/GetColor";

/* Styled components */
const GeneralContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;

  width: 1210px;
  max-height: 48em;
  min-height: min-content; /* needs vendor prefixes */

  /* TODO: 스크롤바 다크모드 css */
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9.76px;
    background-color: #d3d3da;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 975.505px;
    background-color: #bfbfbf;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  }
  overflow-y: auto;
`;

const GridContainer = styled.div`
  position: sticky;

  display: grid;
  width: 1210px;
  grid-template-columns: 1fr 3.5fr 1fr;
  grid-template-areas: "a b c";
  align-items: center;

  overflow: auto;
  flex: 1;
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
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 7.6fr;
  /* grid-template-rows: auto; */
  grid-template-rows: repeat(${(props) => props.numAssignment}, 70px) [last-line];
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

  const addNewLecture = async () => {
    apiClient
      .post("/api/lectures/", {
        name: "dummy data " + new Date().getTime(),
      })
      .then((val) => {
        console.log(val);
        if (val.status == 201) {
          alert("강의 생성 완료");
          window.location.reload();
          let lectureId = val.data.id;
        }
      });
  };

  const deleteLastLecture = async () => {
    apiClient
      .delete(
        `/api/lectures/${
          lectureSelector.results[lectureSelector.results.length - 1].id
        }/`
      )
      .then((val) => {
        console.log(val);
        // if(val.status == 201) {
        //   let lectureId = val.data.id;
        // }
      });
  };

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
          style: `background : ${
            COLOR_SET["MAIN_BACKGROUND"][settingSelector.backgroundColor]
          }`,
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
              // console.log(lecture.assignments.count);
              if (lecture.assignments.count > 0)
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
          // console.log(Date.parse(ass.deadline));
          // console.log(Date());
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
                    remainingTime={`${getTimeDiff(
                      new Date(ass.deadline),
                      new Date()
                    )}`}
                    submission={false}
                  ></AssignmentName>

                  <Deadline
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
  // console.log(typeof time1)
  // console.log(Date.parse(time1));
  // console.log(Date.parse(now));
  // console.log(diff.getFullYear() - 1970);
  // console.log(diff.getMonth());

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const _MS_PER_HOUR = 1000 * 60 * 60;
  const _MS_PER_MINUTE = 1000 * 60;
  const _MS_PER_SECOND = 1000;

  // Discard the time and time-zone information.
  let utc1 = Date.UTC(
    time1.getFullYear(),
    time1.getMonth(),
    time1.getDate(),
    time1.getHours(),
    time1.getMinutes(),
    time1.getSeconds()
  );
  let utc2 = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );

  const diffDate =
    utc1 - utc2 > 0 ? Math.floor((utc1 - utc2) / _MS_PER_DAY) : 0;
  const diffHour =
    utc1 - utc2 > 0
      ? Math.floor(((utc1 - utc2) % _MS_PER_DAY) / _MS_PER_HOUR)
      : 0;
  const diffMin =
    utc1 - utc2 > 0
      ? Math.floor(
          (((utc1 - utc2) % _MS_PER_DAY) % _MS_PER_HOUR) / _MS_PER_MINUTE
        )
      : 0;
  const diffSec =
    utc1 - utc2 > 0
      ? Math.floor(
          ((((utc1 - utc2) % _MS_PER_DAY) % _MS_PER_HOUR) % _MS_PER_MINUTE) /
            _MS_PER_SECOND
        )
      : 0;
  return `${diffDate}d ${diffHour}h ${diffMin}m ${diffSec}s`;
};
