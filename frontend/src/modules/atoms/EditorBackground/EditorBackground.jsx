import styled from "styled-components";
import { ResultVis } from "../../atoms";
import React, { useEffect, useCallback, useState } from "react";
import { Text } from "../../atoms";
import { useSelector } from 'react-redux';
import { COLOR_SET } from './../../../service/GetColor';

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
`;

const TestCaseSeparator = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 450px;
  height: 0px;

  border: 4px solid #bfbfbf;
  transform: rotate(180deg);
`;

const TestCaseMasterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TestCaseIOContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-around;

  min-height: 80px;
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
display:flex;
justify-content: center;
align-items:center;
  border-radius: 5px;
  display:flex
  flex-direction:column;
  align-items:stretch;
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

  ...restProps
}) => {
  const settingSelector = useSelector((state) => state.SettingReducer);
  // redability result
  let readabilityResult = [];

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

  if (mode === "testcase") {
    // console.log(content.input);
    return (
      <BgTestCase style={{
        backgroundColor:COLOR_SET['EDITOR_EXPLAIN_CONTENT'][settingSelector.backgroundColor],
        color: COLOR_SET['EDITOR_EXPLAIN_CONTENT_FONT'][settingSelector.backgroundColor]
      }}>
        <TestCaseMasterContainer>
          <TestCaseIOContainer>
            <TestCaseInput>Input: {content.input}</TestCaseInput>
            <TestCaseOutput>Output: {content.output}</TestCaseOutput>
          </TestCaseIOContainer>

          <TestCaseResult>{pfList.is_pass != null ? JSON.stringify(pfList.is_pass) : "RESULT HERE"}</TestCaseResult>
        </TestCaseMasterContainer>
      </BgTestCase>
    );
    // return <Bg darkMode={darkMode}>{content}</Bg>;
  } else if (mode === "gradingAndExecution") {
    // console.log(content.input);
    const score = (pfList.filter((pf) => pf.is_pass).length / pfList.length)*100;
  
    return (
      <SubmitResultBg style={{
        backgroundColor:COLOR_SET['EDITOR_EXPLAIN_CONTENT'][settingSelector.backgroundColor],
        color: COLOR_SET['EDITOR_EXPLAIN_CONTENT_FONT'][settingSelector.backgroundColor]
      }}>
        <WindowWrapper style={{
            backgroundColor:COLOR_SET['EDITOR_EXPLAIN_CONTENT'][settingSelector.backgroundColor],
            color: COLOR_SET['EDITOR_EXPLAIN_CONTENT_FONT'][settingSelector.backgroundColor]
          }}>
          <div>{`총점: ${score}점`}</div>
          {
             pfList.map((pf, index) => {
              let content = "";
              if(pf.is_hidden) {
                content = `히든 테스트케이스${index+1}: ${pf.is_pass}`;
              }
              else{
                content = `공개 테스트케이스${index+1}: ${pf.is_pass}`;
              }
              return <div style={{marginTop: "16px"}}>{content} </div>;
            })
          }
        </WindowWrapper>
      </SubmitResultBg>
    );
  } else if (mode === "submit") {
    // SPECIAL CASE: ASSIGNMENT SUBMITTED

    return (
      <SubmitResultBg  style={{
        backgroundColor:COLOR_SET['EDITOR_EXPLAIN_CONTENT'][settingSelector.backgroundColor],
        color: COLOR_SET['EDITOR_EXPLAIN_CONTENT_FONT'][settingSelector.backgroundColor]
      }}>
        <ResultVisContainer>
          {/* Separator */}
          <Separator  style={{
        backgroundColor:COLOR_SET['EDITOR_EXPLAIN_CONTENT'][settingSelector.backgroundColor],
        color: COLOR_SET['EDITOR_EXPLAIN_CONTENT_FONT'][settingSelector.backgroundColor]
      }}>
            {/* TODO */}
            <GradingHighlighter
              active={activeIndexDesc === GRADING}
              darkMode={darkMode}
            >
              <Button onClick={() => onButtonClickDesc(GRADING)}>
                제출 성적
              </Button>
            </GradingHighlighter>
            <DescriptionHighlighter
              active={activeIndexDesc === DESCRIPTION}
              darkMode={darkMode}
            >
              <Button onClick={() => onButtonClickDesc(DESCRIPTION)}>
                코드 설명
              </Button>
            </DescriptionHighlighter>
            <RecommendationHighlighter
              active={activeIndexDesc === RECOMMENDATION}
              darkMode={darkMode}
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
                {activeIndexChart === READABILITY && (
                  <ResultVis
                    data={content.readability_result}
                    chartColor="#FF9A3C"
                  />
                )}
                {activeIndexChart === EFFICIENCY && (
                  <ResultVis
                    data={content.efficiency_result}
                    chartColor="#98D964"
                  />
                )}
                {activeIndexChart === FUNCTIONALITY && (
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
                  <Selector darkMode={darkMode}>
                    <ReadabilityHighlighter
                      active={activeIndexChart === READABILITY}
                    >
                      <Button onClick={() => onButtonClickChart(READABILITY)}>
                        가독성
                      </Button>
                    </ReadabilityHighlighter>
                    <EfficiencyHighlighter
                      active={activeIndexChart === EFFICIENCY}
                    >
                      <Button onClick={() => onButtonClickChart(EFFICIENCY)}>
                        효율
                      </Button>
                    </EfficiencyHighlighter>
                    <FunctionalityHighlighter
                      active={activeIndexChart === FUNCTIONALITY}
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
                <ScoreDescriptor darkMode={darkMode}>
                  {activeIndexChart === READABILITY && content.readability_result && (
                      <DescriptionContainer>
                      {/* {JSON.stringify(content.readability_result, null, 2)} */}
                      {
                      Object.keys(content.readability_result)
                        .filter((k) => k !== "id")
                        .map(function (key) {
                          return (
                            <div style={{ marginBottom: "11px" }}>
                              {key} : {content.readability_result[key]}
                            </div>
                          );
                        })
                        
                      }
                    </DescriptionContainer>
                  )}
                  {activeIndexChart === EFFICIENCY && (
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
                  {activeIndexChart === FUNCTIONALITY && (
                    <DescriptionContainer>
                      {/*여러 테스트케이스가 어레이 형태로 있음, 다른 형태로 처리 필요 */}
                      {content.functionality_result.testcase_results.map(
                        (testcase, index) => {
                          if(!testcase.input) {
                            return(<></>);
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
                              <ul>Actual Output: {testcase.actual_output}</ul>
                            </div>
                          </>
                        )}
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
              <CodeDescriptor  style={{
        backgroundColor:COLOR_SET['EDITOR_EXPLAIN_CONTENT'][settingSelector.backgroundColor],
        color: COLOR_SET['EDITOR_EXPLAIN_CONTENT_FONT'][settingSelector.backgroundColor]
      }}>
                {content.code_description.split("\n").map((line) => (
                  <div style={{ marginBottom: "11px" }}>{line}</div>
                ))}
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
              <CodeDescriptor  style={{
        backgroundColor:COLOR_SET['EDITOR_EXPLAIN_CONTENT'][settingSelector.backgroundColor],
        color: COLOR_SET['EDITOR_EXPLAIN_CONTENT_FONT'][settingSelector.backgroundColor]
      }}>
                {Object.keys(content.references)
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
                  })}
              </CodeDescriptor>
              ;
            </div>
          )}
        </ResultVisContainer>
      </SubmitResultBg>
    );
  } else {
    // general display
    return <Bg  style={{
      backgroundColor:COLOR_SET['EDITOR_EXPLAIN_CONTENT'][settingSelector.backgroundColor],
      color: COLOR_SET['EDITOR_EXPLAIN_CONTENT_FONT'][settingSelector.backgroundColor]
    }}>{content}</Bg>;
  }
};
