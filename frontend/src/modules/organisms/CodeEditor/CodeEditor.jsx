// 4. 코드 에디터 섹션

// import EditorMaster from "../molecules/EditorMaster/EditorMaster";

import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";
const EditorWrapper = styled.div``;

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

    return (
      <>
        <EditorWrapper>
          <MonacoEditor
            width="80%"
            height="86%"
            theme="light"
            value="function hello() {\n\talert('Hello world!');\n}"
            language={settingSelector.language.toLowerCase()}
            options={options}
          />
        </EditorWrapper>
      </>
    );
  }
};
