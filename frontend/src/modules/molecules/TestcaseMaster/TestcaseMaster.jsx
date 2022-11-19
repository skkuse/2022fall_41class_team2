import styled from "styled-components";
import { EditorBackground, EditorHeader } from "../../atoms/";

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
  background: #bfbfbf;
`;

const ValidationButton = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 15.6237px;
  line-height: 18px;
  /* identical to box height */

  text-align: center;

  color: #1e1e1e;
`;

function TestcaseMaster({ bodyContent, testCases, ...restProps }) {
  const headerContent = "테스트 케이스";
  return (
    <DescWrapper>
      <TestCaseHeaderContainer>
        <EditorHeader
          content={headerContent}
          assignmentId={restProps.assignmentId}
        />

        <div style={{ marginRight: "16.13px" }}>
          <ValidationButton>검증</ValidationButton>
        </div>
      </TestCaseHeaderContainer>

      {/* // TODO: testcase 개수만큼 pooling */}
      {testCases.map((testcase, index) => {
        return (
          <EditorBackground
            content={`테스트케이스 ${index}>
              input: ${testcase.input}
              output: ${testcase.output}
              `}
            assignmentId={restProps.assignmentId}
          />
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
