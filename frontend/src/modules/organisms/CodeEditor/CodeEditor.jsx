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
// import Editor, { useMonaco } from "@monaco-editor/react";
import { Resizable } from "re-resizable";
import { useState, useEffect } from "react";
import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";
import { apiClient } from './../../../api/axios';
import { clearRepoAction, saveRepoListAction } from "../../../pages/EditorPage/EditorAction";
import { monaco } from 'react-monaco-editor';
import { saveRepoAction } from './../../../pages/EditorPage/EditorAction';
import { createRef } from "react";
import { changeRepoAction } from './../../../pages/EditorPage/EditorAction';

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
export const CodeEditor = ({assignment}) => {
  const headerContent = "코드 입력";
  let editorWidth = "1180px";

  const [editMode, setEditMode] = useState({ edit: true, altMode: "none" });
  const editorRef = createRef();

  const [repo, setRepo] = useState();
  const [monacoOption, setMonacoOption] = useState();
  const dispatch = useDispatch();
  const settingSelector = useSelector((state) => state.SettingReducer);
  const repoSelector = useSelector((state) => state.editorReducer);

  const [submitComplete, setSubmitComplete] = useState(false);
  let repoList = [];

  const [submitResult, setSubmitResult] = useState(null);

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

  const submitCode = async() => {
    try {
      const result = await apiClient.post("/api/outputs/results/", {
        repo_id: repoSelector.selectedModel.id,
        language: repoSelector.selectedModel.content.language,
        code: repoSelector.selectedModel.content.code
      });
      setSubmitResult(result.data);
      setSubmitComplete(true);
    } catch (error) {
      alert("제출은 4회 이상 할 수 없습니다.")
    }
  }

  const createDiffEditor = () => {
    var originalModel = monaco.editor.createModel(repoSelector.selectedModel.content.code, 'text/plain');
    var modifiedModel = monaco.editor.createModel(assignment.contents[0].answer_code, 'text/plain');
    // const editor = window.document.getElementsByClassName('react-monaco-editor-container')[0];
    const editor = window.document.getElementById('codeDiff');
    console.log(editor);
    var diffEditor = monaco.editor.createDiffEditor(editor);
    diffEditor.setModel({
      original: originalModel,
      modified: modifiedModel
    });
    console.log(window.document.getElementById('codeDiff'));
  }



  

    useEffect(() => {
      switch (editMode.altMode) {
        case "실행":
          break;

        case "채점":
        
          break;

        case "제출":
          submitCode();
          createDiffEditor();
          break;
      
        default:
          break;
      }
      console.log(editMode);
    }, [editMode]);


  const findByLanguage = (contents) => {
    const userLanguage = settingSelector.language.toLowerCase();
    return contents.find((content) => content.language == userLanguage);
  }



  const fetchRepoList = async() => {
    let result = await apiClient.get(`/api/repos/?assignment_id=${assignment.id}`);
    console.log(result.data.data.results);
    if(!result.data.data.results.length) {
      console.log("삽입" +JSON.stringify( assignment.contents));
      const userSkeleton = findByLanguage(assignment.contents);
      const postResult = await addRepo(userSkeleton.skeleton_code);
      result = await apiClient.get(`/api/repos/?assignment_id=${assignment.id}`);
    }
    const monacoModelList = result.data.data.results.map((repo) => {
      return repo;
    })
    return monacoModelList;
  }

  const addRepo = async(code) => {
    if(code) {
      const postResult = await apiClient.post("/api/repos/", {
        language: settingSelector.language.toLowerCase(), 
        code: code,
        assignment_id: assignment.id
      });
      return postResult;
    }
  }

  const handleRepo = async() => {
    repoList  = await fetchRepoList();
    dispatch(saveRepoListAction(repoList));
    dispatch(changeRepoAction(repoList[repoList.length - 1]));
  }

  useEffect( () => {
    handleRepo();
    return ()=>{
        // * 다른 과제로 들어갈 때 저장된 코드 비우기
        dispatch(clearRepoAction());
    }
  },[]);

  useEffect(() => {
    if (!monaco) return;
    
  }, [monaco]);

  useEffect(() => {

    if (settingSelector && repoSelector && repoSelector.selectedModel) {
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
        // model:model,
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

      setMonacoOption(options);
    }
    
  }, [repoSelector, repoSelector.selectedModel, settingSelector])

  if(!(repoSelector && repoSelector.selectedModel)) {
    return <></>;
  }

  console.log(editorRef);


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
                    {/* {
                      JSON.stringify( repoSelector.selectedModel.content.code)
                    } */}
                  </div>
                </ActionButtonWrapper>
              </div>
            </EditorHeaderWrapper>
            <div style={{ marginLeft: "12.42px", marginTop: "24.83px" }}>
              <EditorWrapper>
                <pre id="code">
                  print("hello world")
                </pre>
                <MonacoEditor
                  width="1180px"
                  height="820px"
                  language={repoSelector.selectedModel.content.language}
                  theme="vs-light"
                  data-lang="python"
                  value={repoSelector.selectedModel.content.code}
                  onChange={(e)=>{
                    monaco.editor.colorizeElement(window.document.getElementsByClassName("mtk1")[0]);
                    let repoTemp= repoSelector.selectedModel;
                    repoTemp.content.code = e;
                    dispatch(saveRepoAction(repoTemp));
                    const result = apiClient.put(`/api/repos/${repoSelector.selectedModel.id}/`,{
                      language: repoSelector.selectedModel.content.language,
                      code: repoSelector.selectedModel.content.code,
                      assignment_id: assignment.id
                    })
                    
                  }}
                  options={monacoOption}
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
                  {
                    submitComplete?
                    <div 
                    style={{
                      width: "560px",
                      height: "820px"
                    }}
                    id="codeDiff"
                    >
                    </div>
                  :
                  <MonacoEditor
                    width="560px"
                    height="820px"
                    theme="light"
                    value={assignment.contents[0].answer_code}
                    language={repoSelector.selectedModel.content.language}
                    options={monacoOption}
                  /> 
                  }
                  
                  
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
              {editMode.altMode === "제출" && submitResult.data && (
                <TerminalWrapper
                  style={{ marginLeft: "12.72px" }}
                  edit={editMode.edit}
                  altMode={editMode.altMode}
                >
                  <SubmissionResult submitResult={submitResult}/>
                </TerminalWrapper>
              )}
            </EvaluationWindowGrid>
          </>
        )}
      </EditorWindowWrapper>
    </>
  );
}