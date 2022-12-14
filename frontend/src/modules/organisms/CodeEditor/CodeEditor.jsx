// 4. 코드 에디터 섹션

import { EditorHeader, EditorBackground, Img } from "../../atoms";
import { Text } from "../../atoms";
import { Terminal } from "./Terminal";
import { Grading } from "./Grading";
import { SubmissionResult } from "./SubmissionResult";

import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Editor, { DiffEditor, useMonaco } from "@monaco-editor/react";
import { Resizable } from "re-resizable";
import { useState, useEffect } from "react";
import { render } from "react-dom";
// import MonacoEditor from "react-monaco-editor";
import { apiClient } from "./../../../api/axios";
import {
  clearRepoAction,
  saveRepoListAction,
} from "../../../pages/EditorPage/EditorAction";
import { monaco } from "react-monaco-editor";
import { saveRepoAction } from "./../../../pages/EditorPage/EditorAction";
import { createRef } from "react";
import { changeRepoAction } from "./../../../pages/EditorPage/EditorAction";
import { COLOR_SET } from "./../../../service/GetColor";
import { SETTING_BACKGROUND_WHITE } from "./../../../reducers/SettingReducer";
import { setTestcaseOff } from "./../../../pages/EditorPage/EditorAction";

const EditorWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const EvaluationWindowGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [col] 1fr [col] 1fr;

  width: 100%;
  height: 100%;
`;

const CodeEditorWrapper = styled.div`
  display: ${(props) => (props.others ? "none" : "inline")};
  grid-column: ${(props) =>
    props.magnified ? "col 1 / span 2" : "col 1 / span 1"};
  min-width: 360px;
`;

const TerminalWrapper = styled.div`
  /* TODO: State로 변화시키기 */
  display: ${(props) =>
    props.edit && props.altMode === "실행" ? "none" : "inline"};

  grid-column: ${(props) =>
    props.magnified ? "col 1 / span 2" : "col 2 / span 1"};
  min-width: 360px;

  height: 100%;
`;

const GradingWrapper = styled.div`
  /* TODO: State로 변화시키기 */
  display: ${(props) =>
    props.edit && props.altMode === "채점" ? "none" : "inline"};

  grid-column: ${(props) =>
    props.magnified ? "col 1 / span 2" : "col 2 / span 1"};
  min-width: 360px;

  height: 100%;
`;
const SubmissionWrapper = styled.div`
  /* TODO: State로 변화시키기 */
  display: ${(props) =>
    props.edit && props.altMode === "제출" ? "none" : "inline"};

  grid-area: d;
  grid-row: 1 / 3;

  height: 100%;
`;

const EditorWrapper = styled.div`
  flex: 1;

  height: 100vh;
`;
const EditorHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 41px;
  /* width: ${(props) => (props.editMode.edit ? "100%" : "572px")}; */

  /* background: ${(props) => (props.darkMode ? "#525263" : "#bfbfbf")}; */
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
const CoreButton = styled.div`
  width: 58px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  /* identical to box height */

  text-align: center;

  color: #1e1e1e;
  background: #d9d9d9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  cursor: pointer;
