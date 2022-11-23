import styled from "styled-components";
import { EditorBackground, EditorHeader } from "../../atoms/";
import { apiClient } from './../../../api/axios';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 598px;
  height: 429.3px;
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
  const repoSelector = useSelector((state) => state.editorReducer);

  const [pfList, setPfList] = useState(null);

  const executeTestCase = async(testcase_id) => {
    try {
      const result = await apiClient.post(`/api/outputs/testcases/${testcase_id}/`, {
        language: repoSelector.selectedModel.content.language,
        code: repoSelector.selectedModel.content.code
      });
      return result;

    } catch (error) {
    }
  }

  return (
    <DescWrapper>
      <TestCaseHeaderContainer>
        <EditorHeader
          content={headerContent}
          assignmentId={restProps.assignmentId}
        />

        <div style={{ marginRight: "16.13px" }}>
          <ValidationButton onClick={async()=>{
            let tempPfList = [];
            for (const tc of testCases) {
              const result = await executeTestCase(tc.id);
              if(result) {
                tempPfList.push({
                  ...result.data.data,
                  id: tc.id
                });
              }
              
            }
            setPfList(tempPfList);
          }}>검증</ValidationButton>
        </div>
      </TestCaseHeaderContainer>
      {/* // TODO: testcase 개수만큼 pooling */}
      {
        testCases.map((testcase, index) => {
          return (
            <EditorBackground
              content={`테스트케이스 ${index}>
              input: ${testcase.input}
              output: ${testcase.output}
              `}
              assignmentId={restProps.assignmentId}
              id={testcase.id}
              pfList={pfList}
              />
          );
        })
      }
      {/* <EditorBackground
        content={bodyContent}
        assignmentId={restProps.assignmentId}
      /> */}
    </DescWrapper>
  );
}

export default TestcaseMaster;
