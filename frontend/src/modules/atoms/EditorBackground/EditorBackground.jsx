import styled from "styled-components";
import { ResultVis } from "../../atoms";
import React, { useEffect, useCallback, useState } from "react";

const READABILITY = 0;
const EFFICIENCY = 1;
const FUNCTIONALITY = 2;

const Bg = styled.div`
  width: 100%;
  height: 100%;
  background: #eaeaea;

  padding: 18.55px 18.55px 18.55px 18.55px;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 15.6237px;
  line-height: 18px;
  /* identical to box height */

  color: #1e1e1e;

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
  background: #bfbfbf;
  height: 25px;
`;
const Separator = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background: #bfbfbf;
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

const ReadabilityHighlighter = styled.div`
  color: ${(props) => (props.active ? "#FF9A3C" : "#1f1f32")};
`;
const EfficiencyHighlighter = styled.div`
  color: ${(props) => (props.active ? "#98D964" : "#1f1f32")};
`;
const FunctionalityHighlighter = styled.div`
  color: ${(props) => (props.active ? "#52C0E7" : "#1f1f32")};
`;
export const EditorBackground = ({ mode, content, ...restProps }) => {
  const [activeIndexChart, setActiveIndexChart] = useState(READABILITY);
  const onButtonClickChart = useCallback(
    (flag) => {
      setActiveIndexChart(flag);
    },
    [setActiveIndexChart]
  );
  useEffect(() => {}, [activeIndexChart]);

  const [activeIndexDesc, setActiveIndexDesc] = useState(READABILITY);
  const onButtonClickDesc = useCallback(
    (flag) => {
      setActiveIndexDesc(flag);
    },
    [setActiveIndexDesc]
  );
  useEffect(() => {}, [activeIndexDesc]);
  
  // TODO
  // data preprocessing for functionality results


  if (mode === "submit") {
    // SPECIAL CASE: ASSIGNMENT SUBMITTED

    return (
      <Bg>
        <ResultVisContainer>
          {/* pie chart visualzation */}
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
            <Selector>
              <ReadabilityHighlighter active={activeIndexChart === READABILITY}>
                <Button onClick={() => onButtonClickChart(READABILITY)}>
                  가독성
                </Button>
              </ReadabilityHighlighter>
              <EfficiencyHighlighter active={activeIndexChart === EFFICIENCY}>
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
          {/* Separator */}
          <Separator>
            {/* TODO */}
            <ReadabilityHighlighter active={activeIndexDesc === READABILITY}>
              <Button onClick={() => onButtonClickDesc(READABILITY)}>
                제출 결과
              </Button>
            </ReadabilityHighlighter>
            <EfficiencyHighlighter active={activeIndexDesc === EFFICIENCY}>
              <Button onClick={() => onButtonClickDesc(EFFICIENCY)}>
                코드 설명
              </Button>
            </EfficiencyHighlighter>
            <FunctionalityHighlighter
              active={activeIndexDesc === FUNCTIONALITY}
            >
              <Button onClick={() => onButtonClickDesc(FUNCTIONALITY)}>
                관련 자료
              </Button>
            </FunctionalityHighlighter>
          </Separator>
          {/* score description */}
          <ScoreDescriptor>activeIndexDesc state 받아서 표시</ScoreDescriptor>
        </ResultVisContainer>
      </Bg>
    );
  } else {
    return <Bg>{content}</Bg>;
  }
};
