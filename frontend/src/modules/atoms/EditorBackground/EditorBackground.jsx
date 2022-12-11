import styled from "styled-components";
import { ResultVis } from "../../atoms";
import React, { useEffect, useCallback, useState } from "react";
import { Text } from "../../atoms";
import { useSelector, useDispatch } from "react-redux";
import { COLOR_SET } from "./../../../service/GetColor";
import {
  setTestcaseError,
  setTestcaseOn,
} from "./../../../pages/EditorPage/EditorAction";
import { apiClient } from "./../../../api/axios";

const READABILITY = 0;
const EFFICIENCY = 1;
const FUNCTIONALITY = 2;

const GRADING = 0;
const DESCRIPTION = 1;
const RECOMMENDATION = 2;

const WindowWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => (props.darkMode ? "#1F1F32" : "#eaeaea")};

  padding: 18.55px 18.55px 18.55px 18.55px;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 15.6237px;
  line-height: 18px;
  /* identical to box height */

  color: ${(props) => (props.darkMode ? "#D8D8D8" : "#1e1e1e")};

  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9.76px;
    background-color: ${(props) => (props.darkMode ? "#131323" : "#ffffff")};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 975.505px;

    /* box-shadow: 0 0 1px
      ${(props) => (props.darkMode ? "#d3d3da" : "rgba(0, 0, 0, 0.5)")}; */
  }
`;

const Bg = styled.div`
  width: 100%;
  height: 42vh;
  background: ${(props) => (props.darkMode ? "#1F1F32" : "#eaeaea")};

  padding: 18.55px 18.55px 18.55px 18.55px;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 15.6237px;
  line-height: 18px;
  /* identical to box height */

  color: ${(props) => (props.darkMode ? "#D8D8D8" : "#1e1e1e")};

  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9.76px;
    background-color: ${(props) => (props.darkMode ? "#131323" : "#ffffff")};
    border-radius: 975.505px 975.505px 0px 0px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 975.505px;
    background-color: #d3d3da;
    /* box-shadow: 0 0 1px
      ${(props) => (props.darkMode ? "#d3d3da" : "rgba(0, 0, 0, 0.5)")}; */
  }
`;

const BgTestCase = styled.div`
  width: 100%;
  /* height: 42vh; */
  background: ${(props) => (props.darkMode ? "#1F1F32" : "#eaeaea")};

  padding: 18.55px 18.55px 18.55px 18.55px;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 15.6237px;
  line-height: 18px;
  /* identical to box height */

  color: ${(props) => (props.darkMode ? "#D8D8D8" : "#1e1e1e")};

  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9.76px;
    background-color: ${(props) => (props.darkMode ? "#131323" : "#d3d3da")};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 975.505px;
    background-color: #d3d3da;
    /* box-shadow: 0 0 1px
      ${(props) => (props.darkMode ? "#d3d3da" : "rgba(0, 0, 0, 0.5)")}; */
  }
`;

const SubmitResultBg = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => (props.darkMode ? "#1F1F32" : "#eaeaea")};

  padding: 6px 0px 20px 0px;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 15.6237px;
  line-height: 18px;
  /* identical to box height */

  color: ${(props) => (props.darkMode ? "#D8D8D8" : "#1e1e1e")};

  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9.76px;
    background-color: ${(props) => (props.darkMode ? "#131323" : "#d3d3da")};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 975.505px;
    background-color: #d3d3da;
    /* box-shadow: 0 0 1px
      ${(props) => (props.darkMode ? "#d3d3da" : "rgba(0, 0, 0, 0.5)")}; */
  }
`;

const ResultVisContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  flex-wrap: wrap;
  /* height: 100vh; */
  width: 100%;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Selector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 510px;

  height: 30px;
