import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";

import {
  Banner,
  CodeEditor,
  Testcase,
  Problem,
  Terminal,
} from "../../modules/organisms/CodeEditor";

const EditorPageGrid = styled.div`
  display: grid;
  grid-template:
    "a c d"
    "b c d";

  height: 100vh;
`;

const ProblemWrapper = styled.div`
  grid-area: a;
`;
const TestcaseWrapper = styled.div`
  grid-area: b;
`;
const CodeEditorWrapper = styled.div`
  grid-area: c;
`;
const TerminalWrapper = styled.div`
  /* TODO: State로 변화시키기 */
  display: none;

  grid-area: d;
`;

export const EditorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <ProblemWrapper>
          <Problem />
        </ProblemWrapper>
        {/* TestCase */}
        <TestcaseWrapper>
          <Testcase />
        </TestcaseWrapper>
        {/* Editor */}
        <CodeEditorWrapper>
          <CodeEditor />
        </CodeEditorWrapper>
        {/* Terminal */}
        <TerminalWrapper>
          <Terminal />
        </TerminalWrapper>
      </EditorPageGrid>
    </>
  );
};