`;

export const CodeEditor = ({
  assignment,
  darkMode,
  changeRepo,
  setChangeRepo,
  editMode,
  setEditMode,
}) => {
  console.log(assignment);

  // Magnifier
  const [magnified2, setMagnified2] = useState(false);
  const [magnified3, setMagnified3] = useState(false);

  const headerContent = "코드 입력";
  const testcaseSelector = useSelector((state) => state.testcaseReducer);

  // const [editMode, setEditMode] = useState({ edit: true, altMode: "none" });
  const editorRef = createRef();
  const monaco = useMonaco();
  const [repo, setRepo] = useState();
  const [monacoOption, setMonacoOption] = useState();
  const dispatch = useDispatch();
  const settingSelector = useSelector((state) => state.SettingReducer);
  const repoSelector = useSelector((state) => state.editorReducer);

  const [submitComplete, setSubmitComplete] = useState(false);
  let repoList = [];

  const [submitResult, setSubmitResult] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    console.log(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const changeMode = ({ src, ...restProps }) => {
    // altMode : none, grading, execution, submission

    if (src !== headerContent) {
      setEditMode({ edit: false, altMode: src });
    } else {
      setEditMode({ edit: true, altMode: "none" });
    }

    // console.log(editMode);
  };

  const submitCode = async () => {
    // alert("submit!");
    dispatch(setTestcaseOff());
    setSubmitLoading(true);
    try {
      const result = await apiClient.post("/api/outputs/results/", {
        repo_id: repoSelector.selectedModel.id,
        language: repoSelector.selectedModel.content.language.toLowerCase(),
        code: repoSelector.selectedModel.content.code,
      });

      setSubmitResult(result.data);
      setSubmitComplete(true);
      changeMode({ src: "제출" });

      // if(submitResultValidate(result.data.data)) {
      //   setSubmitResult(result.data);
      //   setSubmitComplete(true);
      //   changeMode({ src: "제출" });
      // }
      // else{
      //   console.log(result.data.data);
      //   alert("solution 함수 아래에서 작성해주세요.");
      //   setSubmitComplete(false);
      // }
    } catch (error) {
      console.log(error);
      alert(error.response.data.data.detail);
      setSubmitComplete(false);
    }
    setSubmitLoading(false);
  };

  const submitResultValidate = (data) => {
    console.log(data);
    return (
      data.code_description &&
      data.functionality_result &&
      data.efficiency_result &&
      data.plagiarism_result &&
      data.readability_result
    );
  };

  const [pfList, setPfList] = useState(null);

  const executeTestCase = async (testcase_id) => {
    try {
      const result = await apiClient.post(
        `/api/outputs/testcases/${testcase_id}/`,
        {
          language: repoSelector.selectedModel.content.language.toLowerCase(),
          code: repoSelector.selectedModel.content.code,
        }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const executeAllTestCase = async () => {
    try {
      const result = await apiClient.post(`/api/outputs/testcases/`, {
        language: repoSelector.selectedModel.content.language.toLowerCase(),
        code: repoSelector.selectedModel.content.code,
        assignment_id: assignment.id,
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const scoringHandler = async () => {
    dispatch(setTestcaseOff());
    let tempPfList = [];
    const result = await executeAllTestCase();
    tempPfList = result.data.data.map((res) => {
      return {
        ...res,
        id: res.id,
      };
    });
    console.log(tempPfList);
    // for (const tc of assignment.testcases) {
    //   if (tc.id) {
    //     const result = await executeTestCase(tc.id);
    //     console.log(result);
    //     if (result) {
    //       tempPfList.push({
    //         ...result.data.data,
    //         id: tc.id,
    //       });
    //     }
    //   }
    // }
    setPfList(tempPfList);
    changeMode({ src: "채점" });
    console.log(tempPfList);
  };

  // useEffect(() => {
  //   monaco.editor.defineTheme('myTheme', {
  //     base: 'vs',
  //     inherit: true,
  //     rules: [{ background: 'EDF9FA' }],
  //     colors: {
  //       'editor.foreground': '#000000',
  //       'editor.background': '#EDF9FA',
  //       'editorCursor.foreground': '#8B0000',
  //       'editor.lineHighlightBackground': '#0000FF20',
  //       'editorLineNumber.foreground': '#008800',
  //       'editor.selectionBackground': '#88000030',
  //       'editor.inactiveSelectionBackground': '#88000015'
  //     }
  //   });
  //   monaco.editor.setTheme('myTheme');

  //   monaco.editor.defineTheme('dark', {
  //     base: 'vs',
  //     inherit: true,
  //     rules: [
  //       { token: 'custom-info', foreground: 'a3a7a9', background: 'ffffff' },
  //       { token: 'custom-error', foreground: 'ee4444' },
  //       { token: 'custom-notice', foreground: '1055af' },
  //       { token: 'custom-date', foreground: '20aa20' },
  //     ],
  //     colors: {
  //       "editor.background": '#1F1F32'
  //     }
  //   })
  // }, [])

  useEffect(() => {
    switch (editMode.altMode) {
      case "실행":
        // setSubmitComplete(true);
        break;

      case "채점":
        break;

      case "제출":
        // submitCode();
        break;

      default:
        break;
    }
    console.log(editMode);
  }, [editMode]);

  const findByLanguageDefault = (contents) => {
    const userLanguage = settingSelector.language.toLowerCase();
    console.log(contents.find((content) => content.language == userLanguage));
    return contents.find((content) => content.language == userLanguage);
  };

  const findByLanguageUsed = (contents) => {
    const userLanguage =
      repoSelector.selectedModel.content.language.toLowerCase();
    console.log(contents.find((content) => content.language == userLanguage));
    return contents.find((content) => content.language == userLanguage);
  };

  const fetchRepoList = async () => {
    let result = await apiClient.get(
      `/api/repos/?assignment_id=${assignment.id}`
    );
    console.log(result.data.data.results);
    if (!result.data.data.results.length) {
      const userSkeleton = findByLanguageDefault(assignment.contents);
      const postResult = await addRepo(userSkeleton.skeleton_code);
      result = await apiClient.get(
        `/api/repos/?assignment_id=${assignment.id}`
      );
    }
    const monacoModelList = result.data.data.results.map((repo) => {
      return repo;
    });
    return monacoModelList;
  };

  const addRepo = async (code) => {
    if (code) {
      const postResult = await apiClient.post("/api/repos/", {
        language: settingSelector.language.toLowerCase(),
        code: code,
        assignment_id: assignment.id,
      });
      return postResult;
    }
  };

  const handleRepo = async () => {
    repoList = await fetchRepoList();
    dispatch(saveRepoListAction(repoList, assignment.id));
    // dispatch(changeRepoAction(repoList[repoList.length - 1]));
  };

  useEffect(() => {
    handleRepo();
    return () => {
      // * 다른 과제로 들어갈 때 저장된 코드 비우기
      dispatch(clearRepoAction());
    };
  }, []);

  useEffect(() => {
    if (!monaco) return;
  }, [monaco]);

  if (!monaco) {
    return <>sdfd</>;
  }

  if (
    !(
      repoSelector &&
      repoSelector.selectedModel &&
      repoSelector.repoCreateInfo &&
      repoSelector.repoChangeInfo
    )
  ) {
    console.log(repoSelector);
    return <>dfsd</>;
  }

  console.log(editorRef);
  console.log(`SubmitResult ${submitResult}`);

  // TODO: 에러 표시
  const error = true;

  return (
    <>
      <EditorWindowWrapper>
        
        {/* 코드 수정 상황 */}
        {editMode.edit && (
          <>
            <EditorHeaderWrapper
              editMode={editMode}
              style={{
                backgroundColor:
                  COLOR_SET["EDITOR_EXPLAIN"][settingSelector.backgroundColor],
                color:
                  COLOR_SET["EDITOR_EXPLAIN_FONT"][
                    settingSelector.backgroundColor
                  ],
              }}
            >
              <div style={{ display: "flex" }}>
                <div onClick={() => changeMode({ src: headerContent })}>
                  <EditorHeader content={headerContent} darkMode={darkMode} />
                </div>
                {testcaseSelector.isOnTestcase && testcaseSelector.isError && (
                  <Img src="/images/error.svg" alt="error indicator" />
                )}
                {/* {
                  testcaseSelector.isOnTestcase && testcaseSelector.isError && JSON.stringify(testcaseSelector.errorContent)
                } */}
              </div>
              <div style={{ marginRight: "27.78px" }}>
                <ActionButtonWrapper darkMode={darkMode}>
                  {/* // ! 실행 삭제 */}
                  {/* <CoreButton onClick={() => changeMode({ src: "실행" })}>
                    실행
                  </CoreButton> */}
                  <CoreButton
                    onClick={() => {
                      // * 테스트케이스 채점
                      scoringHandler();
                    }}
                  >
                    채점
                    {/* {
                      JSON.stringify(pfList)
                    } */}
                  </CoreButton>
                  <CoreButton
                    style={{ color: "#0535DC" }}
                    onClick={() => submitCode()}
                  >
                    제출
                    {/* {
                      JSON.stringify( repoSelector.selectedModel.content.code)
                    } */}
                  </CoreButton>
                </ActionButtonWrapper>
              </div>
            </EditorHeaderWrapper>
            <div style={{ marginLeft: "12.42px", marginTop: "24.83px" }}>
              <EditorWrapper
                style={{ position: "relative" }}
                onScrollCapture={() => {
                  dispatch(setTestcaseOff());
                  console.log("?/");
                }}
                onScroll={() => {
                  console.log("?/");
                }}
              >
                {/* {
                  repoSelector.repoList.map((repo) => {
                    return (
                      <div style={{color:"white"}}>
                        {
                          repo.content.code
                        }
                      </div>
                    )
                  })
                }
                <h1 style={{color:"white"}}>{JSON.stringify(changeRepo)}</h1>
                
                <div style={{color:"white"}}>
                    {
                      JSON.stringify(repoSelector.repoCreateInfo + "fdf")
                    }
                  </div>

                  <div style={{color:"white"}}>
                    {
                      JSON.stringify(repoSelector.selectedModel.content.code)
                    }
                  </div> */}

                {repoSelector.selectedModel && (
                  <Editor
                    height={`calc(100% - 130px)`}
                    beforeMount={(monaco2) => {
                      // let editor = monaco2.editor.getEditors();
                      // console.log(editor);
                    }}
                    onMount={(editor, monaco2) => {
                      // monaco.editor
                      // console.log(monaco.editor.deltaDecorations);
                      // monaco.editor.getEditors();
                      editor.onDidScrollChange = () => {
                        dispatch(setTestcaseOff());
                        console.log("??????????");
                      };

                      editor.deltaDecorations(
                        [],
                        [
                          {
                            range: new monaco.Range(1, 1, 10, 1),
                            options: {
                              isWholeLine: true,
                              className: "myContentClass",
                              glyphMarginClassName: "myGlyphMarginClass",
                              zIndex: 1000,
                              minimap: false,
                            },
                          },
                        ]
                      );
                      setTimeout(() => {
                        editor.deltaDecorations(
                          [],
                          [
                            {
                              range: new monaco.Range(1, 1, 10, 1),
                              options: {
                                isWholeLine: true,
                                className: "myContentClass",
                                glyphMarginClassName: "myGlyphMarginClass",
                                zIndex: 1000,
                                minimap: false,
                              },
                            },
                          ]
                        );
                      }, 1000);

                      // alert(JSON.stringify(editor.getLineDecorations(2)));
                      console.log(editor.getLineDecorations(2));
                    }}
                    // beforeMount={(monaco)=>{
                    //   monaco.editor.edit
                    // }}

                    options={{
                      glyphMargin: true,
                      scrollBeyondLastLine: false,
                      scrollbar: {
                        alwaysConsumeMouseWheel: false, // defaults is true, false enables the behavior you describe
                      },
                    }}
                    glyphMargin={true}
                    language={repoSelector.selectedModel.content.language.toLowerCase()}
                    theme={
                      settingSelector.backgroundColor ===
                      SETTING_BACKGROUND_WHITE
                        ? "light"
                        : "vs-dark"
                    }
                    value={repoSelector.selectedModel.content.code}
                    onScroll={() => {
                      console.log("??");
                    }}
                    onChange={(e, ev) => {
                      console.log(repoSelector.selectedModel);
                      dispatch(setTestcaseOff());
                      if (
                        repoSelector.repoChangeInfo.isChanging ||
                        repoSelector.repoCreateInfo.isCreating
                      ) {
                        return;
                      }
                      let repoTemp = {
                        ...repoSelector.selectedModel,
                      };
                      repoTemp.content.code = e;
                      dispatch(saveRepoAction(repoTemp));
                      const result = apiClient.put(
                        `/api/repos/${repoSelector.selectedModel.id}/`,
                        {
                          language:
                            repoSelector.selectedModel.content.language.toLowerCase(),
                          code: repoSelector.selectedModel.content.code,
                          assignment_id: assignment.id,
                        }
                      );
                    }}
                  />
                )}
                {/* {
                    repoSelector.selectedModel && testcaseSelector.isOnTestcase && testcaseSelector.isError &&
                    <div style={{position:"absolute", top: testcaseSelector.errorContent.top, zIndex: 100, }}>
                      <div style={{backgroundColor:"rgba(249, 86, 86, 0.1)", width: "100%", height:"19px"}}>

                      </div>

                      {testcaseSelector.errorContent.content
                        .split("\n")
                        .map((line) => {
                          return (
                            <div
                              style={{
                                paddingLeft: "83px",
                                backgroundColor: "rgba(204, 229, 198, 1.0)",
                                width: "100vw",
                              }}
                            >
                              {line}
                            </div>
                          );
                        })}
                    </div>
                  } */}

                {(repoSelector.repoChangeInfo.isChanging ||
                  repoSelector.repoCreateInfo.isCreating) && (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255,255,255, 0.1)",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1000,
                    }}
                  ></div>
                )}
              </EditorWrapper>
            </div>
          </>
        )}

        {/* 실행/채점/제출/ 테스트케이스 검증 상황*/}
        {!editMode.edit && (
          <>
            <EvaluationWindowGrid>
              <CodeEditorWrapper magnified={magnified2} others={magnified3}>
                <EditorHeaderWrapper
                  editMode={editMode}
                  style={{
                    backgroundColor:
                      COLOR_SET["EDITOR_EXPLAIN"][
                        settingSelector.backgroundColor
                      ],
                    color:
                      COLOR_SET["EDITOR_EXPLAIN_FONT"][
                        settingSelector.backgroundColor
                      ],
                  }}
                >
                  <div onClick={() => changeMode({ src: headerContent })}>
                    <EditorHeader content={headerContent} darkMode={darkMode} />
                  </div>
                  {/* <div style={{ marginRight: "27.78px" }}>
                  <ActionButtonWrapper>
                    <CoreButton onClick={() => changeMode({ src: "실행" })}>
                      실행
                    </CoreButton>
                    <CoreButton onClick={() => changeMode({ src: "채점" })}>
                      채점
                    </CoreButton>
                    <CoreButton
                      style={{ color: "#0535DC" }}
                      onClick={() => changeMode({ src: "제출" })}
                    >
                      제출
                    </CoreButton>
                  </ActionButtonWrapper>
                </div> */}
                  <div style={{ marginRight: "10px" }}>
                    <Img
                      src={
                        magnified2
                          ? "/images/minimize.svg"
                          : "/images/maximize.svg"
                      }
                      onClick={() => setMagnified2(!magnified2)}
                    />
                  </div>
                </EditorHeaderWrapper>
                <div style={{ marginTop: "24.83px" }}>
                  <EditorWrapper>
                    {submitComplete ? (
                      <DiffEditor
                        // TODO : inline diff로 변경?
                        // width="560px"
                        // height="820px"
                        language={repoSelector.selectedModel.content.language.toLowerCase()}
                        original={repoSelector.selectedModel.content.code}
                        modified={
                          findByLanguageUsed(assignment.contents).answer_code
                        }
                        theme={
                          settingSelector.backgroundColor ===
                          SETTING_BACKGROUND_WHITE
                            ? "light"
                            : "vs-dark"
                        }
                        options={{
                          renderSideBySide: false,
                          readOnly: true,
                        }}
                      />
                    ) : (
                      <Editor
                        // width="560px"
                        // height="820px"
                        theme={
                          settingSelector.backgroundColor ===
                          SETTING_BACKGROUND_WHITE
                            ? "light"
                            : "vs-dark"
                        }
                        value={repoSelector.selectedModel.content.code}
                        language={repoSelector.selectedModel.content.language.toLowerCase()}
                      />
                    )}
                  </EditorWrapper>
                </div>
              </CodeEditorWrapper>

              {/* 실행 결과*/}
              {/* // ! 실행 삭제 */}
              {/* {editMode.altMode === "실행" && (
                <TerminalWrapper
                  style={{ marginLeft: "12.72px" }}
                  edit={editMode.edit}
                  altMode={editMode.altMode}
                >
                  <Terminal darkMode={darkMode} />
                </TerminalWrapper>
              )} */}
              {/* 채점 결과*/}
              {editMode.altMode === "채점" && (
                <GradingWrapper
                  edit={editMode.edit}
                  altMode={editMode.altMode}
                  magnified={magnified3}
                >
                  <Grading
                    darkMode={darkMode}
                    pfList={pfList}
                    magnified={magnified3}
                    setMagnified={setMagnified3}
                  />
                </GradingWrapper>
              )}
              {/* 제출 결과*/}

              {editMode.altMode === "제출" &&
                submitResult &&
                submitResult.data && (
                  <TerminalWrapper
                    edit={editMode.edit}
                    altMode={editMode.altMode}
                    magnified={magnified3}
                  >
                    <SubmissionResult
                      darkMode={darkMode}
                      submitResult={submitResult}
                      magnified={magnified3}
                      setMagnified={setMagnified3}
                    />
                  </TerminalWrapper>
                )}
            </EvaluationWindowGrid>
          </>
        )}
      </EditorWindowWrapper>

      {submitLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: 10000,
            top: 0,
            left: 0,
            width: "100vw",
            height: "140vh",
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
        >
          Loading...
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

// export const makeMonacoModel = (repo, dispatch) => {
//   let model = monaco.editor.createModel(`${(repo.content.code)}`.replace("\\n","<br>"), "python");
//   model.onDidChangeContent((e) => {
//     console.log(e);
//     let codeTempList = model.getLinesContent();
//     let codeTemp = "";
//     codeTempList.forEach(element => {
//       if(element == "") {
//         codeTemp+= "\n";
//       }
//       else{
//         codeTemp+=element;
//       }
//     });

//     repo.content = {
//       code: codeTemp,
//       language: "python"
//     }

//     console.log("?ASDgsdg");

//     // dispatch(saveRepoAction(repo));
//   })
//   return model;
// }
