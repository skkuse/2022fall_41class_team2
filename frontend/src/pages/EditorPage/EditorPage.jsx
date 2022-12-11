import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { apiClient } from "../../api/axios";

import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {
  Banner,
  CodeEditor,
  Testcase,
  Problem,
} from "../../modules/organisms/CodeEditor";
import { getTimeDiff } from "../../modules/organisms/AssignmentOverview/AssignmentOverview";
import { COLOR_SET } from "./../../service/GetColor";
import { setTestcaseOff } from './EditorAction';

const Testbox = styled.div`
  background: #000000;
`;

const EditorPageGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [col] 1fr [col] 1fr [col] 1fr;
  grid-template-rows: [row] 1fr [row] 1fr;

  width: 100vw;
  height: 100vh;
`;

const ProblemWrapper = styled.div`
  grid-column: col 1;
  grid-row: row 1;
  min-width: 360px;
`;
const TestcaseWrapper = styled.div`
  grid-column: col 1;
  grid-row: row 2;
  min-width: 360px;
`;
const CodeEditorWrapper = styled.div`
  grid-column: col 2 / span 2;
  grid-row: row 1 / span 2;
`;

const GeneralContainer = styled.div`
  height: 100vh;
  /* TODO: 스크롤바 다크모드 css */
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9.76px;
    background-color: #d3d3da;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 975.505px;
    background-color: #bfbfbf;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  }
  overflow-y: hidden;
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

export const EditorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const monaco = useMonaco();
  const params = useParams();

  const [lecture, setLecture] = useState();
  const [ass, setAss] = useState();
  const [changeRepo, setChangeRepo] = useState(false);

  const settingSelector = useSelector((state) => state.SettingReducer);
  const [editMode, setEditMode] = useState({ edit: true, altMode: "none" });

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const testcaseSelector = useSelector((state) => state.testcaseReducer);

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

  useEffect(()=>{
    if(!modalIsOpen) {
      dispatch(setTestcaseOff());
    }
  }, [modalIsOpen])

  useEffect(()=>{
      if(testcaseSelector.isOnTestcase && testcaseSelector.isError) {
        console.log(testcaseSelector.errorContent);
        openModal();
      }
      else{
        closeModal();
      }
  }, [testcaseSelector.isOnTestcase, testcaseSelector.isError])

  useEffect(() => {
    if (!monaco) return;
  }, [monaco]);

  useEffect(() => {
    if (!location.state) {
      return;
    }
    setLecture(location.state.lecture);
    apiClient.get(`/api/assignments/${params.assignment_id}/`).then((value) => {
      setAss(value.data.data);
      // * 테케 없으면 새로 추가
      if (!value.data.data.testcases.length) {
        apiClient
          .post("/api/testcases/", {
            input: "[0,1,10]",
            output: "100",
            assignment_id: params.assignment_id,
            is_hidden: false,
          })
          .then((value) => {
            console.log(value);
            apiClient
              .get(`/api/assignments/${params.assignment_id}/`)
              .then((value) => {
                setAss(value.data.data);
              });
          })
          .then((value) => {
            apiClient
              .get(`/api/assignments/${params.assignment_id}/`)
              .then((value) => {
                setAss(value.data.data);
              });
          });
      } else {
        setAss(value.data.data);
      }
    });
  }, []);

  if (!ass) {
    return <></>;
  }
  // TODO: settingSelector에 따라서 LandingPageScenery의 배경을 바꿔야 함
  const darkMode = false;
  return (
    <GeneralContainer>
      <Helmet
        bodyAttributes={{
          style: `background : ${
            COLOR_SET["MAIN_BACKGROUND"][settingSelector.backgroundColor]
          }`,
        }}
      />
      {/* <button onClick={openModal}>Open Modal</button> */}
      {/* {
        JSON.stringify(testcaseSelector)
      } */}
    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        {/* <button onClick={closeModal}>close</button> */}
        <div>{testcaseSelector.errorContent.content}</div>
        {/* <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
      </Modal>

      {/* Banner */}
      <Banner
        lectureName={lecture.name}
        reamainingTime={`${new Date(ass.deadline)}`}
        assignmentName={ass.name}
        assignment={ass}
        darkMode={darkMode}
        changeRepo={changeRepo}
        setChangeRepo={setChangeRepo}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      {/* Problem section*/}
      <EditorPageGrid>
        <ProblemWrapper style={{ marginLeft: "43px", marginTop: "25px" }}>
          {/* scroll test */}
          <Problem
            prob={ass.question}
            restr={ass.constraints}
            darkMode={darkMode}
          />
        </ProblemWrapper>
        {/* TestCase */}
        <TestcaseWrapper style={{ marginLeft: "43px", marginTop: "10px" }}>
          <Testcase
            // // TODO: 오브젝트 형태로 변경해서 표시
            bodyContent={`테스트케이스 1>
            input: [1,2,3,4]
            output: [소공개]`}
            testCases={ass.testcases}
            darkMode={darkMode}
          />
        </TestcaseWrapper>

        {/* Editor */}
        <CodeEditorWrapper
          style={{
            marginLeft: "12.72px",
            marginTop: "25px",
            marginRight: "43px",
          }}
        >
          <CodeEditor
            assignment={ass}
            darkMode={darkMode}
            changeRepo={changeRepo}
            setChangeRepo={setChangeRepo}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </CodeEditorWrapper>
      </EditorPageGrid>
    </GeneralContainer>
  );
};
