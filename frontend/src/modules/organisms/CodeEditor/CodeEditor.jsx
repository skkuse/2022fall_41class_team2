// 4. 코드 에디터 섹션

import { EditorHeader } from "../../atoms";
import { Text } from "../../atoms";

import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";

const EditorWindowWrapper = styled.div`
  width: 1180px;
  height: 820px;
`;
const EditorWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const EditorHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

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

    const headerContent = "코드 입력";

    return (
      <>
        <EditorWindowWrapper>
          <EditorHeaderWrapper>
            <EditorHeader content={headerContent} />
            <div style={{ marginRight: "27.78px" }}>
              <ActionButtonWrapper>
                <Text>실행</Text>
                <Text>채점</Text>
                <Text style={{ color: "#0535DC" }}>제출</Text>
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
        </EditorWindowWrapper>
      </>
    );
  }
};
