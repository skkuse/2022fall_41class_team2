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

const EditorPageGrid = styled.div`
  display: inline-grid;
  grid-template:
    "a c"
    "b c";
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const ProblemWrapper = styled.div`
  grid-area: a;
`;
const TestcaseWrapper = styled.div`
  grid-area: b;
`;
const CodeEditorWrapper = styled.div`
  grid-area: c;
  grid-row: 1 / 3;

  width: 550px;
`;

export const EditorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const monaco = useMonaco();
  const params = useParams();

  const [ass, setAss] = useState();

  const settingSelector = useSelector((state) => state.SettingReducer);

  useEffect(() => {
    if (!monaco) return;

  }, [monaco]);

  useEffect(() => {
    apiClient.get(`/api/assignments/${params.assignment_id}/`).then((value) => {
      setAss(value.data.data);
    })
  },[])


  return (
    <>
      {/* Banner */}
      <Banner
        lectureName="소프트웨어공학"
        reamainingTime="2d 21h 24m 14s"
        assignmentName="Assginment1"
      />
      {/* Problem section*/}
      <EditorPageGrid>
        <ProblemWrapper style={{ marginLeft: "43px", marginTop: "25px" }}>
          {/* scroll test */}
          <Problem bodyContent="피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...피보나치 수열을 만드시오...v" />
        </ProblemWrapper>
        {/* TestCase */}
        <TestcaseWrapper style={{ marginLeft: "43px", marginTop: "9.77px" }}>
          <Testcase
            // TODO: 오브젝트 형태로 변경해서 표시
            bodyContent="테스트케이스 1>
          input: [1,2,3,4,5]
          output: [소공개]
          "
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
          <CodeEditor />
        </CodeEditorWrapper>
      </EditorPageGrid>
    </>
  );
};

