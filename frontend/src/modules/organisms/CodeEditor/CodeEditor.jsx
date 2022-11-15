// 4. 코드 에디터 섹션

import { EditorHeader, EditorBackground } from "../../atoms";
import { Text } from "../../atoms";
import { Terminal } from "./Terminal";
import { Grading } from "./Grading";
import { SubmissionResult } from "./SubmissionResult";

import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Resizable } from "re-resizable";
import { useState, useEffect } from "react";
import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";

const EvaluationWindowGrid = styled.div`
  display: inline-grid;
  grid-template:
    "c d"
    "c d";
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
`;
const EditorWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 1180px;
  height: 820px;
`;

const TerminalWrapper = styled.div`
  /* TODO: State로 변화시키기 */
  display: ${(props) =>
    props.edit && props.altMode === "실행" ? "none" : "inline"};

  grid-area: d;
  grid-row: 1 / 3;

  width: 550px;
  height: 820px;
`;

const GradingWrapper = styled.div`
  /* TODO: State로 변화시키기 */
  display: ${(props) =>
    props.edit && props.altMode === "채점" ? "none" : "inline"};

  grid-area: d;
  grid-row: 1 / 3;

  width: 550px;
  height: 820px;
`;
const SubmissionWrapper = styled.div`
  /* TODO: State로 변화시키기 */
  display: ${(props) =>
    props.edit && props.altMode === "제출" ? "none" : "inline"};

  grid-area: d;
  grid-row: 1 / 3;

  width: 550px;
  height: 820px;
`;

const EditorWrapper = styled.div`
  width: 550px;

  height: 100%;
`;
const EditorHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  width: ${(props) => (props.editMode.edit ? "100%" : "572px")};

  background: #bfbfbf;
`;

