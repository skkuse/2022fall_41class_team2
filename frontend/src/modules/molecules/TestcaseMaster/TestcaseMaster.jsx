import styled from "styled-components";
import { EditorBackground, EditorHeader } from "../../atoms/";
import { apiClient } from "./../../../api/axios";
import { useSelector } from "react-redux";
import { useState } from "react";

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

const TestCaseHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* width: 100%; */
  background: ${(props) => (props.darkMode ? "#525263" : "#bfbfbf")};
  /* #bfbfbf; */
`;
const TestCaseContainer = styled.div`
  display: flex;
  flex-direction: row;

  height: 100%;
`;

const ValidationButtonContainer = styled.div`
  /* identical to box height */

  text-align: center;

  /* background ${(props) => (props.darkMode ? "#525263" : "#D8D8D8")}; */
  color: #1e1e1e;
`;

const ValidationButton = styled.div`
  width: 58px;
  height: 30px;

  display: flex;

  justify-content: space-around;
  align-items: center;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 15.6237px;
  line-height: 18px;
  /* identical to box height */

  text-align: center;
  background: #d9d9d9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: #000000;

  cursor: pointer;
`;

function TestcaseMaster({ bodyContent, testCases, darkMode, ...restProps }) {
  const headerContent = "테스트 케이스";
  const repoSelector = useSelector((state) => state.editorReducer);

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
    } catch (error) {}
  };

  console.log(`testcases: ${JSON.stringify(testCases)}`);
  return (
    <DescWrapper>
      <TestCaseHeaderContainer darkMode={darkMode}>
        <EditorHeader
          content={headerContent}
          assignmentId={restProps.assignmentId}
          darkMode={darkMode}
        />

        <div style={{ marginRight: "16.13px" }}>
          <ValidationButtonContainer darkMode={darkMode}>
            <ValidationButton
              onClick={async () => {
                let tempPfList = [];
                for (const tc of testCases) {
                  const result = await executeTestCase(tc.id);
                  if (result) {
                    tempPfList.push({
                      ...result.data.data,
                      id: tc.id,
                    });
                  }
                }
                setPfList(tempPfList);
              }}
            >
              검증
            </ValidationButton>
          </ValidationButtonContainer>
        </div>
      </TestCaseHeaderContainer>
      {/* // TODO: testcase 개수만큼 pooling */}

      {testCases.map((testcase, index) => {
        // console.log(testcase);
        // console.log(`testcase: ${JSON.stringify(testcase)}`);
        // testcase = JSON.stringify(testcase);
        return (
          <TestCaseContainer>
            <EditorBackground
              mode="testcase"
              content={{
                테스트케이스: index,
                input: testcase.input,
                output: testcase.output,
              }}
              assignmentId={restProps.assignmentId}
              darkMode={darkMode}
              id={testcase.id}
              pfList={pfList}
            />
          </TestCaseContainer>
        );
      })}
      {/* <EditorBackground
        content={bodyContent}
        assignmentId={restProps.assignmentId}
      /> */}
    </DescWrapper>
  );
}

export default TestcaseMaster;
