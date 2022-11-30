import styled from "styled-components";
import { ResultVis } from "../../atoms";
import React, { useEffect, useCallback, useState } from "react";
import { Text } from "../../atoms";

const READABILITY = 0;
const EFFICIENCY = 1;
const FUNCTIONALITY = 2;

const GRADING = 0;
const DESCRPITION = 1;
const RECOMMENDATION = 2;

const Bg = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => (props.darkMode ? "#1F1F32" : "#eaeaea")};

  padding: 18.55px 18.55px 18.55px 18.55px;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 15.6237px;
  line-height: 18px;
  /* identical to box height */

  color: ${(props) => (props.darkMode ? "#D8D8D8" : "#1e1e1e")};

  overflow: scroll;
`;

const ResultVisContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  justify-content: space-around;

  box-sizing: border-box;
`;
const ScoreDescriptor = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 52vh;
  min-height: 412px;
  background: ${(props) => (props.darkMode ? "#525263" : "#f6f6f6")};
  border: ${(props) =>
    props.darkMode ? "2px solid #52c0e7" : "2px solid #52c0e7"};
  border-radius: 11px;
  padding: 18.55px 18.55px 18.55px 18.55px;
`;
const CodeDescriptor = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 90vh;
  min-height: 412px;
  background: ${(props) => (props.darkMode ? "#525263" : "#f6f6f6")};
  border: ${(props) =>
    props.darkMode ? "2px solid #52c0e7" : "2px solid #52c0e7"};
  border-radius: 11px;
  padding: 18.55px 18.55px 18.55px 18.55px;
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
  align-itmes: stretch;
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
  const [activeIndexChart, setActiveIndexChart] = useState(READABILITY);
  const onButtonClickChart = useCallback(
    (flag) => {
      setActiveIndexChart(flag);
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

  // TODO
  // data preprocessing for functionality results

  if (mode === "testcase") {
    // console.log(content.input);
    return (
      <Bg darkMode={darkMode}>
        <TestCaseMasterContainer>
          <TestCaseIOContainer>
            <TestCaseInput>Input: {content.input}</TestCaseInput>
            <TestCaseOutput>Output: {content.output}</TestCaseOutput>
          </TestCaseIOContainer>
          <TestCaseResult>RESULT HERE</TestCaseResult>
        </TestCaseMasterContainer>
      </Bg>
    );
    // return <Bg darkMode={darkMode}>{content}</Bg>;
  } else if (mode === "submit") {
    // SPECIAL CASE: ASSIGNMENT SUBMITTED

    return (
      <Bg darkMode={darkMode}>
        <ResultVisContainer>
          {/* Separator */}
          <Separator darkMode={darkMode}>
            {/* TODO */}
            <GradingHighlighter
              active={activeIndexDesc === GRADING}
              darkMode={darkMode}
            >
              <Button onClick={() => onButtonClickDesc(GRADING)}>
                <Text></Text>
                제출 성적
              </Button>
            </GradingHighlighter>
            <DescriptionHighlighter
              active={activeIndexDesc === DESCRPITION}
              darkMode={darkMode}
            >
              <Button onClick={() => onButtonClickDesc(DESCRPITION)}>
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
                    data={content.functionality_result}
                    chartColor="#52C0E7"
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
              <div style={{ marginTop: "9px" }}>
                {/* TODO: activeIndexDesc state 받아서 표시  */}
                <ScoreDescriptor darkMode={darkMode}>
                  가독성 상세, 효율 상세, 기능 상세, ...
                </ScoreDescriptor>
              </div>
            </div>
          )}

          {activeIndexDesc === DESCRPITION && (
            <div style={{ marginTop: "9px" }}>
              <CodeDescriptor darkMode={darkMode}>코드 설명</CodeDescriptor>;
            </div>
          )}
          {activeIndexDesc === RECOMMENDATION && (
            <div style={{ marginTop: "9px" }}>
              <CodeDescriptor darkMode={darkMode}>추천 자료</CodeDescriptor>;
            </div>
          )}
        </ResultVisContainer>
      </Bg>
    );
  } else {
    // general display
    return <Bg darkMode={darkMode}>{content}</Bg>;
  }
};
