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
import MonacoEditor from "react-monaco-editor";
import { apiClient } from "./../../../api/axios";
import {
  clearRepoAction,
  saveRepoListAction,
} from "../../../pages/EditorPage/EditorAction";
import { monaco } from "react-monaco-editor";
import { saveRepoAction } from "./../../../pages/EditorPage/EditorAction";
import { createRef } from "react";
import { changeRepoAction } from "./../../../pages/EditorPage/EditorAction";

const EvaluationWindowGrid = styled.div`
  display: inline-grid;
  grid-template:
    "c d"
    "c d";
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  height: 100vh;
`;
const EditorWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  overflow: hidden;
`;

const TerminalWrapper = styled.div`
  /* TODO: State로 변화시키기 */
  display: ${(props) =>
    props.edit && props.altMode === "실행" ? "none" : "inline"};

  grid-area: d;
  grid-row: 1 / 3;

  height: 100%;
`;

const GradingWrapper = styled.div`
  /* TODO: State로 변화시키기 */
  display: ${(props) =>
    props.edit && props.altMode === "채점" ? "none" : "inline"};

  grid-area: d;
  grid-row: 1 / 3;

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

  background: ${(props) => (props.darkMode ? "#525263" : "#bfbfbf")};
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
}) => {
  console.log(assignment);

  const headerContent = "코드 입력";

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
  const [submitLoading, setSubmitLoading] = useState(null);

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
    setSubmitLoading(true);
    try {
      const result = await apiClient.post("/api/outputs/results/", {
        repo_id: repoSelector.selectedModel.id,
        language: repoSelector.selectedModel.content.language,
        code: repoSelector.selectedModel.content.code,
      });
      if(submitResultValidate(result.data)) {
        setSubmitResult(result.data);
        setSubmitComplete(true);  
        changeMode({ src: "제출" });
      }
      else{
        alert("solution 함수 아래에서 작성해주세요.");
        setSubmitComplete(false);
      }
      
    } catch (error) {
      alert(error.response.data.data.detail);
      setSubmitComplete(false);
    }
    setSubmitLoading(false);
  };

  const submitResultValidate = (data) => {
    console.log(data);
    return data.code_description && data.functionality_result && data.efficiency_result && data.plagiarism_result && data.readability_result;
  }

  const [pfList, setPfList] = useState(null); 

  const executeTestCase = async (testcase_id) => {
    try {
      const result = await apiClient.post(
        `/api/outputs/testcases/${testcase_id}/`,
        {
          language: repoSelector.selectedModel.content.language,
          code: repoSelector.selectedModel.content.code,
        }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const scoringHandler = async () => {
    let tempPfList = [];
    for (const tc of assignment.testcases) {
      if (tc.id) {
        const result = await executeTestCase(tc.id);
        console.log(result);
        if (result) {
          tempPfList.push({
            ...result.data.data,
            id: tc.id,
          });
        }
      }
    }
    setPfList(tempPfList);
    changeMode({ src: "채점" });
    console.log(tempPfList);
  };

  useEffect(() => {
    switch (editMode.altMode) {
      case "실행":
        // setSubmitComplete(true);
        break;

      case "채점":
        break;

      case "제출":
        submitCode();
        break;

      default:
        break;
    }
    console.log(editMode);
  }, [editMode]);

  const findByLanguage = (contents) => {
    const userLanguage = settingSelector.language.toLowerCase();
    return contents.find((content) => content.language == userLanguage);
  };

  const fetchRepoList = async () => {
    let result = await apiClient.get(
      `/api/repos/?assignment_id=${assignment.id}`
    );
    console.log(result.data.data.results);
    if (!result.data.data.results.length) {
      const userSkeleton = findByLanguage(assignment.contents);
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
    dispatch(saveRepoListAction(repoList));
    dispatch(changeRepoAction(repoList[repoList.length - 1]));
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

  if (
    !(
      repoSelector &&
      repoSelector.selectedModel &&
      repoSelector.repoCreateInfo &&
      repoSelector.repoChangeInfo
    )
  ) {
    console.log(repoSelector);
    return <></>;
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
            <EditorHeaderWrapper editMode={editMode} darkMode={darkMode}>
              <div style={{display:"flex"}}>
                <div onClick={() => changeMode({ src: headerContent })}>
                  <EditorHeader content={headerContent} darkMode={darkMode} />
                </div>
                <Img src="/images/error.svg" alt="error indicator" />
              </div>
              <div style={{ marginRight: "27.78px" }}>
                <ActionButtonWrapper darkMode={darkMode}>
                  <CoreButton onClick={() => changeMode({ src: "실행" })}>
                    실행
                  </CoreButton>
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
              <EditorWrapper style={{ position: "relative" }}>
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
                    // width="1180px"
                    // height="820px"
                    language={repoSelector.selectedModel.content.language}
                    theme={darkMode ? "vs-dark" : "light"}
                    value={repoSelector.selectedModel.content.code}
                    onChange={(e) => {
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
                          language: repoSelector.selectedModel.content.language,
                          code: repoSelector.selectedModel.content.code,
                          assignment_id: assignment.id,
                        }
                      );
                    }}
                  />
                )}

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
              <EditorHeaderWrapper editMode={editMode} darkMode={darkMode}>
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
              </EditorHeaderWrapper>
              <div style={{ marginLeft: "12.42px", marginTop: "24.83px" }}>
                <EditorWrapper>
                  {submitComplete ? (
                    <DiffEditor
                      // TODO : inline diff로 변경?
                      // width="560px"
                      // height="820px"
                      language={repoSelector.selectedModel.content.language}
                      original={repoSelector.selectedModel.content.code}
                      modified={assignment.contents[0].answer_code}
                      theme={darkMode ? "vs-dark" : "light"}
                      options={{
                        renderSideBySide: false,
                        readOnly: true,
                      }}
                    />
                  ) : (
                    <Editor
                      // width="560px"
                      // height="820px"
                      theme={darkMode ? "vs-dark" : "light"}
                      value={repoSelector.selectedModel.content.code}
                      language={repoSelector.selectedModel.content.language}
                    />
                  )}
                </EditorWrapper>
              </div>

              {/* 실행 결과*/}
              {editMode.altMode === "실행" && (
                <TerminalWrapper
                  style={{ marginLeft: "12.72px" }}
                  edit={editMode.edit}
                  altMode={editMode.altMode}
                >
                  <Terminal darkMode={darkMode} />
                </TerminalWrapper>
              )}
              {/* 채점 결과*/}
              {editMode.altMode === "채점" && (
                <GradingWrapper
                  style={{ marginLeft: "12.72px" }}
                  edit={editMode.edit}
                  altMode={editMode.altMode}
                >
                  <Grading darkMode={darkMode} pfList={pfList} />
                </GradingWrapper>
              )}
              {/* 제출 결과*/}

              {editMode.altMode === "제출" &&
                submitResult &&
                submitResult.data && (
                  <TerminalWrapper
                    style={{ marginLeft: "12.72px" }}
                    edit={editMode.edit}
                    altMode={editMode.altMode}
                  >
                    <SubmissionResult
                      darkMode={darkMode}
                      submitResult={submitResult}
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
