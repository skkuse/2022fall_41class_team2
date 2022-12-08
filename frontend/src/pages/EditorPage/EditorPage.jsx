import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { apiClient } from "../../api/axios";

import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";

import {
  Banner,
  CodeEditor,
  Testcase,
  Problem,
} from "../../modules/organisms/CodeEditor";
import { getTimeDiff } from "../../modules/organisms/AssignmentOverview/AssignmentOverview";

const EditorPageGrid = styled.div`
  display: inline-grid;
  grid-template:
    "a c"
    "b c";
  grid-auto-columns: 0.5fr 1fr;
  grid-template-rows: repeat(2, 1fr);

  width: 100vw;
  height: 100vh;
`;

const ProblemWrapper = styled.div`
  grid-area: a;
  min-width: 360px;
  
`;
const TestcaseWrapper = styled.div`
  grid-area: b;
`;
const CodeEditorWrapper = styled.div`
  grid-area: c;
  grid-row: 1 / 3;
`;

const GeneralContainer = styled.div`
  height: 100vh;
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
  overflow-y: hidden;
`;

export const EditorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const monaco = useMonaco();
  const params = useParams();

  const [lecture, setLecture] = useState();
  const [ass, setAss] = useState();
  const [changeRepo, setChangeRepo] = useState(false);

  const settingSelector = useSelector((state) => state.SettingReducer);

  useEffect(() => {
    if (!monaco) return;
  }, [monaco]);

  useEffect(() => {
    setLecture(location.state.lecture);
    apiClient.get(`/api/assignments/${params.assignment_id}/`).then((value) => {
      setAss(value.data.data);
      // * 테케 없으면 새로 추가
      if (!value.data.data.testcases.length) {
        apiClient
          .post("/api/testcases/", {
            input: "[0,1,10]",
            output: "100",
            assignment_id: params.assignment_id,
            is_hidden: false,
          })
          .then((value) => {
            console.log(value);
            apiClient
              .get(`/api/assignments/${params.assignment_id}/`)
              .then((value) => {
                setAss(value.data.data);
              });
          })
          .then((value) => {
            apiClient
              .get(`/api/assignments/${params.assignment_id}/`)
              .then((value) => {
                setAss(value.data.data);
              });
          });
      } else {
        setAss(value.data.data);
      }
    });
  }, []);

  if (!ass) {
    return <></>;
  }
  // TODO: settingSelector에 따라서 LandingPageScenery의 배경을 바꿔야 함
  const darkMode = false;
  return (
    <GeneralContainer>
      <Helmet
        bodyAttributes={{
          style: darkMode ? "background : #000000" : "background : #FFFFFF",
        }}
      />

      {/* Banner */}
      <Banner
        lectureName={lecture.name}
        reamainingTime={`${new Date(ass.deadline)}`}
        assignmentName={ass.name}
        assignment={ass}
        darkMode={darkMode}
        changeRepo={changeRepo}
        setChangeRepo={setChangeRepo}
      />
      {/* Problem section*/}
      <EditorPageGrid>
        <ProblemWrapper style={{ marginLeft: "43px", marginTop: "25px" }}>
          {/* scroll test */}
          <Problem bodyContent={ass.question} darkMode={darkMode} />
        </ProblemWrapper>
        {/* TestCase */}
        <TestcaseWrapper style={{ marginLeft: "43px", marginTop: "10px" }}>
          <Testcase
            // // TODO: 오브젝트 형태로 변경해서 표시
            bodyContent={`테스트케이스 1>
            input: [1,2,3,4]
            output: [소공개]`}
            testCases={ass.testcases}
            darkMode={darkMode}
          />
        </TestcaseWrapper>

        {/* Editor */}
        <CodeEditorWrapper
          style={{
            marginLeft: "12.72px",
            marginTop: "25px",
            marginRight: "43px",
          }}
        >
          <CodeEditor
            assignment={ass}
            darkMode={darkMode}
            changeRepo={changeRepo}
            setChangeRepo={setChangeRepo}
          />
        </CodeEditorWrapper>
      </EditorPageGrid>
    </GeneralContainer>
  );
};