const ActionButtonWrapper = styled.div`
  width: 191px;

  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  /* identical to box height */

  text-align: center;

  color: #1e1e1e;
`;
export const CodeEditor = (props) => {
  const headerContent = "코드 입력";
  let editorWidth = "1180px";

  const [editMode, setEditMode] = useState({ edit: true, altMode: "none" });

  const changeMode = ({ src, ...restProps }) => {
    // altMode : none, grading, execution, submission

    if (src !== headerContent) {
      setEditMode({ edit: false, altMode: src });
      editorWidth = "590px";
    } else {
      setEditMode({ edit: true, altMode: "none" });
      editorWidth = "1180px";
    }

    // console.log(editMode);
  };

  useEffect(() => {
    console.log(editMode);
  }, [editMode]);

  const monaco = useMonaco();

  const settingSelector = useSelector((state) => state.SettingReducer);

  useEffect(() => {
    if (!monaco) return;
  }, [monaco]);

  if (settingSelector) {
    const options = {
      acceptSuggestionOnCommitCharacter: true,
      acceptSuggestionOnEnter: "on",
      accessibilitySupport: "auto",
      autoIndent: false,
      automaticLayout: true,
      codeLens: true,
      colorDecorators: true,
      contextmenu: true,
      cursorBlinking: "blink",
      cursorSmoothCaretAnimation: false,
      cursorStyle: "line",
      disableLayerHinting: false,
      disableMonospaceOptimizations: false,
      dragAndDrop: false,
      fixedOverflowWidgets: false,
      folding: true,
      foldingStrategy: "auto",
      fontLigatures: false,
      formatOnPaste: false,
      formatOnType: false,
      hideCursorInOverviewRuler: false,
      highlightActiveIndentGuide: true,
      links: true,
      mouseWheelZoom: false,
      multiCursorMergeOverlapping: true,
      multiCursorModifier: "alt",
      overviewRulerBorder: true,
      overviewRulerLanes: 2,
      quickSuggestions: true,
      quickSuggestionsDelay: 100,
      readOnly: false,
      renderControlCharacters: false,
      renderFinalNewline: true,
      renderIndentGuides: true,
      renderLineHighlight: "all",
      renderWhitespace: "none",
      revealHorizontalRightPadding: 30,
      roundedSelection: true,
      rulers: [],
      scrollBeyondLastColumn: 5,
      scrollBeyondLastLine: true,
      selectOnLineNumbers: true,
      selectionClipboard: true,
      selectionHighlight: true,
      showFoldingControls: "mouseover",
      smoothScrolling: false,
      suggestOnTriggerCharacters: true,
      wordBasedSuggestions: true,
      wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
      wordWrap: "off",
      wordWrapBreakAfterCharacters: "\t})]?|&,;",
      wordWrapBreakBeforeCharacters: "{([+",
      wordWrapBreakObtrusiveCharacters: ".",
      wordWrapColumn: 80,
      wordWrapMinified: true,
      wrappingIndent: "none",
    };

    return (
      <>
        <EditorWindowWrapper>
          {/* 코드 수정 상황 */}
          {editMode.edit && (
            <>
              <EditorHeaderWrapper editMode={editMode}>
                <div onClick={() => changeMode({ src: headerContent })}>
                  <EditorHeader content={headerContent} />
                </div>
                <div style={{ marginRight: "27.78px" }}>
                  <ActionButtonWrapper>
                    <div onClick={() => changeMode({ src: "실행" })}>실행</div>
                    <div onClick={() => changeMode({ src: "채점" })}>채점</div>
                    <div
                      style={{ color: "#0535DC" }}
                      onClick={() => changeMode({ src: "제출" })}
                    >
                      제출
                    </div>
                  </ActionButtonWrapper>
                </div>
              </EditorHeaderWrapper>
              <div style={{ marginLeft: "12.42px", marginTop: "24.83px" }}>
                <EditorWrapper>
                  <MonacoEditor
                    width="1180px"
                    height="820px"
                    theme="light"
                    // TODO: JSX에서 line break 전달 불가...
                    value="function hello() {\n\talert('Hello world!');\n}"
                    language={settingSelector.language.toLowerCase()}
                    options={options}
                  />
                </EditorWrapper>
              </div>
            </>
          )}

          {/* 실행/채점/제출/ 테스트케이스 검증 상황*/}
          {!editMode.edit && (
            <>
              <EvaluationWindowGrid>
                <EditorHeaderWrapper editMode={editMode}>
                  <div onClick={() => changeMode({ src: headerContent })}>
                    <EditorHeader content={headerContent} />
                  </div>
                  <div style={{ marginRight: "27.78px" }}>
                    <ActionButtonWrapper>
                      <div onClick={() => changeMode({ src: "실행" })}>
                        실행
                      </div>
                      <div onClick={() => changeMode({ src: "채점" })}>
                        채점
                      </div>
                      <div
                        style={{ color: "#0535DC" }}
                        onClick={() => changeMode({ src: "제출" })}
                      >
                        제출
                      </div>
                    </ActionButtonWrapper>
                  </div>
                </EditorHeaderWrapper>
                <div style={{ marginLeft: "12.42px", marginTop: "24.83px" }}>
                  <EditorWrapper>
                    <MonacoEditor
                      width="560px"
                      height="820px"
                      theme="light"
                      // TODO: JSX에서 line break 전달 불가...
                      value="function hello() {\n\talert('Hello world!');\n}"
                      language={settingSelector.language.toLowerCase()}
                      options={options}
                    />
                  </EditorWrapper>
                </div>
                {/* 실행 결과*/}
                {editMode.altMode === "실행" && (
                  <TerminalWrapper
                    style={{ marginLeft: "12.72px" }}
                    edit={editMode.edit}
                    altMode={editMode.altMode}
                  >
                    <Terminal />
                  </TerminalWrapper>
                )}
                {/* 채점 결과*/}
                {editMode.altMode === "채점" && (
                  <GradingWrapper
                    style={{ marginLeft: "12.72px" }}
                    edit={editMode.edit}
                    altMode={editMode.altMode}
                  >
                    <Grading />
                  </GradingWrapper>
                )}
                {/* 제출 결과*/}
                {editMode.altMode === "제출" && (
                  <TerminalWrapper
                    style={{ marginLeft: "12.72px" }}
                    edit={editMode.edit}
                    altMode={editMode.altMode}
                  >
                    <SubmissionResult />
                  </TerminalWrapper>
                )}
              </EvaluationWindowGrid>
            </>
          )}
        </EditorWindowWrapper>
      </>
    );
  }
};