`;
const Separator = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
`;
const ScoreDescriptor = styled.div`
  display: flex;

  box-sizing: border-box;

  width: 575px;
  max-width: 575px;
  height: 487px;
  min-height: 412px;
  background: ${(props) => (props.darkMode ? "#525263" : "#f6f6f6")};
  border: ${(props) =>
    props.darkMode ? "2px solid #52c0e7" : "2px solid #52c0e7"};
  border-radius: 11px;
  padding: 18.55px 18.55px 18.55px 18.55px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;

  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9.76px;
    background-color: ${(props) => (props.darkMode ? "#131323" : "#d3d3da")};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 975.505px;
    background-color: #d3d3da;
    /* box-shadow: 0 0 1px
      ${(props) => (props.darkMode ? "#d3d3da" : "rgba(0, 0, 0, 0.5)")}; */
  }
`;
const CodeDescriptor = styled.div`
  box-sizing: border-box;

  width: 575px;
  min-width: 575px;
  max-width: 575px;
  height: 83.1vh;
  min-height: 412px;
  background: ${(props) => (props.darkMode ? "#525263" : "#f6f6f6")};
  border: ${(props) =>
    props.darkMode ? "2px solid #52c0e7" : "2px solid #52c0e7"};
  border-radius: 11px;
  padding: 18.55px 18.55px 18.55px 18.55px;

  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9.76px;
    background-color: ${(props) => (props.darkMode ? "#131323" : "#d3d3da")};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 975.505px;
    background-color: #d3d3da;
    /* box-shadow: 0 0 1px
      ${(props) => (props.darkMode ? "#d3d3da" : "rgba(0, 0, 0, 0.5)")}; */
  }
`;

const Button = styled.div`
  width: 100%;

  display: block;
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  text-align: center;
`;

const TestCaseInput = styled.div`
  display: flex;
`;
const TestCaseOutput = styled.div`
  display: flex;
`;
const TestCaseResult = styled.div`
  display: flex;
  grid-column: col 4;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const TestCaseSeparator = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 450px;
  height: 0px;

  border: 4px solid #bfbfbf;
  transform: rotate(180deg);
`;

const TestCaseMasterGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [col] 150px [col] 150px [col] 150px [col] 150px;
  grid-template-rows: auto;
`;
const TestCaseIOContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-around;

  min-height: 80px;

  grid-column: col 1 / span 3;
  border-top: 4px solid #bfbfbf;
  border-bottom: 4px solid #bfbfbf;
`;
// const TestCaseResultContainer = styled.div`
//   display: flex;
// `;

const ReadabilityHighlighter = styled.div`
  color: ${(props) => (props.active ? "#FF9A3C" : "#1f1f32")};
  width: 170px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-itmes: stretch;
  background: ${(props) => (props.darkMode ? "#666681" : "#d9d9d9")};
  box-sizing: border-box;
  border: ${(props) =>
    props.active
      ? props.darkMode
        ? "1px solid #ffffff"
        : " 1px solid#000000"
      : "0"};
`;
const EfficiencyHighlighter = styled.div`
  color: ${(props) => (props.active ? "#98D964" : "#1f1f32")};
  width: 170px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-itmes: stretch;
  background: ${(props) => (props.darkMode ? "#666681" : "#d9d9d9")};
  box-sizing: border-box;
  border: ${(props) =>
    props.active
      ? props.darkMode
        ? "1px solid #ffffff"
        : " 1px solid#000000"
      : "0"};
`;
const FunctionalityHighlighter = styled.div`
  color: ${(props) => (props.active ? "#52C0E7" : "#1f1f32")};
  width: 170px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-itmes: stretch;
  background: ${(props) => (props.darkMode ? "#666681" : "#d9d9d9")};
  box-sizing: border-box;
  border: ${(props) =>
    props.active
      ? props.darkMode
        ? "1px solid #ffffff"
        : " 1px solid#000000"
      : "0"};
`;
const GradingHighlighter = styled.div`
  width: 195px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: ${(props) => (props.darkMode ? "#666681" : "#d9d9d9")};
  color: ${(props) => (props.darkMode ? "#d8d8d8" : "#3c3c3c")};
  box-sizing: border-box;
  border: ${(props) =>
    props.active
      ? props.darkMode
        ? "1px solid #ffffff"
        : " 1px solid#000000"
      : "0"};
`;
const DescriptionHighlighter = styled.div`
  width: 195px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: ${(props) => (props.darkMode ? "#666681" : "#d9d9d9")};
  color: ${(props) => (props.darkMode ? "#d8d8d8" : "#3c3c3c")};
  box-sizing: border-box;
  border: ${(props) =>
    props.active
      ? props.darkMode
        ? "1px solid #ffffff"
        : " 1px solid#000000"
      : "0"};
`;
const RecommendationHighlighter = styled.div`
width: 195px;
height: 30px;
display:flex;
justify-content: center;
align-items:center;
  border-radius: 5px;
  display:flex
  flex-direction:column;
  align-itmes:stretch;
  background: ${(props) => (props.darkMode ? "#666681" : "#d9d9d9")};
  color: ${(props) => (props.darkMode ? "#d8d8d8" : "#3c3c3c")};
  box-sizing:border-box;
  border: ${(props) =>
    props.active
      ? props.darkMode
        ? "1px solid #ffffff"
        : " 1px solid#000000"
      : "0"};
`;

