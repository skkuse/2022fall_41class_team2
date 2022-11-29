import styled from "styled-components";
import { ResultVis } from "../../atoms";
import React, { useEffect, useCallback, useState } from "react";

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
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-around;
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
  justify-content: space-around;
  width: 90%;
  background: ${(props) => (props.darkMode ? "#666681" : "#bfbfbf")};
  height: 25px;
`;
const Separator = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background: ${(props) => (props.darkMode ? "#666681" : "#bfbfbf")};
  height: 39px;
  border-radius: 11px;
  box-sizing: border-box;
  border: 2px solid #000000;
`;
const ScoreDescriptor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  min-height: 412px;
  background: ${(props) => (props.darkMode ? "#666681" : "#bfbfbf")};
  border: 2px solid #ffffff;
  border-radius: 11px;
  padding: 18.55px 18.55px 18.55px 18.55px;
`;

const Button = styled.div`
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
`;
const EfficiencyHighlighter = styled.div`
  color: ${(props) => (props.active ? "#98D964" : "#1f1f32")};
`;
const FunctionalityHighlighter = styled.div`
  color: ${(props) => (props.active ? "#52C0E7" : "#1f1f32")};
`;
const GradingHighlighter = styled.div`
  color: ${(props) => (props.active ? "#d8d8d8" : "#1f1f32")};
`;
const DescriptionHighlighter = styled.div`
  color: ${(props) => (props.active ? "#d8d8d8" : "#1f1f32")};
`;
const RecommendationHighlighter = styled.div`
  color: ${(props) => (props.active ? "#d8d8d8" : "#1f1f32")};
`;
export const EditorBackground = ({
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
            <GradingHighlighter active={activeIndexDesc === GRADING}>
              <Button onClick={() => onButtonClickDesc(GRADING)}>
                제출 성적
              </Button>
            </GradingHighlighter>
            <DescriptionHighlighter active={activeIndexDesc === DESCRPITION}>
              <Button onClick={() => onButtonClickDesc(DESCRPITION)}>
                코드 설명
              </Button>
            </DescriptionHighlighter>
            <RecommendationHighlighter
              active={activeIndexDesc === RECOMMENDATION}
            >
              <Button onClick={() => onButtonClickDesc(RECOMMENDATION)}>
                관련 자료
              </Button>
            </RecommendationHighlighter>
          </Separator>
          {/* 제출 결과 */}
          {/* pie chart visualzation */}
          {activeIndexDesc === GRADING && (
            <>
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
              </ChartContainer>
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
              {/* score description */}
              <ScoreDescriptor darkMode={darkMode}>
                activeIndexDesc state 받아서 표시 <br></br>
                가독성 상세, 효율 상세, 기능 상세, ...
              </ScoreDescriptor>
            </>
          )}
          {activeIndexDesc === DESCRPITION && (
            <>
              <Bg darkMode={darkMode}>코드 설명</Bg>;
            </>
          )}
          {activeIndexDesc === RECOMMENDATION && (
            <>
              <Bg darkMode={darkMode}>추천 자료</Bg>;
            </>
          )}
        </ResultVisContainer>
      </Bg>
    );
  } else {
    // general display
    return <Bg darkMode={darkMode}>{content}</Bg>;
  }
};
