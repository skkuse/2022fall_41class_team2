import styled from "styled-components";
import { EditorBackground, EditorHeader } from "../../atoms/";
import { apiClient } from "./../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { COLOR_SET } from './../../../service/GetColor';
import { setTestcaseOff } from './../../../pages/EditorPage/EditorAction';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

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
  flex-direction: column;
  
  height: 42vh;
  background: ${(props) => (props.darkMode ? "#1F1F32" : "#eaeaea")};
  /* height: 100%; */
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


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
// Modal.setAppElement('#yourAppElement');

function TestcaseMaster({ bodyContent, testCases, darkMode, ...restProps }) {
  const headerContent = "테스트 케이스";
  const repoSelector = useSelector((state) => state.editorReducer);
  const settingSelector = useSelector((state) => state.SettingReducer);
  const dispatch = useDispatch();
  const [pfList, setPfList] = useState(null);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const executeTestCase = async (testcase_id) => {
    try {
      const result = await apiClient.post(
        `/api/outputs/testcases/${testcase_id}/`,
        {
          language: repoSelector.selectedModel.content.language.toLowerCase(),
          code: repoSelector.selectedModel.content.code,
        }
      );
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  console.log(`testcases: ${JSON.stringify(testCases)}`);
  return (
    <DescWrapper>
      <TestCaseHeaderContainer style={{
        backgroundColor:COLOR_SET['EDITOR_EXPLAIN'][settingSelector.backgroundColor],
        color: COLOR_SET['EDITOR_EXPLAIN_FONT'][settingSelector.backgroundColor]
      }}>
        <EditorHeader
          content={headerContent}
          assignmentId={restProps.assignmentId}
          darkMode={darkMode}
        />
    

        <div style={{ marginRight: "16.13px" }}>
          <ValidationButtonContainer >
            <ValidationButton
             style={{
              backgroundColor:COLOR_SET['EDITOR_TEST_BUTTON'][settingSelector.backgroundColor],
              color: COLOR_SET['EDITOR_TEST_BUTTON_FONT'][settingSelector.backgroundColor]
            }}
              onClick={async () => {
                dispatch(setTestcaseOff());
                let tempPfList = [];
                for (const tc of testCases) {
                  if(tc.id && !tc.is_hidden) {
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
              }}
            >
              검증
            </ValidationButton>
          </ValidationButtonContainer>
        </div>
      </TestCaseHeaderContainer>
      {/* // TODO: testcase 개수만큼 pooling */}

      {/* {
        JSON.stringify(testCases)
      }  */}
        <TestCaseContainer  style={{
        backgroundColor:COLOR_SET['EDITOR_EXPLAIN_CONTENT'][settingSelector.backgroundColor],
        color: COLOR_SET['EDITOR_EXPLAIN_CONTENT_FONT'][settingSelector.backgroundColor]
      }}>
          {testCases.map((testcase, index) => {
            if(!testcase.id || testcase.is_hidden) {
              return (<></>);
            }
            return (
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
                  // testCaseValue={testcase}
                  testCaseValue={pfList? pfList.find((pf) => pf.id == testcase.id): testcase}
                />
            );
          })}
          
      </TestCaseContainer>

    </DescWrapper>
  );
}

export default TestcaseMaster;
