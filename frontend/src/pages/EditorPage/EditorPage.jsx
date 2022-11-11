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
    "a c"
    "b c";
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

export const EditorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {/* Banner */}
      <Banner />
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
        <Terminal />
      </EditorPageGrid>
    </>
  );
};