const DescriptionContainer = styled.div`
  overflow-wrap: break-word;
`;

// const TextShadower = styled.div`
//   box-shadow: 0px 4px 4px 0px #00000040 inset;
// `;
export const EditorBackground = ({
  // Need refactoring

  mode,
  content,
  darkMode,
  assignmentId,
  id,
  pfList,
  testCaseValue,
  prob,
  restr,
  ...restProps
}) => {
  const dispatch = useDispatch();
  const settingSelector = useSelector((state) => state.SettingReducer);
  // redability result
  let readabilityResult = [];

  const [pfListLocal, setPfListLocal] = useState(pfList);
  const [testCaseData, setTestCaseData] = useState(testCaseValue);

  useEffect(() => {
    console.log("!!!!");
    console.log(testCaseValue);
    setTestCaseData(testCaseValue);
    console.log(testCaseData);
  }, [testCaseValue]);

  const repoSelector = useSelector((state) => state.editorReducer);
  // visualizing functionality result

  const [functionalityResult, setFunctionalityResult] = useState({});
  const onFunctionalityResultClick = () => {
    let temp_obj = {};
    // for (const testcase in content.functionality_result.testcase_results) {

    //  }
    content.functionality_result.testcase_results.forEach((testcase, index) => {
      temp_obj[`${testcase}${index}`] = testcase.is_pass ? 1 : 0;
    });
    setFunctionalityResult(temp_obj);
  };
  useEffect(() => {}, [functionalityResult]);

  const [activeIndexChart, setActiveIndexChart] = useState(READABILITY);
  const onButtonClickChart = useCallback(
    (flag) => {
      setActiveIndexChart(flag);

      if (flag === FUNCTIONALITY) {
        // Special handling
        console.log(`functionality: ${JSON.stringify(flag)}`);
        onFunctionalityResultClick();
      }

      // redability result
      readabilityResult = [];
      for (const [key, value] of Object.entries(content.readability_result)) {
        // console.log(`iter : ${key} , ${value}`);
        if (
          key !== "id" &&
          key !== "assignment_id" &&
          key !== "created_at" &&
          key !== "updated_at"
        ) {
          readabilityResult.push({ key: value });
        }
      }

      // console.log(`onclick : ${JSON.stringify(readabilityResult)}`);
    },
    [setActiveIndexChart]
  );
  useEffect(() => {}, [activeIndexChart]);

  const [activeIndexDesc, setActiveIndexDesc] = useState(GRADING);
  const onButtonClickDesc = useCallback(
    (flag) => {
      setActiveIndexDesc(flag);
    },
    [setActiveIndexDesc]
  );
  useEffect(() => {}, [activeIndexDesc]);

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
    } catch (error) {}
  };

  if (mode === "testcase") {
    // console.log(content.input);
    return (
      <BgTestCase
        style={{
          backgroundColor:
            COLOR_SET["EDITOR_EXPLAIN_CONTENT"][
              settingSelector.backgroundColor
            ],
          color:
            COLOR_SET["EDITOR_EXPLAIN_CONTENT_FONT"][
              settingSelector.backgroundColor
            ],
        }}
      >
        <TestCaseMasterGrid>
          <TestCaseIOContainer>
            <TestCaseInput>Input: {content.input}</TestCaseInput>
            <TestCaseOutput>Output: {content.output}</TestCaseOutput>
          </TestCaseIOContainer>

          <TestCaseResult
            onClick={async () => {
              console.log("??");
              console.log(id);
              console.log(pfListLocal);
              console.log(testCaseData);

              if (testCaseData.is_pass == null && testCaseData.id) {
                dispatch(setTestcaseOn());
                const result = await executeTestCase(testCaseData.id);
                dispatch(
                  setTestcaseError(
                    result.data.data.is_error,
                    result.data.data.actual_output
                  )
                );
                setTestCaseData({
                  ...result.data.data,
                  id: testCaseData.id,
                });
                console.log(result.data.data);
                // console.log(result);
                // let tempPfList = [...testCaseData];
                // for (const key in tempPfList) {
                //   if(tempPfList[key].id == content.id) {
                //     tempPfList[key] = {
                //       ...result.data.data,
                //       id: content.id
                //     }
                //   }
                // }
                // testCaseData(tempPfList);
              }
            }}
          >
            {testCaseData.is_pass != null
              ? JSON.stringify(testCaseData.is_pass)
              : "RESULT HERE"}
          </TestCaseResult>
        </TestCaseMasterGrid>
      </BgTestCase>
    );
    // return <Bg darkMode={darkMode}>{content}</Bg>;
  } else if (mode === "gradingAndExecution") {
    // console.log(content.input);
    const score =
      (pfListLocal.filter((pf) => pf.is_pass).length / pfListLocal.length) *
      100;

    return (
      <SubmitResultBg
        style={{
          backgroundColor:
            COLOR_SET["EDITOR_EXPLAIN_CONTENT"][
              settingSelector.backgroundColor
            ],
          color:
            COLOR_SET["EDITOR_EXPLAIN_CONTENT_FONT"][
              settingSelector.backgroundColor
            ],
        }}
      >
        <WindowWrapper
          style={{
            backgroundColor:
              COLOR_SET["EDITOR_EXPLAIN_CONTENT"][
                settingSelector.backgroundColor
              ],
            color:
              COLOR_SET["EDITOR_EXPLAIN_CONTENT_FONT"][
                settingSelector.backgroundColor
              ],
          }}
        >
          <div>{`총점: ${score}점`}</div>
          {pfListLocal.map((pf, index) => {
            let content = "";
            if (pf.is_hidden) {
              content = `히든 테스트케이스${index + 1}: ${pf.is_pass}`;
            } else {
              content = `공개 테스트케이스${index + 1}: ${pf.is_pass}`;
            }
            return <div style={{ marginTop: "16px" }}>{content} </div>;
          })}
        </WindowWrapper>
      </SubmitResultBg>
    );
  } else if (mode === "submit") {
    // SPECIAL CASE: ASSIGNMENT SUBMITTED

    return (
      <SubmitResultBg
        style={{
          backgroundColor:
            COLOR_SET["EDITOR_EXPLAIN_CONTENT"][
              settingSelector.backgroundColor
            ],
          color:
            COLOR_SET["EDITOR_EXPLAIN_CONTENT_FONT"][
              settingSelector.backgroundColor
            ],
        }}
      >
        <ResultVisContainer>
          {/* Separator */}
          <Separator
            style={{
              backgroundColor:
                COLOR_SET["EDITOR_EXPLAIN_CONTENT"][
                  settingSelector.backgroundColor
                ],
              color:
                COLOR_SET["EDITOR_EXPLAIN_CONTENT_FONT"][
                  settingSelector.backgroundColor
                ],
            }}
          >
            {/* TODO */}
            <GradingHighlighter
              active={activeIndexDesc === GRADING}
              style={{
                backgroundColor:
                  COLOR_SET["EDITOR_EXPLAIN"][settingSelector.backgroundColor],
                color:
                  COLOR_SET["EDITOR_EXPLAIN_FONT"][
                    settingSelector.backgroundColor
                  ],
              }}
            >
              <Button onClick={() => onButtonClickDesc(GRADING)}>
                제출 성적
              </Button>
            </GradingHighlighter>
            <DescriptionHighlighter
              active={activeIndexDesc === DESCRIPTION}
              style={{
                backgroundColor:
                  COLOR_SET["EDITOR_EXPLAIN"][settingSelector.backgroundColor],
                color:
                  COLOR_SET["EDITOR_EXPLAIN_FONT"][
                    settingSelector.backgroundColor
                  ],
              }}
            >
              <Button onClick={() => onButtonClickDesc(DESCRIPTION)}>
                코드 설명
              </Button>
            </DescriptionHighlighter>
            <RecommendationHighlighter
              active={activeIndexDesc === RECOMMENDATION}
              style={{
                backgroundColor:
                  COLOR_SET["EDITOR_EXPLAIN"][settingSelector.backgroundColor],
                color:
                  COLOR_SET["EDITOR_EXPLAIN_FONT"][
                    settingSelector.backgroundColor
                  ],
              }}
            >
              <Button onClick={() => onButtonClickDesc(RECOMMENDATION)}>
                관련 자료
              </Button>
            </RecommendationHighlighter>
          </Separator>
          {/* 제출 결과 */}
          {/* pie chart visualzation */}
          {activeIndexDesc === GRADING && (
            <div style={{ marginTop: "20px" }}>
              <ChartContainer>
                {content.readability_result
                  ? activeIndexChart === READABILITY && (
                      <ResultVis
                        data={content.readability_result}
                        chartColor="#FF9A3C"
                      />
                    )
                  : activeIndexChart === READABILITY && (
                      <div style={{ width: "600px", height: "300px" }}>
                        {" "}
                        현재 가독성 채점 기능은 python만 지원합니다.
                      </div>
                    )}
                {content.efficiency_result
                  ? activeIndexChart === EFFICIENCY && (
                      <ResultVis
                        data={content.efficiency_result}
                        chartColor="#98D964"
                      />
                    )
                  : activeIndexChart === EFFICIENCY && (
                      <div style={{ width: "600px", height: "300px" }}>
                        {" "}
                        현재 효율성 채점 기능은 python만 지원합니다.{" "}
                      </div>
                    )}
                {activeIndexChart === FUNCTIONALITY &&
                  content.functionality_result && (
                    <ResultVis
                      data={content.functionality_result.testcase_results}
                      chartColor="#52C0E7"
                      radial={true}
                    />
                  )}

                {/* pie chart selector */}
                <>
                  {/* Three colors
        가독성 : #FF9A3C
        효율 : #98D964
        기능 : #52C0E7 */}
                  <Selector>
                    <ReadabilityHighlighter
                      active={activeIndexChart === READABILITY}
                      style={{
                        backgroundColor:
                          COLOR_SET["EDITOR_EXPLAIN"][
                            settingSelector.backgroundColor
                          ],
                      }}
                    >
                      <Button onClick={() => onButtonClickChart(READABILITY)}>
                        가독성
                      </Button>
                    </ReadabilityHighlighter>
                    <EfficiencyHighlighter
                      active={activeIndexChart === EFFICIENCY}
                      style={{
                        backgroundColor:
                          COLOR_SET["EDITOR_EXPLAIN"][
                            settingSelector.backgroundColor
                          ],
                      }}
                    >
                      <Button onClick={() => onButtonClickChart(EFFICIENCY)}>
                        효율
                      </Button>
                    </EfficiencyHighlighter>
                    <FunctionalityHighlighter
                      active={activeIndexChart === FUNCTIONALITY}
                      style={{
                        backgroundColor:
                          COLOR_SET["EDITOR_EXPLAIN"][
                            settingSelector.backgroundColor
                          ],
                      }}
                    >
                      <Button onClick={() => onButtonClickChart(FUNCTIONALITY)}>
                        기능
                      </Button>
                    </FunctionalityHighlighter>
                  </Selector>
                </>
              </ChartContainer>
              {/* score description */}
              <div
                style={{
                  marginTop: "9px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* TODO: activeIndexDesc state 받아서 표시  */}
                <ScoreDescriptor
                  style={{
                    backgroundColor:
                      COLOR_SET["EDITOR_RESULT"][
                        settingSelector.backgroundColor
                      ],
                    color:
                      COLOR_SET["EDITOR_EXPLAIN_FONT"][
                        settingSelector.backgroundColor
                      ],
                  }}
                >
                  {activeIndexChart === READABILITY &&
                    content.readability_result && (
                      <DescriptionContainer>
                        {/* {JSON.stringify(content.readability_result, null, 2)} */}
                        {Object.keys(content.readability_result)
                          .filter((k) => k !== "id")
                          .map(function (key) {
                            return (
                              <div style={{ marginBottom: "11px" }}>
                                {key} : {content.readability_result[key]}
                              </div>
                            );
                          })}
                      </DescriptionContainer>
                    )}
                  {activeIndexChart === EFFICIENCY &&
                    content.efficiency_result && (
                      <DescriptionContainer>
                        {Object.keys(content.efficiency_result)
                          .filter((k) => k !== "id")
                          .map(function (key) {
                            return (
                              <div style={{ marginBottom: "11px" }}>
                                {key} : {content.efficiency_result[key]}
                              </div>
                            );
                          })}
                      </DescriptionContainer>
                    )}
                  {activeIndexChart === FUNCTIONALITY &&
                    content.functionality_result && (
                      <DescriptionContainer>
                        {/*여러 테스트케이스가 어레이 형태로 있음, 다른 형태로 처리 필요 */}
                        {content.functionality_result.testcase_results.map(
                          (testcase, index) => {
                            if (!testcase.input) {
                              return <></>;
                            }
                            return (
                              <>
                                <div style={{ marginBottm: "11px" }}>
                                  {testcase.is_hidden ? "히든" : "공개"}{" "}
                                  테스트케이스 {index} :{" "}
                                  {testcase.is_pass ? "PASS" : "FAIL"}
                                </div>
                                <div style={{ marginBottm: "0px" }}>
                                  <ul>Input: {testcase.input}</ul>
                                  <ul>
                                    Expected Output: {testcase.expected_output}
                                  </ul>
                                  <ul>
                                    Actual Output: {testcase.actual_output}
                                  </ul>
                                </div>
                              </>
                            );
                          }
                        )}
                      </DescriptionContainer>
                    )}
                </ScoreDescriptor>
              </div>
            </div>
          )}

          {activeIndexDesc === DESCRIPTION && (
            <div
              style={{
                marginTop: "9px",
                marginLeft: "7.5px",
                marginRight: "7.5px",
              }}
            >
              <CodeDescriptor
                style={{
                  backgroundColor:
                    COLOR_SET["EDITOR_EXPLAIN_CONTENT"][
                      settingSelector.backgroundColor
                    ],
                  color:
                    COLOR_SET["EDITOR_EXPLAIN_CONTENT_FONT"][
                      settingSelector.backgroundColor
                    ],
                }}
              >
                {content.code_description
                  ? content.code_description
                      .split("\n")
                      .map((line) => (
                        <div style={{ marginBottom: "11px" }}>{line}</div>
                      ))
                  : "현재 코드 설명 기능은 python만 지원합니다."}
              </CodeDescriptor>
              ;
            </div>
          )}
          {activeIndexDesc === RECOMMENDATION && (
            <div
              style={{
                marginTop: "9px",
                marginLeft: "7.5px",
                marginRight: "7.5px",
              }}
            >
              <CodeDescriptor
                style={{
                  backgroundColor:
                    COLOR_SET["EDITOR_EXPLAIN_CONTENT"][
                      settingSelector.backgroundColor
                    ],
                  color:
                    COLOR_SET["EDITOR_EXPLAIN_CONTENT_FONT"][
                      settingSelector.backgroundColor
                    ],
                }}
              >
                {content.references.map((ref, index) => {
                  return (
                    <div style={{ marginBottom: "50px" }}>
                      <div>
                        {index + 1}.
                        <a href={ref} target="_blank">
                          {" "}
                          {ref}{" "}
                        </a>
                      </div>
                      {!ref.includes("youtu.be") &&
                        !ref.includes("namu.wiki") && (
                          <iframe
                            width={"100%"}
                            scrolling="no"
                            height={"300px"}
                            src={ref}
                            seamless
                          ></iframe>
                        )}
                    </div>
                  );
                })}
                {/* {Object.keys(content.references)
                  .filter((k) => k !== "id")
                  .map(function (key) {
                    return (
                      <>
                        <div style={{ marginBottom: "11px" }}>{key}</div>
                        <div style={{ marginBottom: "11px" }}>
                          {content.efficiency_result[key]}
                        </div>
                      </>
                    );
                  })} */}
              </CodeDescriptor>
              ;
            </div>
          )}
        </ResultVisContainer>
      </SubmitResultBg>
    );
  } else {
    // problem/restrictions display
    console.log(content);

    return (
      <Bg
        style={{
          backgroundColor:
            COLOR_SET["EDITOR_EXPLAIN_CONTENT"][
              settingSelector.backgroundColor
            ],
          color:
            COLOR_SET["EDITOR_EXPLAIN_CONTENT_FONT"][
              settingSelector.backgroundColor
            ],
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "11px" }}>문제</div>
        {prob.split("\n").map((line) => (
          <div style={{ marginBottom: "11px", lineHeight: "22px" }}>{line}</div>
        ))}
        <div style={{ fontWeight: "bold", marginBottom: "11px" }}>
          제약 사항
        </div>
        {restr.split("\n").map((line) => (
          <div style={{ marginBottom: "11px", lineHeight: "22px" }}>{line}</div>
        ))}
      </Bg>
    );
  }
};
